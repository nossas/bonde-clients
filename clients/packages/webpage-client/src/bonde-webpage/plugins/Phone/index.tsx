import React, { useState } from "react";
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
import type { Campaign, Call } from './types';
import { HeadingStyled, PhoneAreaStyled, FormControlStyled, FormFooterAreaStyled, CounterAreaStyled, TargetAreaStyled } from './styles'



const PhoneWidget = (props: any) => {
  const [campaign, setCampaign] = useState<Campaign | undefined>(undefined);
  const [call, setCall] = useState<Call | undefined>();

  const {
    call_to_action: callToAction,
    title_text: titleText = 'Faça uma ligação para quem pode tomar essa decisão',
    show_city: showCity = 'n',
    show_state: showState = 'n',
    main_color: mainColor = '#f23392',
    button_text: buttonText = 'Ligar',
    count_text: countText,
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
      targets: campaign?.details.targets.map((target) => target.id)
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
        <span className="title">
          {`Quem vai pressionar? (${campaign?.details.targets.length} ${(campaign?.details.targets.length || 0) > 1 ? 'alvos' : 'alvo'})`}
        </span>
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
      {countText && (
        <CounterAreaStyled color={mainColor}>
          {!campaign ? (
            <span>Carregando</span>
          ) : (
            <>
              <p className="number">{campaign?.details.total}</p>
              <p className="desc">{countText}</p>
            </>
          )}
        </CounterAreaStyled>
      )}
    </PhoneAreaStyled>
  ) : (
    <TellAFriend {...props} />
  )
}

export default PhoneWidget;