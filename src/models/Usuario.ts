import type Postagem from "./Postagem"

export default interface Usuario{
// Vamos jogar os dados do swagger aqui
id: number
nome: string
usuario: string
senha: string
foto: string
// Postagem é um array pq pode ter mais d euma, e é do tipo Postagem
// null ou vai ter alguma coisa ou nada, o ? é que pode ter ou nao, pq assim que criar
//  o usuario n tera postagem
postagem?: Postagem[]  | null;


}