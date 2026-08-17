function Home() {
  return (
    // Conteiner Principal
    <div className="bg-indigo-900 flex justify-center">
           
            {/* Seção com duas colunas */}
        <div className="container grid grid-cols-1 md:grid-cols-2 text-white">
 
            {/* Conteúdo de texto */}
            <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className="text-2xl md:text-5xl font-bold">
                Seja Bem Vindo(a)!
                </h2>
 
            <p className="text-xl">
                Expresse aqui seus pensamentos
                </p>
 
            <div className="flex justify-around gap-4">
                <div className="rounded-lg border-2 border-solid border-white py-2 px-4">
                    Nova Postagem
                </div>
            </div>
            </div>
 
                {/* Imagem da Página home */}
                <div className="flex justify-center">
                <img
                src="https://i.imgur.com/fyfri1v.png"
                alt="Imagem da página Home"
                className="w-2/3"
                 />
                </div>
 
 
        </div>
 
 
    </div>
  )
}
 
export default Home