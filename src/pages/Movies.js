import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MovieList from "../components/MovieList";

const Movies = () => {
  const { popularMovies } = useSelector((state) => state.movie);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sort, setSort] = useState(null);
  const [selectedKey, setSelectedKey] = useState();
  // const [value, setValue] = useState("50");

  const sortMenu = [
    { title: "total", key: 1 },
    { title: "popularity(DESC)", key: 2 },
    { title: "popularity(ASC)", key: 3 },
  ];

  const getRangeMovies = (value) => {
    let { min, max } = value;
    let maxNum = max.toString();
    let minNum = min.toString();
    let data = [...popularMovies.results.map((item) => item.release_date)];
    const list = data.filter((item) => minNum < item < maxNum);
    // list.map((item) => item.release_date);
    // list.filter(value=>value);
  };

  return (
    <Container style={{ marginTop: 30 }}>
      <Row>
        <Col lg={4}>
          {/* <select
            onChange={(event) => {
              console.log("event", event.target.value);
              setSelectedKey(event.target.value);
              if (selectedKey === 2) {
                const list = [...searchMovies.results];
                list.sort((a, b) => b.popularity - a.popularity);
                setSort(list);
              } else if (selectedKey === 3) {
                const list = [...searchMovies.results];
                list.sort((a, b) => a.popularity - b.popularity);
                setSort(list);
              } else {
                const list = [...searchMovies.results];
                setSort(list);
              }
            }}
          >
            {sortMenu.map((menu) => (
              <option key={menu.key} value={menu.key}>
                {menu.title}
              </option>
            ))}
          </select> */}
          {/* <Dropdown onSelect={selectedItem} variant="dark">
            <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
              {title ? title : "NONE"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {sortMenu.map((menu) => (
                <Dropdown.Item eventKey={menu.key}>{menu.title}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown> */}
          {/* <InputRange
            maxValue={2022}
            minValue={1990}
            value={range}
            onChange={getRangeMovies}
            onChangeComplete={(value) => console.log(value)}
          /> */}
        </Col>
        <Col lg={8}>
          <Row style={{ gap: 20, width: 725, margin: "0 auto" }}>
            <MovieList sort={sort} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Movies;
