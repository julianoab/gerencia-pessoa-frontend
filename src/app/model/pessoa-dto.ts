import { ContatoDTO } from "./contato-dto";

export interface PessoaDTO {
    id: number,
    nome: string,
    cpf: string,
    dataNascimento: string,
    contatos: ContatoDTO[] 
}