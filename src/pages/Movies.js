import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MovieList from "../components/MovieList";
// import { MdOutlineArrowDropDown } from "react-icons/md";
import styles from "./Movies.module.scss";

const Movies = () => {
  // const sortMenu = [
  //   { title: "Total", key: 1 },
  //   { title: "Popularity(DESC)", key: 2 },
  //   { title: "Popularity(ASC)", key: 3 },
  // ];

  return (
    <Container className={styles.container}>
      {/* <Col className={styles.col} lg={4}> */}
      {/* <select
            className={styles.select}
            onChange={(event) => {
              setSelectedKey(event.target.value);
            }}
          >
            {sortMenu.map((menu) => (
              <option key={menu.key} value={menu.key}>
                {menu.title}
              </option>
            ))}
            <MdOutlineArrowDropDown className={styles.arrow} />
          </select> */}
      {/* </Col> */}
      <Col>
        <Row className={styles.col}>
          <MovieList />
        </Row>
      </Col>
    </Container>
  );
};

export default Movies;
