import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

const QuestionCard = ({ id, questionText, creationDate, onDelete }) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <>
      <Link className={styles.link} href={`/questionAnswer/${id}`}>
        <div className={styles.card}>
          <div className={styles.creationDate}>{creationDate}</div>
          <h1 className={styles.questionText}>{questionText}</h1>
        </div>
      </Link>
      <button className={styles.deleteButton} onClick={handleDelete}>
        DELETE
      </button>
    </>
  );
};

export default QuestionCard;
