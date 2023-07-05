import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import Navbar from "../../components/navbar/Navbar";
import Link from "next/link";
import AnswerCard from "../../components//answerCard/AnswerCard";

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

  const handleDeleteAnswer = async (answerId) => {
  try {
    
    await axios.delete(`http://localhost:8080/answers/${answerId}`);

    fetchAnswersToQuestion();
  } catch (error) {
    console.error("Error deleting answer:", error);
  }
};

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
            <AnswerCard     key={answer._id}
                            id={answer.id}
                            answerText={answer.answerText}
                            onDelete={handleDeleteAnswer}
            />
            ))};
            
          </div>
        ))}
      </div>
    </>
  );
};

export default QuestionAnswerPage;



