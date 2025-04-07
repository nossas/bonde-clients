import React, { useState, useEffect } from "react";
import styled from "styled-components";


const SSLCheckerStyled = styled.div`
  padding: 20px;
  background: #e6e6e6;

  button {
    margin-top: 15px;
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
  }

  .retry-time {
    font-size: 14px;
    color: red;
  }
`

const BoxStyled = styled.div`
    margin-bottom: 15px;
`


function SSLChecker({ url }) {
    const [status, setStatus] = useState("Verificando...");
    const [lastChecked, setLastChecked] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60);

    const storageKey = `ssl_status_${url}`;

    // Função para verificar SSL
    const checkSSL = async () => {
        setStatus("Verificando...");
        setTimeLeft(60); // Resetar contador ao verificar manualmente
        try {
            const response = await fetch(url, { method: "HEAD", mode: "no-cors" });
            updateStorage("OK");
        } catch (error) {
            updateStorage("Falhou");
        }
    };

    // Atualiza localStorage e estado
    const updateStorage = (newStatus) => {
        const timestamp = new Date().toLocaleString();
        const data = { status: newStatus, lastChecked: timestamp };
        localStorage.setItem(storageKey, JSON.stringify(data));
        setStatus(newStatus);
        setLastChecked(timestamp);

        if (newStatus === "Falhou") {
            setTimeLeft(60);
        }
    };

    // Efeito ao carregar a página ou mudar a URL
    useEffect(() => {
        // Remover dados antigos ao mudar de URL
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("ssl_status_") && key !== storageKey) {
                localStorage.removeItem(key);
            }
        });

        const storedData = localStorage.getItem(storageKey);
        if (storedData) {
            const { status, lastChecked } = JSON.parse(storedData);
            setStatus(status);
            setLastChecked(lastChecked);

            if (status === "Falhou") {
                checkSSL();
            }
        } else {
            checkSSL();
        }
    }, [url]);

    // Contagem regressiva para re-verificação se falhou
    useEffect(() => {
        if (status === "Falhou" && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (status === "Falhou" && timeLeft === 0) {
            checkSSL();
        }
    }, [status, timeLeft]);

    let statusLabel = <span>Verificando...</span>

    if (status === "OK") {
        statusLabel = <span> &#10004; SSL ativo!</span>
    } else if (status === "Falhou") {
        statusLabel = <span> &#9888; O SSL não está ativo no momento</span>
    }

    return (
        <SSLCheckerStyled>
            <BoxStyled>
                <p><strong>Certificado SSL</strong></p>
                <p>O certificado SSL garante que sua página seja acessada com segurança. Se ele falhar, alguns navegadores podem bloquear o acesso ou exibir alertas de segurança.</p>
            </BoxStyled>
            <BoxStyled>
                <p><strong>Status SSL:</strong>{statusLabel}</p>
                {lastChecked && <p><strong>Última verificação:</strong> {lastChecked}</p>}
                <button onClick={checkSSL}>Reverificar Agora</button>
                {status === "Falhou" && <p className="retry-time">* Próxima tentativa automática em {timeLeft} segundos</p>}
            </BoxStyled>
            <p className="info"><strong>Importante: </strong>A verificação acontece automaticamente a cada 1 minuto e pode levar até 5 minutos para completar. Caso necessário, entre em contato via suporte.</p>
        </SSLCheckerStyled>
    );
}

export default SSLChecker;
