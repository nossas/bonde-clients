import React from "react";
import { TextareaField } from "bonde-components";
import styled from 'styled-components';
import { Row, Col } from 'react-grid-system';
import { useTranslation } from "react-i18next";

const Preview = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 3px;
  text-align: center;

  h3 {
    font-weight: 700;
    font-size: 1.25rem;
    margin: 0;
    color: #222;
    margin: 15px 0;
  }

  img {
    width: 100px;
    margin: 15px 0;
  }

  button {
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0;
    font-size: .875rem;
    padding: 2rem;
    width: 100%;
    border-radius: 3px;
    margin: 10px 0;

    &.fb {
      background-color: rgb(45, 136, 237);
    }
    &.tt {
      background-color: rgb(61, 209, 244);
    }
    &.wp {
      background-color: rgb(76, 236, 104);
    }
  }

  p {
    line-height: 1.5;
    margin: 15px 0;
    color: #222;
  }
`;

const DefaultPostAction = (): React.ReactElement => {
  const { t } = useTranslation("widget");

  return (
    <Row>
      <Col xs={6}>
        <TextareaField
          label={t("settings.finish.default.whatsapp.label")}
          name="whatsapp_text"
          placeholder={t("settings.finish.default.whatsapp.placeholder")}
        />
      </Col>
      <Col xs={6}>
        <Preview>
          <h3>Oba, sua pressão foi enviada!</h3>
          <img src={process.env.PUBLIC_URL + '/check-mark-image.png'} alt='Check Mark' />
          <p>Compartilhe com sua galera para aumentarmos nosso impacto!</p>
          <button type='button' className='fb'>Compartilhar no facebook</button>
          <button type='button' className='tt'>Compartilhar no Twitter</button>
          <button type='button' className='wp'>Compartilhar no Whatsapp</button>
        </Preview>
      </Col>
    </Row>
  );
}

export default DefaultPostAction;
