import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {

  // Objeto navigate - responsavel por Redirecionar o usuario para uma outra rota
  const navigate = useNavigate();

  // Estado responsavel por controlar o loader(animaçãozinha de carregamento
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // estado responsavel por guardar os dados ddo usuario que serão persistidos
  // (gravados) no Banc de dados da sua API
  const [usuario, setUsuario] = useState<Usuario>(
    {
      // precisa inicializar o tipo usuario e vamos importar da model
      // Copia os dados obrigatorios la d eusuario - postagem é eopcional
      // Qual valor padrão de number = 0 e string vazia "" - 
      // precisa fazer isos pra n ir tranqueira no formulario, abrir vazio
      id: 0,
      nome: '',
      usuario: '',
      senha: '',
      foto: '', 
    }
  )

  // criar estado ro confirmarr sneha q n faz parte do objetto ali
  // Estado responsável por guardar a senha digitada no  campo confirmar senha
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  // Tratar do efeito colateral do sucesso do cadastro(redirecionar para a página de login)
  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario])

  // e - abreviação de evento  -precisa dizer qual evento e quem dispara? HTML input.. 
  // q são so teus inputs la do HTML
  // Função responsavel por atualizar o estado usuario
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    // Qual a função que suamos para atualizar estado? Setusuario, mas usuario tme varios atributos ne
    // Se digita so o nome ele vai atualziar so o nome, quando pula pra usuario ele apaga nome e 
    // vc digita  um e vai pro prox ele apaga pq atualzia tudo n so um pedaço, então precismao 
    // guardar oq foi digitado e n perder, so atualizar - n é so atualizar é guardar a infor anterior
    // Usaremos o spread
    setUsuario({
      // Aqui é - gaurda tudo oq estava la e dai vc atualiza a propredade q eu quro mudar
      // E como saberemos a propriedade que estamos mudando? PElo e
      ...usuario,
      [e.target.name]: e.target.value, 
    })
  }

  // Função responsavel por atualizar o estado confirmarSenha
  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    // como é o estado de 1 so atributo odemos passar o set direto
    setConfirmarSenha(e.target.value);
  }

  // Função responsavel por enviar uma requisição do tipo POST
  // com os dados do usuario (eestado usuario) e la dentro vai receber um evento do tipo .sintectevent
  // 
  async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>){
    // impede que seja enviado para validações
    e.preventDefault()
    
    // Precisa validar o formulario - saber se as senhas conferem
    // Valdiar a senha digitada
    if (confirmarSenha !== usuario.senha || usuario.senha.length < 8){
       ToastAlerta("Senhas não conferem e/ou possuem menos que 8 caracteres.", "erro")
       setUsuario({...usuario, senha:''})
       setConfirmarSenha('')
       return
    }

    setIsLoading(true);

    // Envio da requisição
    try{
      await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
      ToastAlerta("Usuário cadastrado com sucesso!", "sucesso")

    } catch(error){
      if(axios.isAxiosError(error) && error.response){
        ToastAlerta(`Erro ao cadastrar o usuário: ${error.response.status}`, "erro");
      }else {
        ToastAlerta("Erro ao cadastrar o usuário! Verifique a conexão com a API.", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Função para retornar para a página de login
  function retornar(){
    navigate('/');
  }

  // Só p testar em prod tiramos se n fica exposto no console - precisa o JSON stri.. 
  // pq é mais de uma tributo
  console.log(JSON.stringify(usuario))
  console.log("Confrmar:", confirmarSenha)

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <div
          className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center"
        ></div>
        <form className='flex justify-center items-center flex-col w-2/3 gap-3' onSubmit={cadastrarNovoUsuario}>
          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
          
          <div className="flex flex-col w-full">
            <label htmlFor="nome" className="text-black font-semibold">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite seu nome"
              required
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.nome}
              onChange = {(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e) }
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="usuario" className="text-black font-semibold">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Digite seu usuário (e-mail)"
              required
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.usuario}
              onChange = {(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e) }
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="foto" className="text-black font-semibold">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Coloque o URL da sua foto"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.foto}
              onChange = {(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e) }
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="senha" className="text-black font-semibold">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              required
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.senha}
              onChange = {(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e) }
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha" className="text-black font-semibold">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirme a sua senha"
              required
              className="border-2 border-slate-700 rounded p-2"
              value={confirmarSenha}
              onChange = {(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e) }
            />
          </div>

          <div className="flex justify-around w-full gap-8">
            <button
              type='reset'
              className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2 cursor-pointer'
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2 flex justify-center cursor-pointer'
            >
              {
                isLoading ? (
                  <ClipLoader
                    color="#ffffff"
                    size={24}
                  />
                ):(
                  <span>Cadastrar</span>
                )
              }
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro;