import React from "react";
import styles from "./styles.module.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div>
        <img className={styles.logo} src={logo.src} />
      </div>

      <ul>
        <li>
          <a className={styles.mainTitle} href="/">Main</a>
        </li>
        <li>
          <a className={styles.mainAsk} href="/question">Ask a Question</a>
        </li>
        <li>
          <a className={styles.signUp} href="/register">Sign Up</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;