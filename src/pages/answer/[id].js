import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar/Navbar";

const AnswerQuestion = () => {
  const router = useRouter();

  const [answerText, setAnswerText] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const postAnswer = async () => {
    try {
      const token = localStorage.getItem("jwt");

      if (!answerText) {
        setErrorMessage("Answer text is required");
        return;
      }

      const response = await axios.post(
        `http://localhost:8080/question/${router.query.id}/answers`,
        {
          answerText: answerText
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log("response", response.data.response);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      // router.push(`/questionAnswer/${router.query.questionId}`);
    } catch (error) {
      console.error("Error posting answer:", error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      postAnswer();
    }
  }, [router.query.id]);

  return (
    <div>
      <Navbar />
      <div className={styles.answerWrapper}>
        <input
          value={answerText}
          onChange={(event) => setAnswerText(event.target.value)}
          placeholder="Enter your answer"
        />

        <button onClick={postAnswer}>Post Answer</button>

        {errorMessage && (
          <p className={styles.errorMessage}>{errorMessage}</p>
        )}

        {showSuccessMessage && (
          <p className={styles.successMessage}>
            You successfully posted an answer!
          </p>
        )}
      </div>
    </div>
  );
};

export default AnswerQuestion;


