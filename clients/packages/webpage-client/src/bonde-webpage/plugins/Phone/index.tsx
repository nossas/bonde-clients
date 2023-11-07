import React, { useState } from "react";
import {
  Button,
  Form,
  InputField,
  Validators,
  SelectField
} from "../../components/forms";
import LGPD from "../../components/ux/LGPD";
import CountUp from "react-countup";

import Calling from './Calling';
import type { Campaign, Call } from './types';
import { HeadingStyled, PhoneAreaStyled, FormControlStyled, FormFooterAreaStyled, CounterAreaStyled, TargetAreaStyled } from './styles'
import styled from "@emotion/styled";

const Briefing = styled.p`
  padding: 1rem 2rem;
  color: #464545;
`;


const PhoneWidget = (props: any) => {
  const [campaign, setCampaign] = useState<Campaign | undefined>(undefined);
  const [call, setCall] = useState<Call | undefined>();
  const [target, setTarget] = useState<number | undefined>(undefined);

  const {
    call_to_action: callToAction,
    title_text: titleText = 'Faça uma ligação para quem pode tomar essa decisão',
    show_city: showCity = 'n',
    show_state: showState = 'n',
    main_color: mainColor = '#f23392',
    button_text: buttonText = 'Ligar',
    count_text: countText,
    finish_message_type: finishMessageType,
    briefing
  } = props.widget?.settings || {};

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/campaigns/${props.widget.id}/`)

      // console log here to determine how to set products
      setCampaign((await response.json()) as Campaign)
    }
    fetchData()
  }, [])

  const submit = async (values) => {
    const payload = {
      ...values,
      targets: [target]
      // targets: campaign?.details.targets.map((target) => target.id)
    }

    const response = await fetch(`/api/phone/${props.widget.id}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    setCall(await response.json())
  }

  let headerComponent;

  if (!!campaign && !!call) {
    headerComponent = (
      <Calling
        target={campaign.details.targets[0] as any}
        call={call}
        emitChange={setCall}
      />
    )
  } else if (!!campaign && !call) {
    headerComponent = (
      <ul>
        {campaign.details.targets.map((item) => (
          <li key={`target-${item.id}`} className={item.id === target ? "active" : ""} onClick={() => setTarget(item.id)}>{item.name}</li>
        ))}
      </ul>
    )
  } else {
    headerComponent = (
      <span className="loading">Carregando alvos</span>
    )
  }

  if (call?.status !== 'completed' && call?.status !== 'no-answer') {
    return (
      <PhoneAreaStyled>
        <HeadingStyled bgColor={mainColor}>{callToAction || titleText}</HeadingStyled>
        <TargetAreaStyled>
          <span className="title">
            {`Quem vai pressionar? (${campaign?.details.targets.length || 0} ${(campaign?.details.targets.length || 0) > 1 ? 'alvos' : 'alvo'})`}
          </span>
          {headerComponent}
        </TargetAreaStyled>
        <Form onSubmit={submit}>
          {(_args: any) => (
            <>
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
                />
              </FormControlStyled>
              <FormControlStyled>
                <InputField
                  name='person.email_address'
                  label="Email"
                  placeholder="Insira seu email"
                  validate={Validators.composeValidators(
                    Validators.required("Preenchimento obrigatório"),
                    Validators.isEmail("Insira um e-mail válido")
                  )}
                />
              </FormControlStyled>
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
              {showCity === 'city-true' && (
                <FormControlStyled>
                  <InputField
                    name="person.postal_address.locality"
                    label="Cidade"
                    placeholder="Insira sua cidade"
                    validate={Validators.required("Preenchimento obrigatório")}
                  />
                </FormControlStyled>
              )}
              {briefing && (
                <Briefing>{briefing}</Briefing>
              )}
              <FormFooterAreaStyled color={mainColor}>
                <Button type="submit">{buttonText}</Button>
                <LGPD color="#545454" />
              </FormFooterAreaStyled>
            </>
          )}
        </Form>
        {countText && (
          <CounterAreaStyled color={mainColor}>
            {!campaign ? (
              <span>Carregando</span>
            ) : (
              <>
                <CountUp
                  className="count"
                  start={0}
                  end={campaign?.details.total}
                  duration={5}
                />
                <p className="desc">{countText}</p>
              </>
            )}
          </CounterAreaStyled>
        )}
      </PhoneAreaStyled>
    )
  } else {
    const {
      FinishCustomMessage: {
        component: FinishCustomMessage,
        props: customProps,
      },
      FinishDefaultMessage: {
        component: FinishDefaultMessage,
        props: defaultProps,
      },
    } = props.overrides;

    return finishMessageType === 'custom' ? (
      <FinishCustomMessage
        mobilization={props.mobilization}
        widget={props.widget}
        {...customProps}
      />
    ) : (
      <FinishDefaultMessage
        mobilization={props.mobilization}
        widget={props.widget}
        {...defaultProps}
      />
    );
  }
}

export default PhoneWidget;