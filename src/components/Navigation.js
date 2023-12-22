import React, { useState } from "react";
import { Container, Form, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            width={100}
            src="https://content.surfit.io/thumbs/image/wJW2K/w4VbJ/10552564055eb8333117a06.png/cover-center-2x.webp"
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/" className="nav-item">
              Home
            </Link>
            <Link to="/movies" className="nav-item">
              Movies
            </Link>
          </Nav>
          <Form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/movies?query=${search}`);
            }}
          >
            <Form.Control
              type="text"
              placeholder="Search"
              className="me-2"
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
            <Button
              variant="outline-danger"
              onClick={() => {
                navigate(`/movies?query=${search}`);
              }}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
