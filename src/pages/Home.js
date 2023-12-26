import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";
import ClipLoader from "react-spinners/ClipLoader";
import { getMovies } from "../redux/reducers/movieReducer";
import styles from "./Home.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRateMovies, upComingMovies, loading } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  if (loading) {
    return (
      <div id="loader">
        <ClipLoader color="#fff" loading={loading} size={150} />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Banner movie={popularMovies?.results?.[0]} />
      <h3>Popular Movie</h3>
      <MovieSlide movies={popularMovies} />
      <h3>Top rated Movie</h3>
      <MovieSlide movies={topRateMovies} />
      <h3>Upcoming Movie</h3>
      <MovieSlide movies={upComingMovies} />
    </div>
  );
};

export default Home;
