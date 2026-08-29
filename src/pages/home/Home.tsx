import ListaPostagens from '../../components/postagem/listapostagens/ListaPostagens';
import ModalPostagem from '../../components/postagem/modalpostagem/ModalPostagem';

function Home() {
  return (
    <>
      {/* Container principal */}
      <div className="bg-indigo-900 flex justify-center">
        {/* Grid */}
        <div className="container grid grid-cols-2 text-white">
          {/* Conteúdo textual */}
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className="text-5xl font-bold">Seja Bem Vindo!</h2>
            <p className="text-xl">Expresse aqui seus pensamentos!</p>
            <ModalPostagem />
          </div>
          {/* Conteúdo de imagem */}
          <div className="flex justify-center">
            <img 
              src="https://i.imgur.com/fyfri1v.png" 
              alt="Imagem da página Home" 
              className="w-2/3" 
            />
          </div>
        </div>
      </div>
      <ListaPostagens />
    </>
  );
}

export default Home;
