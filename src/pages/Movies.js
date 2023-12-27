import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MovieList from "../components/MovieList";
// import { MdOutlineArrowDropDown } from "react-icons/md";
import styles from "./Movies.module.scss";

const Movies = () => {
  return (
    <Container className={styles.container}>
      <Col>
        <Row className={styles.col}>
          <MovieList />
        </Row>
      </Col>
    </Container>
  );
};

export default Movies;
