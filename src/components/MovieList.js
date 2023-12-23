/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./MovieList.module.scss";
import { FaStar } from "react-icons/fa6";
import Pagination from "react-js-pagination";
import { pagination, search } from "../redux/reducers/movieReducer";

const MovieList = ({ sort }) => {
  const { popularMovies, genreList, searchMovies } = useSelector(
    (state) => state.movie
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(0);
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const searchQuery = query.get("query");

  useEffect(() => {
    if (searchQuery !== "") {
      dispatch(search({ page, size, searchQuery }));
    }
    if (searchQuery !== "" && searchMovies?.results?.length === 0) {
      setSize(0);
      return;
    }
    setSize(popularMovies?.total_pages);
    dispatch(pagination({ page, size }));
  }, [
    dispatch,
    page,
    popularMovies?.total_pages,
    searchMovies?.results?.length,
    searchQuery,
    size,
  ]);
  return (
    <>
      {searchQuery === null || searchQuery === ""
        ? popularMovies.results?.map((item) => (
            <div
              key={item.id}
              style={{
                height: 550,
                width: 350,
                backgroundImage:
                  "url(" +
                  `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}` +
                  ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                margin: 0,
                padding: 15,
                borderRadius: 8,
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/movies/${item.id}`);
              }}
            >
              <div className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
                  alt="image"
                  width={70}
                  height={100}
                />
                <h3>{item.title}</h3>
              </div>
              <div className={styles.badgeContainer}>
                {item.genre_ids.map((id) => (
                  <Badge className={styles.badge} bg="danger" key={id}>
                    {genreList.find((item) => item.id === id)?.name}
                  </Badge>
                ))}
              </div>
              <p className={styles.overview}>{item.overview}</p>
              <div className={styles.rateContainer}>
                <FaStar className={styles.rate} />{" "}
                <span className={styles.text}>
                  {item.vote_average.toFixed(1)}
                </span>
              </div>
              <p className={styles.adult}>{item.adult ? "18" : "Under 18"}</p>
            </div>
          ))
        : sort
        ? sort.map((item) => (
            <div
              key={item.id}
              style={{
                height: 550,
                width: 350,
                backgroundImage:
                  "url(" +
                  `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}` +
                  ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                margin: 0,
                padding: 15,
                borderRadius: 8,
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/movies/${item.id}`);
              }}
            >
              <div className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
                  alt="image"
                  width={70}
                  height={100}
                />
                <h3>{item.title}</h3>
              </div>
              <div className={styles.badgeContainer}>
                {item.genre_ids.map((id) => (
                  <Badge className={styles.badge} bg="danger" key={id}>
                    {genreList.find((item) => item.id === id)?.name}
                  </Badge>
                ))}
              </div>
              <p className={styles.overview}>{item.overview}</p>
              <div className={styles.rateContainer}>
                <FaStar className={styles.rate} />{" "}
                <span className={styles.text}>
                  {item.vote_average.toFixed(1)}
                </span>
              </div>
              <p className={styles.adult}>{item.adult ? "18" : "Under 18"}</p>
            </div>
          ))
        : searchMovies.results?.map((item) => (
            <div
              key={item.id}
              style={{
                height: 550,
                width: 350,
                backgroundImage:
                  "url(" +
                  `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}` +
                  ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                margin: 0,
                padding: 15,
                borderRadius: 8,
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/movies/${item.id}`);
              }}
            >
              <div className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
                  alt="image"
                  width={70}
                  height={100}
                />
                <h3>{item.title}</h3>
              </div>
              <div className={styles.badgeContainer}>
                {item.genre_ids.map((id) => (
                  <Badge className={styles.badge} bg="danger" key={id}>
                    {genreList.find((item) => item.id === id)?.name}
                  </Badge>
                ))}
              </div>
              <p className={styles.overview}>{item.overview}</p>
              <div className={styles.rateContainer}>
                <FaStar className={styles.rate} />{" "}
                <span className={styles.text}>
                  {item.vote_average.toFixed(1)}
                </span>
              </div>
              <p className={styles.adult}>{item.adult ? "18" : "Under 18"}</p>
            </div>
          ))}
      {size !== 0 ? (
        <Pagination
          activePage={page} // 현재페이지
          itemsCountPerPage={10} // 한 페이지당 보여줄 아이템 개수
          totalItemsCount={size} // 총 아이템 갯수
          pageRangeDisplayed={5} // paginator 보여줄 범위
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(page) => setPage(page)}
        />
      ) : (
        <p style={{ marginTop: 30 }}>
          There are no results matching the search term you entered.
        </p>
      )}
    </>
  );
};

export default MovieList;
