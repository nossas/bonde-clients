import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  Form,
  InputField,
  Validators,
  SelectField
} from "../../components/forms";
import LGPD from "../../components/ux/LGPD";

import Calling from './Calling';
import TellAFriend from "./TellAFriend";
import type { Target, Call } from './types';

const PhoneAreaStyled = styled.div`
  background-color: #fff;
`

const TargetAreaStyled = styled.div`
  background-color: #eeeeee;
  padding: 15px 26px;
  font-family: inherit;

  .title {
    color: #4c4c4c;
    font-size: 0.8em;
    // margin: 0 0 12px 0;
    font-weight: 700;
  }

  .loading {
    display: block;
  }

  ul {
    list-style-type: none;
    margin: 5px 0 5px -40px;
    display: flex;
    flex-direction: row;
  }

  li {
    font-size: 0.8rem;
    color: #222;
    font-weight: 700;
    background-color: #fff;
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    border-radius: 3px;
  }
`

const FormControlStyled = styled.div`
  padding: 1rem 2rem 0.5rem;
  border-bottom: 1px solid #eee;
`

const FormFooterAreaStyled = styled.div<{ color: string }>`
  padding: 1rem 2rem 0.5rem;

  button {
    background-color: ${props => props.color};
  }
`


const HeadingStyled = styled.h2<{
  bgColor: string
}>`
  background-color: ${(props: any) => props.bgColor};
  font-family: inherit;
  color: #fff;
  display: grid;
  justify-items: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 1rem 2rem;
  margin: 0;
  border-radius: 3px 3px 0 0;
  font-weight: 400;
  text-align: center;
`


const PhoneWidget = (props: any) => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [call, setCall] = useState<Call | undefined>();

  const {
    call_to_action: callToAction,
    title_text: titleText = 'Faça uma ligação para quem pode tomar essa decisão',
    show_city: showCity = 'n',
    show_state: showState = 'n',
    main_color: mainColor = '#f23392',
    button_text: buttonText = 'Ligar',
  } = props.widget?.settings || {};

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/phone/${props.widget.id}/targets`)

      // console log here to determine how to set products
      setTargets((await response.json()) as Target[])
    }
    fetchData()
  }, [])

  const submit = async (values) => {
    const payload = {
      ...values,
      targets: targets.map((target) => target.id)
    }

    const response = await fetch(`/api/phone/${props.widget.id}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    setCall(await response.json())
  }

  let headerComponent;

  if (targets.length > 0 && !!call) {
    headerComponent = (
      <Calling
        target={targets[0] as any}
        call={call}
        emitChange={setCall}
      />
    )
  } else if (targets.length > 0 && !call) {
    headerComponent = (
      <ul>
        {targets.map((item) => (
          <li key={`target-${item.id}`}>{item.name}</li>
        ))}
      </ul>
    )
  } else {
    headerComponent = (
      <span className="loading">Carregando alvos</span>
    )
  }

  return call?.status !== 'completed' ? (
    <PhoneAreaStyled>
      <HeadingStyled bgColor={mainColor}>{callToAction || titleText}</HeadingStyled>
      <TargetAreaStyled>
        <span className="title">{`Quem vai pressionar? (${targets.length} ${targets.length > 1 ? 'alvos' : 'alvo'})`}</span>
        {headerComponent}
      </TargetAreaStyled>
      <Form onSubmit={submit}>
        {(_args: any) => (
          <>
            <FormControlStyled>
              <InputField
                name='person.phone_number'
                label="Telefone"
                placeholder="Insira seu telefone. Ex: +5511987654321"
                validate={Validators.composeValidators(
                  Validators.required("Preenchimento obrigatório"),
                  Validators.isValidPhoneE164({
                    code: 'Informe o código do país e o DDD com dois dígitos. Ex: +5511',
                    invalid: 'Telefone inválido'
                  })
                )}
              />
            </FormControlStyled>
            <FormControlStyled>
              <InputField
                name="person.given_name"
                label="Seu nome"
                placeholder="Insira seu nome"
                validate={Validators.required("Preenchimento obrigatório")}
              />
            </FormControlStyled>
            <FormControlStyled>
              <InputField
                name="person.family_name"
                label="Sobrenome"
                placeholder="Insira seu sobrenome"
                validate={Validators.required("Preenchimento obrigatório")}
              />
            </FormControlStyled>
            {showState === 's' && (
              <FormControlStyled>
                <SelectField
                  label="Estado"
                  name="person.postal_address.region"
                  validate={Validators.required("Preenchimento obrigatório")}
                >
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
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
              </FormControlStyled>
            )}
            {showCity === 's' && (
              <FormControlStyled>
                <InputField
                  name="person.postal_address.locality"
                  label="Cidade"
                  placeholder="Insira sua cidade"
                  validate={Validators.required("Preenchimento obrigatório")}
                />
              </FormControlStyled>
            )}
            <FormFooterAreaStyled color={mainColor}>
              <Button type="submit">{buttonText}</Button>
              <LGPD color="#545454" />
            </FormFooterAreaStyled>
          </>
        )}
      </Form>
    </PhoneAreaStyled>
  ) : (
    <TellAFriend {...props} />
  )
}

export default PhoneWidget;