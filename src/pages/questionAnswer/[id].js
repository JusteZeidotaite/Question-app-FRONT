import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import Navbar from "../../components/navbar/Navbar";
import Link from "next/link";

const QuestionAnswerPage = () => {
  const [answersToQuestion, setAnswersToQuestion] = useState([]);
  const router = useRouter();

  const fetchAnswersToQuestion = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/question/${router.query.id}/answers`
      );

      const { data } = response;
      console.log("Response:", data);
      setAnswersToQuestion(data.response);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      fetchAnswersToQuestion();
    }
  }, [router.query.id]);

  return (
    <>
      <Navbar />
      <Link  className={styles.answerButton} href={`/answer/${router.query.id}`}>
       Answer This Question!
      </Link>
      <div className={styles.wrapper}>
        {answersToQuestion.map((question) => (
          <div className={styles.answerBox} key={question._id}>
            <h1 className={styles.questionH1}>{question.questionText}</h1>
            {question.question_answers.map((answer) => (
            <h2 key={answer._id} className={styles.answerH2}> - {answer.answerText}</h2>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default QuestionAnswerPage;



