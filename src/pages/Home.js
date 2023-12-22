import React, { useEffect } from "react";
import { movieAction } from "../redux/actions/movieAction";
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
    return <ClipLoader color="#fff" loading={loading} size={150} />;
  }
  return (
    <div className={styles.container}>
      <Banner movie={popularMovies?.results[0]} />
      <h1>Popular Movie</h1>
      <MovieSlide movies={popularMovies} />
      <h1>Top rated Movie</h1>
      <MovieSlide movies={topRateMovies} />
      <h1>Upcoming Movie</h1>
      <MovieSlide movies={upComingMovies} />
    </div>
  );
};

export default Home;
