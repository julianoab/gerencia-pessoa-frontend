import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PessoaDTO } from '../model/pessoa-dto';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  readonly pessoasUrl = '/api/pessoas';

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }

  adicionar(pessoa: PessoaDTO) : void {
      if (pessoa.id) {
        this.httpClient.put<any>(`${this.pessoasUrl}`, pessoa)
              .subscribe(pessoa =>  {
                  console.log("Pessoa alterada", pessoa);
                }, err => {
                  console.log("Error: ", err);
                }
        );

      } else {
        this.httpClient.post<any>(`${this.pessoasUrl}`, pessoa)
              .subscribe(pessoa =>  {
                console.log("Pessoa criada", pessoa);
              }, err => {
                console.log("Error: ", err);
              }
        );
      }
  } 

  listarTodas() : Observable<PessoaDTO[]> {
    const urlBuscarTodasPessoas = this.pessoasUrl + "/listar-todas"
    return this.httpClient.get<any>(`${urlBuscarTodasPessoas}`);
  
  }

  buscarPorId(id: number): Observable<any> {
    return this.httpClient.get(`${this.pessoasUrl}/${id}`);
  }

  excluir(id: number): Observable<any> {
    return this.httpClient.delete(`${this.pessoasUrl}/${id}`);
  }

  openToast(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000});
  }

}
