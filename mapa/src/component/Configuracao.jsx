import React, { useState } from "react";
import styles from "./Configuracao.module.css";
import checkFalse from "../assets/checkboxfalse.svg";
import checkTrue from "../assets/checkboxtrue.svg";


const Configuracao = ({ message, content, bounds, onChange }) => {
    const [isChecked, setIsChecked] = useState(content);
    const imagem = isChecked ? checkTrue : checkFalse;
    const boundsCord =  bounds;
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
      // Chame a função onChange passando a mensagem e o novo estado da checkbox
      onChange(message, boundsCord, !isChecked);
    };
  
    return (
      <article className={styles.fundo}>
        <img src={imagem} alt="Check Icon" className={styles.check} />
        <p>Numero : {message}</p>
        <div className={styles.checkboxwrapper2}>
          <input
            type="checkbox"
            className={styles.ikxBAC}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
      </article>
    );
  };

export default Configuracao;