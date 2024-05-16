import React from "react";
import Configuracao from "../component/Configuracao";

const Gerencia = () =>{

    function enviarInfo (){
        
    }

    return(
        <>
        <button type="button" onClick={enviarInfo}>Salvas!</button>
        <Configuracao content={false} message="1"/>
        <Configuracao content={true} message="2"/>
        </>
    )
}

export default Gerencia;