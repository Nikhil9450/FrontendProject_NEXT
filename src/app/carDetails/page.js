"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button, Card, Image, Container, Row, Col, Table, Spinner, Alert } from "react-bootstrap";
import styles from "./page.module.css";

const CarDetailsComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const carId = searchParams.get("id");

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!carId) {
      setError("Car ID is missing in the URL.");
      setLoading(false);
      return;
    }

    const fetchCarDetails = async () => {
      try {
        const res = await fetch(`/api/cars/${carId}`);
        const data = await res.json();

        if (res.ok) {
          setCar(data);
          setError("");
        } else {
          setError(data.error || "Failed to fetch car details.");
        }
      } catch (err) {
        setError("An error occurred while fetching car data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container className={styles.container}>
      <Card className={styles.card}>
        <Row className={styles.row}>
          <Col md={6} className={styles.imageSection}>
            <Card.Title className={styles.title}>{car.make} {car.model}</Card.Title>
            <div className={styles.carousel}>
              <Image src="/car.png" fluid className={styles.image} />
            </div>
          </Col>

          <Col md={6} className={styles.detailsSection}>
            <Card.Body className={styles.cardBody}>
              <Table bordered hover responsive className={styles.table}>
                <tbody>
                  {[
                    { label: "Model", value: car.model },
                    { label: "Make", value: car.make },
                    { label: "Engine", value: car.engine || "N/A" },
                    { label: "Features", value: car.features?.join(", ") || "N/A" },
                    { label: "Color", value: car.color || "N/A" },
                    { label: "Price", value: car.price ? `${car.price}` : "N/A" },
                    { label: "Year", value: car.year || "N/A" },
                    { label: "Mileage", value: car.mileage ? `${car.mileage} km` : "N/A" },
                    { label: "Fuel Type", value: car.fuelType || "N/A" },
                    { label: "Transmission", value: car.transmission || "N/A" },
                    { label: "Horsepower", value: car.horsepower || "N/A" },
                    { label: "Owners", value: car.owners || "N/A" },
                  ].map((item, index) => (
                    <tr key={index}>
                      <td className={styles.label}>{item.label}:</td>
                      <td className={styles.value}>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="outline-primary" size="md" className={styles.backButton} onClick={() => router.back()}>
                Go Back To Home Page
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

// Wrap the component in Suspense
const CarDetails = () => (
  <Suspense fallback={<div className={styles.loadingContainer}><Spinner animation="border" variant="primary" /></div>}>
    <CarDetailsComponent />
  </Suspense>
);

export default CarDetails;
