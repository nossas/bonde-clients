import React, { useState, useEffect } from "react";

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

    return (
        <div className="ssl-checker">
            <p><strong>Status SSL:</strong> {status}</p>
            {lastChecked && <p><strong>Última verificação:</strong> {lastChecked} | <button onClick={checkSSL}>Reverificar Agora</button></p>}
            {status === "Falhou" && <p>Nova verificação em {timeLeft}s</p>}
        </div>
    );
}

export default SSLChecker;
