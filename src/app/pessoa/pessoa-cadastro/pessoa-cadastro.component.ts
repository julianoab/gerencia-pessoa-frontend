import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { PessoaDTO } from '../../model/pessoa-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoDTO } from 'src/app/model/contato-dto';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent {

  pessoaForm!: FormGroup;
  contatosForm !: FormGroup;
  pessoaDTO = {} as PessoaDTO;
  titulo: String = 'Cadastro de Pessoa';

  constructor(private fb: FormBuilder, 
              private service: PessoaService, 
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  
  ngOnInit() {
    this.carregaFormInicial();
    this.adicionarContato();

    const idPessoa = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (idPessoa) {
      this.buscarPorCodigo(idPessoa);
      this.titulo = 'Editar Pessoa'
    }

  }

  carregaFormInicial(): void {
    this.pessoaForm = this.fb.group({
      id: [],
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      contatos: this.fb.array([])
    }) ;
  }

  salvar(pessoaForm: FormGroup) {
    this.pessoaDTO =  Object.assign(this.pessoaDTO, pessoaForm.value);
    this.service.adicionar(this.pessoaDTO);
    this.router.navigate(['/pessoa-pesquisa']);  
  }

  get contatos(): FormArray {
    return this.pessoaForm.get("contatos") as FormArray;
  }

  adicionarContato() {
     const contatosForm : any = this.fb.group({
      id: [],
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required]
  });
      this.contatos.push(contatosForm);
  }

  deleteContato(contatoIndex: any) {
    if (this.contatos.length > 1) {
      this.contatos.removeAt(contatoIndex);
    }
  }

  buscarPorCodigo(codigo: number) {
    this.service.buscarPorId(codigo).subscribe(pessoa => {
      this.popularForm(pessoa);
      // this.atualizarTituloEdicao();
    })
    // .catch(error => console.log(error));
  };

  popularFormContato(contato: ContatoDTO): FormGroup {
    return this.fb.group({
      id: contato.id,
      nome: contato.nome,
      telefone: contato.telefone,
      email: contato.email
    })
  }

  popularForm(pessoaDTO: PessoaDTO) {
    pessoaDTO.contatos.forEach(contato => {
     this.contatos.push(this.popularFormContato(contato));
  })
    this.contatos.removeAt(0); // para correção bug
    this.pessoaForm.patchValue({
      id: pessoaDTO.id,
      nome: pessoaDTO.nome,
      cpf: pessoaDTO.cpf,
      dataNascimento: pessoaDTO.dataNascimento
    });
  }

}
