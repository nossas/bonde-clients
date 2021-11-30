import React, { useState } from 'react';
import { Form } from 'react-final-form'
import  SelectField from '../components/SelectField';
import TextInput from '../components/TextInput';
import PlipDetails from '../components/PlipDetails';
import styles from './PlipForm.module.css'

type Props = {
  // Function created with createApolloFetch
  // https://www.apollographql.com/blog/4-simple-ways-to-call-a-graphql-api-a6807bcdb355
  asyncFillWidget: any;
  widgetId: number;
  children: any;
};

export interface PlipFormState {
  data: any[];
  submited: boolean;
}

const PlipForm = ({ asyncFillWidget, widgetId }: Props): JSX.Element => {
  const [pdf, setPdf] = useState<PlipFormState>({ data: [], submited: false });

  return (
  <div className={styles.PlipForm}>
    {pdf.submited ? <PlipDetails pdf={pdf} /> : <Form 
  onSubmit={(values) => {
      // console.log(values, widgetId)
      // useEffect(() => {
        asyncFillWidget({...values, widget_id: widgetId})
          .then(({ create_plip }: any) => {
            // setPdf(true);
            setPdf({ data: create_plip, submited: true });
          })
          .catch((err: any) => {
            console.error('PlipPlugin: ', err);
          });
      // }, []);

    }}
    render={renderProps => {

      const {
        handleSubmit,
      } = renderProps;

      return (
      <form onSubmit={handleSubmit}>
        <TextInput id="name" name="name" label="Nome completo* " placeholder="Insira seu nome" />
        <TextInput id="email" name="email" label="Email* " placeholder="Insira seu e-mail" />
        <SelectField id="state" name="state" label="Estado* ">
          <option value="AC">Acre</option>
          <option value="AL">Alagoas</option>
          <option value="BA">Bahia</option>
          <option value="CE">Ceará</option>
          <option value="AM">Amazonas</option>
          <option value="DF">Distrito Federal</option>
          <option value="ES">Espírito Santo</option>
          <option value="GO">Goiás</option>
          <option value="AP">Amapá</option>
          <option value="MA">Maranhão</option>
          <option value="MT">Mato Grosso</option>
          <option value="MS">Mato Grosso do Sul</option>
          <option value="MG">Minas Gerais</option>
          <option value="PA">Pará</option>
          <option value="PB">Paraíba</option>
          <option value="PR">Paraná</option>
          <option value="PE">Pernambuco</option>
          <option value="PI">Piauí</option>
          <option value="RJ">Rio de Janeiro</option>
          <option value="RN">Rio Grande do Norte</option>
          <option value="RS">Rio Grande do Sul</option>
          <option value="RO">Rondônia</option>
          <option value="RR">Roraima</option>
          <option value="SC">Santa Catarina</option>
          <option value="SP">São Paulo</option>
          <option value="SE">Sergipe</option>
          <option value="TO">Tocantins</option>
          <option value="EX">Estrangeiro</option>
        </SelectField>

        <TextInput id="whatsapp" name="whatsapp" label="Whatsapp " placeholder="Seu whatsapp" />

        <SelectField id="signature_quantity" name="signature_quantity" label="Quantidade de Assinaturas* ">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </SelectField>
        <button type="submit">Send</button>
      </form>
      )
    }}
    >
    </Form>}
    </div>
    )
  
};

export default PlipForm;
