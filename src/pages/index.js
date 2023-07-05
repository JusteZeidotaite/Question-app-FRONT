import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import QuestionCard from "../components/questionCard/QuestionCard";

import styles from "./styles.module.css";

const MainPage = ({ questions }) => {
  const [questionList, setQuestionList] = useState(questions);
  const [showAnswered, setShowAnswered] = useState(true);
  const [showUnanswered, setShowUnanswered] = useState(true);

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

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === "answered") {
      setShowAnswered(checked);
    } else if (name === "unanswered") {
      setShowUnanswered(checked);
    }
  };

  const filteredQuestions = questionList.filter((question) => {
    if (showAnswered && showUnanswered) {
      return true;
    } else if (showAnswered && !showUnanswered) {
      return question.answered;
    } else if (!showAnswered && showUnanswered) {
      return !question.answered;
    }
    return false;
  });

  return (
    <div>
      <Navbar />
      <div className={styles.filterWrapper}>
        <label>
          Show Answered
          <input
            type="checkbox"
            name="answered"
            checked={showAnswered}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Show Unanswered
          <input
            type="checkbox"
            name="unanswered"
            checked={showUnanswered}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      <div className={styles.cardsWrapper}>
        {filteredQuestions.map((question) => (
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
