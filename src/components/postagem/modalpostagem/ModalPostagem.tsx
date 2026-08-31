import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormPostagem from '../formpostagem/FormPostagem';

function ModalPostagem() {
  return (
    <>
      <Popup
        trigger={
          <button className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800 cursor-pointer">
            Nova Postagem
          </button>
        }
        modal
        contentStyle={{
          borderRadius: '1rem',
          paddingBottom: '2rem'
        }}
      >
        {/* Aqui dentro é o que vai aparecer quando a janela abrir */}
        <FormPostagem />
      </Popup>
    </>
  );
}

export default ModalPostagem;