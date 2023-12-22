import React from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import styles from "./MovieCard.module.scss";

const MovieCard = (item) => {
  const navigate = useNavigate();
  const { genreList } = useSelector((state) => state.movie);
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}` +
          ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        border: "none",
        backgroundPosition: "center center",
      }}
      onClick={() => {
        navigate(`/movies/${item.id}`);
      }}
    >
      <div className={styles.overlay}>
        <h5>{item.title}</h5>
        <div className={styles.badgeContainer}>
          {item.genre_ids.map((id) => (
            <Badge className={styles.badge} bg="danger" key={id}>
              {genreList.find((item) => item.id === id)?.name}
            </Badge>
          ))}
        </div>
        <div className={styles.rateContainer}>
          <FaStar className={styles.rate} />{" "}
          <span className={styles.text}>{item.vote_average.toFixed(1)}</span>
        </div>
        <p className={styles.adult}>{item.adult ? "18" : "Under 18"}</p>
      </div>
    </div>
  );
};

export default MovieCard;
