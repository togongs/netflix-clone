import api from "../api";
import { movieActions } from "../reducers/movieReducer";

function getMovies() {
  return async (dispatch) => {
    try {
      dispatch(movieActions.loadingSuccess({ loading: true }));

      const popularMovieApi = api.get(
        `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      const topRateApi = api.get(
        `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      const upComingApi = api.get(
        `/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      const genreApi = api.get(
        `/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      let [popularMovies, topRateMovies, upComingMovies, genreList] =
        await Promise.all([popularMovieApi, topRateApi, upComingApi, genreApi]);

      //   dispatch({
      //     type: "GET_MOVIES_SUCCESS",
      //     payload: {
      //       popularMovies: popularMovies.data,
      //       topRateMovies: topRateMovies.data,
      //       upComingMovies: upComingMovies.data,
      //     },
      //   });

      // loading 도착 후
      dispatch(
        movieActions.getAllMovies({
          popularMovies,
          topRateMovies,
          upComingMovies,
          genreList,
        })
      );
    } catch (error) {
      //   dispatch({ type: "GET_MOVIES_FAILURE" });
      dispatch(movieActions.loadingFailure({ loading: false }));
    }
  };
}

function detailMovie(id) {
  return async (dispatch) => {
    try {
      dispatch(movieActions.loadingSuccess({ loading: true }));

      const selectedMovieApi = api.get(
        `/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      const reviewsApi = api.get(
        `/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      const recommendedMovieApi = api.get(
        `/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );

      const genreApi = api.get(
        `/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      let [selected, reviews, recommended, genreList] = await Promise.all([
        selectedMovieApi,
        reviewsApi,
        recommendedMovieApi,
        genreApi,
      ]);

      dispatch(
        movieActions.getSelectedMovie({
          selected,
          reviews,
          recommended,
          genreList,
        })
      );
    } catch (error) {
      dispatch(movieActions.loadingFailure({ loading: false }));
    }
  };
}

function trailer(id) {
  return async (dispatch) => {
    try {
      const tailerApi = await api.get(
        `/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      dispatch(movieActions.movieTrailer({ tailerApi }));
    } catch (error) {
      console.error(error);
    }
  };
}

function pagination(page, size) {
  return async (dispatch) => {
    try {
      const popularMovieApi = await api.get(
        `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&size=${size}`
      );
      dispatch(movieActions.pagination({ popularMovieApi }));
    } catch (error) {
      console.error(error);
    }
  };
}

function search(searchQuery) {
  return async (dispatch) => {
    const searchApi = await api.get(
      `/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchQuery}&include_adult=false`
    );
    dispatch(movieActions.search({ searchApi }));
  };
}

export const movieAction = {
  getMovies,
  detailMovie,
  trailer,
  pagination,
  search,
};
