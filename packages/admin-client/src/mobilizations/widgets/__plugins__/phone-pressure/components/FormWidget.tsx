import React from "react";
import styled from "styled-components";


const FormWidgetStyled = styled.div<{
  mainColor: string
}>`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    padding: 15px 20px;
    background: ${props => props.mainColor || '#000'};
    color: #fff;
    font-size: 24px;
    font-weight: 600;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px 20px;

    .form-control {
      display: flex;
      flex-direction: column;
      gap: 5px;

      input {
        border-bottom: 1px solid #c7c7c7;
      }
    }

    button[type="submit"] {
      background: ${props => props.mainColor || '#000'};
      color: #fff;
      padding: 10px 20px;
      font-weight: 600;
    }

    .lgpd {
      color: #000;
      font-size: 14px;
      text-align: justify;
      margin: 1rem 0 1rem 0;

      a {
        text-decoration: underline;
      }
    }
  }
`


type FormWidgetProps = {
  children: any;
  handleSubmit: any;
  widget: {
    settings: {
      main_color: string;
      title_text?: string;
      call_to_action?: string;
      button_text: string;
    }
  }
}


const FormWidget = (props: FormWidgetProps) => {
  const {
    children,
    handleSubmit,
    widget: {
      settings: {
        main_color: mainColor,
        title_text: titleText,
        call_to_action: callToAction,
        button_text: buttonText
      }
    }
  } = props

  return (
    <FormWidgetStyled mainColor={mainColor}>
      <h3>{titleText || callToAction}</h3>
      <form method="post" onSubmit={handleSubmit}>
        {children}
        <button type="submit">{buttonText}</button>
        <p className="lgpd">Ao inserir seus dados, você concorda em ter seus dados compartilhados com os organizadores dessa página e aceita receber emails de atualização, conforme descrito na <a href="#">política de privacidade</a>. Você pode cancelar o recebimento desses e-mails a qualquer momento.</p>
      </form>
    </FormWidgetStyled>
  )
}

export default FormWidget