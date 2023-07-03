import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar/Navbar";

const Register = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const registerUser = async () => {
    try {
      const response = await axios.post("http://localhost:8080/register", {
        name: name,
        password: password,
        email: email,
       
      });

      console.log("response", response);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      router.push("/");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.signUpWrapper}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
        />

        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
        />

        <button onClick={registerUser}>Sign Up</button>

        {showSuccessMessage && (
          <p className={styles.successMessage}>User signed up successfully!</p>
        )}
      </div>
    </div>
  );
};

export default Register;
