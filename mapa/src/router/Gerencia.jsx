import React, { useState } from 'react';
import Configuracao from "../component/Configuracao";

const Gerencia = () =>{

    const [configuracoes, setConfiguracoes] = useState([]);

    function enviarInfo(){
        console.log(configuracoes);
    }

    const handleConfiguracaoChange = (message, content) => {
        // Verifique se já existe uma configuração com a mesma mensagem
        const index = configuracoes.findIndex(config => config.message === message);

        // Se não existir, adicione uma nova configuração
        if (index === -1) {
        setConfiguracoes(prevConfiguracoes => [...prevConfiguracoes, { message, content }]);
        } else {
        // Se existir, atualize a configuração existente
        setConfiguracoes(prevConfiguracoes => {
            const newConfiguracoes = [...prevConfiguracoes];
            newConfiguracoes[index] = { message, content };
            return newConfiguracoes;
        });
        }
    };


    return(
        <>
        <button type="button" onClick={enviarInfo}>Salvas!</button>
        <Configuracao content={false} message="1" onChange={handleConfiguracaoChange}/>
        <Configuracao content={true} message="2" onChange={handleConfiguracaoChange}/>
        <Configuracao content={true} message="3" onChange={handleConfiguracaoChange}/>
        </>
    )
}

export default Gerencia;