import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar/Navbar";

const Answer = () => {
  const router = useRouter();

  const [answerText, setAnswerText] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [questionAnswers, setQuestionAnswers] = useState([]);

  const postAnswer = async () => {
    try {
      const token = localStorage.getItem("jwt");

      const response = await axios.post(
        `http://localhost:8080/question/${router.query.id}/answers`,
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

      // Fetch the updated question with the new answer
      const questionResponse = await axios.get(
        `http://localhost:8080/question/${router.query.id}`
      );
      const data = questionResponse.data.response;

      // Update the question_answers state with the updated question data
      setQuestionAnswers(data[0].question_answers);

      router.push(`/questionAnswer/${router.query.id}`);
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