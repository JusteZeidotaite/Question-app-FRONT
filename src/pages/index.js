import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import QuestionCard from "../components/questionCard/QuestionCard";

import styles from "./styles.module.css";

const MainPage = ({ questions }) => {
  const [questionList, setQuestionList] = useState(questions);

  const handleDeleteQuestion = async (id) => {
    try {
      const token = localStorage.getItem("jwt");
      await axios.delete(`http://localhost:8080/questions/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setQuestionList((prevQuestionList) =>
        prevQuestionList.filter((question) => question.id !== id)
      );
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.cardsWrapper}>
        {questionList.map((question) => (
          <div key={question._id}>
            <QuestionCard
              id={question.id}
              creationDate={question.creationDate}
              questionText={question.questionText}
              onDelete={handleDeleteQuestion}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;

export async function getServerSideProps(ctx) {
  try {
    const response = await axios.get("http://localhost:8080/questions");
    const { data } = response;
    const questions = data.questionGroup;

    return { props: { questions } };
  } catch (err) {
    console.log(err);
  }
}
