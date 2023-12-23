import React from "react";
import styles from "./Banner.module.scss";

const Banner = ({ movie }) => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie?.poster_path}` +
          ")",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className={styles.info}>
        <h1>{movie?.title}</h1>
        <p>{movie?.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
