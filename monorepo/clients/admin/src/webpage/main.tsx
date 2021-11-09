import { render } from 'react-dom';
import Application from "./Application";
import Mobilization from "./components/Page";

const Main = () => (
  <Application>
    <h2>Webpage APP</h2>
    <Mobilization />
  </Application>
);

render(
  <Main />
, document.querySelector('#root'));
