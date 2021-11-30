// import { BrowserRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Wrap } from './styles';
import PdfButton from './PdfButton';

const PlipDetails = () => {
  return (
    <Wrap>
      <h3>Eba! Geramos uma ficha para você assinar:</h3>
      <PdfButton />
      <ol>
        <li><strong>Assine:</strong> Imprima a sua ficha, assine e chame mais 7 pessoas para assinar também.</li>
        <li><strong>Envie a ficha:</strong> Junto com a ficha tem uma etiqueta de envio dos correios. É só levar até a agência mais próxima de você e enviar, é por nossa conta.</li>
      </ol>
      <p>Contamos com você! 🌳✊</p>
      <p>Não pode imprimir agora? Tudo bem! Já enviamos uma cópia no seu e-mail também.</p>
    </Wrap>
  )
} 

export default PlipDetails;
