/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Container, Form, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import styles from "./Navigation.module.scss";

const Navigation = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <Navbar expand="lg">
      <Container fluid style={{ padding: 0 }}>
        <Navbar.Brand href="#">
          <img
            className={styles.image}
            width={115}
            height={70}
            src="https://content.surfit.io/thumbs/image/wJW2K/w4VbJ/10552564055eb8333117a06.png/cover-center-2x.webp"
            alt="image"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/" className={styles.link}>
              Home
            </Link>
            <Link to="/movies" className={styles.link}>
              Movies
            </Link>
          </Nav>
          <Form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/movies?query=${search}`);
            }}
          >
            <Form.Control
              type="text"
              placeholder="Search"
              className={styles.formControl}
              aria-label="Search"
              onKeyPress={(event) => {
                const keyword = event.target.value;
                if (event.key === "Enter") {
                  navigate(`/movies?query=${keyword}`);
                }
                setSearch(keyword);
              }}
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            />
            <IoSearchOutline className={styles.searchIcon} />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
