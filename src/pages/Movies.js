import React, { useEffect, useState } from "react";
import { Badge, Col, Container, Row, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { movieAction } from "../redux/actions/movieAction";
import Pagination from "react-js-pagination";
import MovieList from "../components/MovieList";
import { pagination, search, getMovies } from "../redux/reducers/movieReducer";

const Movies = () => {
  const { searchMovies, genreList } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(0);
  const [query, setQuery] = useSearchParams();
  const [sort, setSort] = useState(null);
  // const [title, setTitle] = useState("");
  const [selectedKey, setSelectedKey] = useState();
  // const [value, setValue] = useState("50");
  const [range, setRange] = useState({ min: 5, max: 10 });
  const searchQuery = query.get("query") || "";
  const moveToPage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setSize(searchMovies?.total_pages);
    dispatch(pagination({ page, size }));
  }, [dispatch, page, searchMovies?.total_pages, size]);

  useEffect(() => {
    if (searchQuery !== "") {
      dispatch(search({ searchQuery }));
    }
    dispatch(getMovies());
  }, [dispatch, searchQuery]);

  const sortMenu = [
    { title: "total", key: 1 },
    { title: "popularity(DESC)", key: 2 },
    { title: "popularity(ASC)", key: 3 },
  ];

  const getRangeMovies = (value) => {
    setRange(value);
    let { min, max } = value;
    let maxNum = max.toString();
    let minNum = min.toString();
    let data = [...searchMovies.results.map((item) => item.release_date)];
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
          <Row style={{ gap: 20 }}>
            <MovieList sort={sort} />
          </Row>
        </Col>

        <Pagination
          activePage={page} // 현재페이지
          itemsCountPerPage={10} // 한 페이지당 보여줄 아이템 개수
          totalItemsCount={size ?? 0} // 총 아이템 갯수
          pageRangeDisplayed={5} // paginator 보여줄 범위
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={moveToPage} // 핸들링 함수
        />
      </Row>
    </Container>
  );
};

export default Movies;
