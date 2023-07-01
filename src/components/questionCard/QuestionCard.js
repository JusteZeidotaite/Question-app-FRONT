import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

const QuestionCard = ({ id, questionText, creationDate }) => {
  return (
    <>
      <Link className={styles.link} href={`/question/${id}`}>
        <div className={styles.card}>
          <h1 className={styles.questionText}>{questionText}</h1>
          <div className={styles.creationDate}>{creationDate}</div>
        </div>
      </Link>
    </>
  );
};

export default QuestionCard;