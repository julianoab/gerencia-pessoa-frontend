import { Component, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { PessoaDTO } from 'src/app/model/pessoa-dto';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pessoa-pesquisa',
  standalone: false,
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent  implements OnInit {
  
  constructor(private fb: FormBuilder, 
              private service: PessoaService, 
              private router: Router) {}
  
  pessoas = new MatTableDataSource<PessoaDTO>([]);
  displayedColumns  = ['nome', 'cpf', 'dataNascimento', 'editar', 'excluir'];

  pessoaPesquisa!: FormGroup;

  ngOnInit() {
    this.carregaFormInicial();
    this.carregarLista();
  }

  carregaFormInicial(): void {
    this.pessoaPesquisa = this.fb.group({
      nome: ['', [Validators.required]],
    }) ;
  }

  editar(id: number) {
    this.router.navigate(['/pessoa', id]);  
  }

  adicionar() {
    this.router.navigate(['/pessoa']);
  }

  excluir(id: number) {
    this.service.excluir(id).subscribe((any) => {
      this.service.openToast("Pessoa Removida com sucesso", 'Undo');
      this.carregarLista();
    }, err => {
      console.log("error:", err);
    });
  }

  carregarLista() {
    this.service.listarTodas().subscribe(pessoas => {
         this.pessoas.data = pessoas;
    }, err => {
      console.log("error:", err);
    });
  }

  pesquisar(arg0: FormGroup<any>) {
    throw new Error('Method not implemented.');
  }

}
