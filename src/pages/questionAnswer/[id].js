import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import Navbar from "../../components/navbar/Navbar";

const QuestionAnswerPage = () => {
  const [answersToQuestion, setAnswersToQuestion] = useState([]);
  const router = useRouter();

  const fetchAnswersToQuestion = async () => {
    try {
      console.log("Fetching answers...");
      const response = await axios.get(
        `http://localhost:8080/question/${router.query.questionId}/answers`
      );

      const { data } = response;
      console.log("Response:", data);
      setAnswersToQuestion(data.response.question_answers); 

      console.log("Answers:", answersToQuestion);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  useEffect(() => {
    if (router.query.questionId) {
      fetchAnswersToQuestion();
    }
  }, [router.query.questionId]);

  console.log("question_answers:", router.query.question_answers);

  return (
    <>
      <Navbar />
      
      <div className={styles.pageWrapper}>
        {answersToQuestion && (
          <div className={styles.wrapper}>
            <h1>{answersToQuestion.questionText}</h1>

            <div className={styles.answerWrapper}>
              {answersToQuestion.map((answer) => (
                <h2 key={answer._id}>{answer.answerText}</h2>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionAnswerPage;


