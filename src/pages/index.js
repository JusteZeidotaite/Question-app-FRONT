import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar"
import QuestionCard from "../components/questionCard/QuestionCard"

import styles from "./styles.module.css";

const MainPage = ({ questions }) => {
  const [questionList, setQuestionList] = useState(questions);

  return (
    <div>
      <Navbar />
      <div className={styles.cardsWrapper}>
        {questionList.map((question) => (
          <div key={question._id}>
            <QuestionCard
              id={question._id}
              creationDate={question.creationDate}
              questionText={question.questionText}
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
    console.log (data);
    const questions = data.questionGroup;

    return { props: { questions } };
  } catch (err) {
    console.log(err);
   
  }
}