import { Link } from "react-router-dom";
import type Postagem from "../../../models/Postagem";


interface CardPostagemProps{
  postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagemProps) {
  return (
    <div className="border-slate-900 border flex flex-col rounded overflow-hidden justify-between">
      
      {/* Cabeçalho com as informações do Usuário que fez a postagem */}
      <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
        <img 
          src={postagem.usuario?.foto || 'https://i.imgur.com/I8MglCG.png'} 
          className="h-12 rounded-full" 
          alt={postagem.usuario?.nome} 
        />
        <h3 className="text-lg font-bold text-center uppercase">
          {postagem.usuario?.nome}
        </h3>
      </div>

      {/* Corpo com os dados da Postagem */}
      <div className="p-4">
        <h4 className="text-lg font-semibold uppercase">{postagem.titulo}</h4>
        <p>{postagem.texto}</p>
        
        <p>Tema: {postagem.tema?.descricao}</p>
        
        {/* formatação de data */}
        <p>Data: {new Intl.DateTimeFormat('pt-BR', {
          dateStyle: 'full',
          timeStyle: 'medium',
        }).format(new Date(postagem.data))}</p>
      </div>

      {/* Botões de Ação */}
      <div className="flex">
        <Link to={`/editarpostagem/${postagem.id}`} className="w-full text-white bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2 cursor-pointer">
          <button>Editar</button>
        </Link>

        <Link to={`/deletarpostagem/${postagem.id}`} className="text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center py-2 cursor-pointer">
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardPostagem;
