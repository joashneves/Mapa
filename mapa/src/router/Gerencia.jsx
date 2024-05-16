import React, { useState, useEffect } from 'react';
import Configuracao from "../component/Configuracao";
import axios from 'axios';

const Gerencia = () =>{

    const [configuracoes, setConfiguracoes] = useState([]);
    const [data, setData] = useState([]);

    function enviarInfo() {
        axios.post('http://localhost:3001/salvar-configuracoes', configuracoes)
            .then(response => {
                console.log('Configurações salvas com sucesso!');
                window.alert("Dados salvos com sucesso!");
            })
            .catch(error => {
                console.error('Erro ao salvar configurações:', error.message);
            });
    }

    useEffect(() => {
        axios.get('http://localhost:3001/carregar-configuracoes')
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar dados:', error);
            });
    }, []); // A lista de dependências está vazia, portanto, useEffect será executado apenas uma vez após a montagem do componente




    const handleConfiguracaoChange = (message, bounds, content) => {
        // Verifique se já existe uma configuração com a mesma mensagem
        const index = configuracoes.findIndex(config => config.message === message);

        // Se não existir, adicione uma nova configuração
        if (index === -1) {
        setConfiguracoes(prevConfiguracoes => [...prevConfiguracoes, { message, bounds, content }]);
        } else {
        // Se existir, atualize a configuração existente
        setConfiguracoes(prevConfiguracoes => {
            const newConfiguracoes = [...prevConfiguracoes];
            newConfiguracoes[index] = { message, bounds, content };
            return newConfiguracoes;
        });
        }
    };


    return(
        <>
        <button type="button" onClick={enviarInfo}>Salvas!</button>
        <Configuracao content={false} message="1" bounds={[[ -21.234217308646965,-40.98909437656403 ], [ -21.233987298568533, -40.9886384010315]]} onChange={handleConfiguracaoChange}/>
        <Configuracao content={false} message="2" bounds={ [[ -21.234097303433423,  -40.9909987449646 ], [ -21.233957297227505,-40.99093973636628]]} onChange={handleConfiguracaoChange}/>
        <Configuracao content={false} message="3" bounds={[[-21.234352314395462, -40.98823070526124], [-21.234127304745964,  -40.9877371788025]]} onChange={handleConfiguracaoChange}/>
        </>
    )
}

export default Gerencia;