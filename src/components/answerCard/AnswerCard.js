import React from "react";
import styles from "./styles.module.css";


const AnswerCard = ({ answerId, answerText, onDelete }) => {
  const handleDelete = () => {
    onDelete(answerId);
  };

  return (
    <>
      
        <div className={styles.card}>
      
          <h1 className={styles.answerText}>- {answerText}</h1>
        </div>
      <div className={styles.buttons}>
      <button className={styles.deleteButton} onClick={handleDelete}>
        DELETE ANSWER
      </button>
      <button className={styles.likeButton} onClick={handleDelete}>
        LIKE
      </button>
      <button className={styles.dislikeButton} onClick={handleDelete}>
        DISLIKE
      </button>
      </div>
    </>
  );
};

export default AnswerCard;