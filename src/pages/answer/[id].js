import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar/Navbar";

const Answer = () => {
  const router = useRouter();

  const [answerText, setAnswerText] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const postAnswer = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const questionId = router.query.id; // Get the question ID from router.query

      const response = await axios.post(
        `http://localhost:8080/question/${questionId}/answers`,
        {
          answerText: answerText,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("response", response);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      router.push(`/questionAnswer/${questionId}`); // Use the questionId variable
    } catch (error) {
      console.error("Error posting an answer:", error);
    }
  };

  const handleInputChange = (event) => {
    setAnswerText(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.answerWrapper}>
        <input
          value={answerText}
          onChange={handleInputChange}
          placeholder="Enter your answer"
        />

        <button onClick={postAnswer}>Post Answer</button>

        {showSuccessMessage && (
          <p className={styles.successMessage}>You successfully posted an answer!</p>
        )}
      </div>
    </div>
  );
};

export default Answer;
