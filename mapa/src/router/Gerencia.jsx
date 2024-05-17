import React, { useState, useEffect } from 'react';
import Configuracao from "../component/Configuracao";
import axios from 'axios';

const Gerencia = () =>{

    const [configuracoes, setConfiguracoes] = useState([]);
    const [data, setData] = useState([]);

    function enviarInfo() {
        axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/salvar-configuracoes`, configuracoes)
            .then(response => {
                console.log('Configurações salvas com sucesso!');
                window.alert("Dados salvos com sucesso!");
            })
            .catch(error => {
                console.error('Erro ao salvar configurações:', error.message);
            });
    }

    useEffect(() => {
        console.log(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/salvar-configuracoes`)
        axios.get('http://localhost:3001/carregar-configuracoes')
            .then(response => {
                setData(response.data);
                setConfiguracoes(response.data);
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
        <button type="button" onClick={enviarInfo} >Salvas!</button>
        {Object.values(data).map((o) => {
                return (
                    <Configuracao 
                    content={o.content}
                    message={o.message}
                    bounds={o.bounds}
                    onChange={handleConfiguracaoChange}/>
                )
            })}
        </>
    )
}

export default Gerencia;