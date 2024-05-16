import styles from "./Configuracao.module.css";
import checkFalse from "../assets/checkboxfalse.svg";
import checkTrue from "../assets/checkboxtrue.svg";

const Configuracao = (props) => {
    const imagem = props.content ? checkTrue : checkFalse;
    return(
        <>
        <article className={styles.fundo}>
            <img src={imagem} alt="Check Icon" className={styles.check}/>
            <p>Numero : {props.message}</p>
            <div className={styles.checkboxwrapper2}>
            <input type="checkbox" className={styles.ikxBAC}/>
            </div>
        </article>
        </>
    )
}

export default Configuracao;