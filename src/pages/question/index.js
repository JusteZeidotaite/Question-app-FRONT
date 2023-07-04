import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar/Navbar";

const AskQuestion = () => {
  const router = useRouter();

  const [question, setQuestion] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const PostQuestion = async () => {
    try {
      const token = localStorage.getItem("jwt"); 

      const response = await axios.post("http://localhost:8080/question", {
        creationDate: creationDate,
        questionText: question,
      }, {
        headers: {
          Authorization: token, 
        },
      });

      console.log("response", response);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      router.push("/");
    } catch (error) {
      console.error("Error posting question:", error);
     
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.questionWrapper}>
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Enter your question"
        />

        <input
          type="date"
          value={creationDate}
          onChange={(event) => setCreationDate(event.target.value)}
          placeholder="Select creation date"
        />

        <button onClick={PostQuestion}>Post Question</button>

        {showSuccessMessage && (
          <p className={styles.successMessage}>You successfully posted a question!</p>
        )}
      </div>
    </div>
  );
};

export default AskQuestion;