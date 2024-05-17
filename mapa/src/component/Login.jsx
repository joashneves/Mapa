
import { useState, useEffect } from "react";
import styles from "./Login.module.css";

const Login = () => {

    const [user, setUser] = useState();
    const [password, setPassword] = useState();

    function Logar() {
        window.sessionStorage.setItem("user", user)
        window.sessionStorage.getItem("user")

        window.sessionStorage.setItem("password", password)
        window.sessionStorage.getItem("password")

        window.location.reload();
    }

    return (
        <>
        <article className={styles.logar}>
            <label>User<input
                type="User"
                id="User"
                name="User"
                maxlength="255"
                value={user}
                onChange={(e) => setUser(e.target.value)} />
            </label>
            <label>PassWord<input
                type="PassWord"
                id="PassWord"
                name="PassWord"
                maxlength="255"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </label>
            
            <input type="button" onClick={Logar} value="Logar"/>
            </article>
        </>
    )
}

export default Login;