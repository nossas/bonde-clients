import React, { useState } from "react"
import styled from "styled-components";


const CalculatorStyled = styled.div`
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


const Busao0800 = () => {
    const [values, setValues] = useState({
        "n_employees": 10,
        "transportation_cost": 1600.00
    })
    const [success, setSuccess] = useState<string>()

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("handleSubmit", values)
        const totalCost = (values.n_employees - 9) * 170;
        const saveMoney = values.transportation_cost - totalCost;

        setSuccess(`Gasto total com a Taxa de Transporte Público ${totalCost}. Economia da empresa ${saveMoney}`)
        setValues({
            "n_employees": 10,
            "transportation_cost": 1600.00
        })
    }

    const handleChange = (evt) => {
        setValues({
            ...values,
            [evt.target.name]: evt.target.value
        })
    }

    return (
        <CalculatorStyled>
            <h3>Calculadora Busão 0800</h3>
            {success ? (
                <div className="form-control">
                    <p>{success}</p>
                    <hr />
                    <p>AQUI VEM OS BOTÕES DE COMPARTILHAR CAMPANHA</p>
                </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="id_full_name">Nome completo</label>
                    <input id="id_full_name" name='full_name' value={values['name']} onChange={handleChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="id_email">E-mail</label>
                    <input id="id_email" type="email" name='email' value={values['email']} onChange={handleChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="id_n_employees">Número de colaboradores</label>
                    <input id="id_n_employees" type="number" name='n_employees' value={values['n_employees']} onChange={handleChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="id_transportation_cost">Valor total gasto com Vale Transporte </label>
                    <input id="id_transportation_cost" type="number" name='transportation_cost' value={values['transportation_cost']} onChange={handleChange} />
                </div>
                <button type="submit">Calcular</button>
              </form>
            )}
        </CalculatorStyled>
    )
}

export default Busao0800