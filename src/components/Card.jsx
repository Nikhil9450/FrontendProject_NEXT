"use client";
import React from 'react';
import styles from './Card.module.css';
import { useRouter } from "next/navigation";
import Button from 'react-bootstrap/Button';

const CarCard = ({ carDetails }) => {
  const router = useRouter();

  const handleShowDetails = () => {
    router.push(`/carDetails?id=${carDetails.id}`);
  };

  return (
    <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src="/car.png" alt="Car" className={styles.image} />
        </div>
        <div className={styles.details}>
            <div className={styles.cardHeader}>        
              <h3 className={styles.title}>{carDetails.make} {carDetails.model}</h3>
            </div>
            <div className={styles.textContainer}>
                <p className={styles.price}>  <strong>Price</strong></p>
                <p className={styles.price}> ${carDetails.price}</p>
            </div>
            <div className={styles.textContainer}>
                <p className={styles.price}>  <strong>Color</strong></p>
                <p className={styles.color}> {carDetails.color}</p>
            </div>
            <div className={styles.textContainer}>
              <p className={styles.price}> <strong>Year</strong></p>
              <p className={styles.year}> {carDetails.year}</p>
            </div>
        <Button variant="primary" size="sm" className={styles.button} onClick={handleShowDetails}>
         More Details
        </Button>
      </div>
    </div>
  );
};

export default CarCard;