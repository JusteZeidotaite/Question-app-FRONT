import React from "react";
import styles from "./styles.module.css";


const AnswerCard = ({ id, answerText, onDelete }) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <>
      
        <div className={styles.card}>
      
          <h1 className={styles.answerText}>{answerText}</h1>
        </div>
     
      <button className={styles.deleteButton} onClick={handleDelete}>
        DELETE ANSWER
      </button>
      <button className={styles.likeButton} onClick={handleDelete}>
        LIKE
      </button>
      <button className={styles.dislikeButton} onClick={handleDelete}>
        DISLIKE
      </button>
    </>
  );
};

export default AnswerCard;