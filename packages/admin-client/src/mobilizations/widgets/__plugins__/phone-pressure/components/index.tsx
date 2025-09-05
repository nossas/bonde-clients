import React, { useState } from "react"
import styled from "styled-components";


const PhonePressureStyled = styled.div`
    h3 {
        padding: 15px 20px;
        background: #000;
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
            background: #000;
            color: #fff;
            padding: 10px 20px;
        }
    }
`


const PhonePressure = () => {
    const [success, setSuccess] = useState<string>()
    return (
        <PhonePressureStyled>
            <h3>Ligue para quem pode tomar essa decisão</h3>
            {success ? (
                <div className="form-control">
                    <p>{success}</p>
                    <hr />
                    <p>AQUI VEM OS BOTÕES DE COMPARTILHAR CAMPANHA</p>
                </div>
            ) : (
              <form>
                <div className="form-control">
                    <label htmlFor="id_first_name">Nome</label>
                    <input id="id_first_name" name='first_name' />
                </div>
                <div className="form-control">
                    <label htmlFor="id_last_name">Sobrenome</label>
                    <input id="id_last_name" name='last_name' />
                </div>
                <div className="form-control">
                    <label htmlFor="id_email">E-mail</label>
                    <input id="id_email" type="email" name='email' />
                </div>
                <div className="form-control">
                    <label htmlFor="id_number">Telefone</label>
                    <input id="id_number" type="number" name='phone_number' />
                </div>
                <button type="submit">Ligar</button>
              </form>
            )}
        </PhonePressureStyled>
    )
}

export default PhonePressure