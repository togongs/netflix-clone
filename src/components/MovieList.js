/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./MovieList.module.scss";
import { FaStar } from "react-icons/fa6";

const MovieList = ({ sort }) => {
  const { popularMovies, genreList, searchMovies } = useSelector(
    (state) => state.movie
  );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  return (
    <>
      {query === null || query === ""
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
    </>
  );
};

export default MovieList;
