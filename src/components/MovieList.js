import React from "react";
import { Badge, Col, coverer, Row, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

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
              className="movies-banner"
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
              }}
              onClick={() => {
                navigate(`/movies/${item.id}`);
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
                  alt=""
                  width={70}
                  height={100}
                  style={{
                    marginRight: 10,
                    marginBottom: 10,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <h3>{item.title}</h3>
              </div>
              <div>
                <div>
                  {item.genre_ids.map((id) => (
                    <Badge bg="danger" key={id} style={{ marginRight: 8 }}>
                      {genreList.find((item) => item.id === id)?.name}
                    </Badge>
                  ))}
                </div>
                <p style={{ marginTop: 8 }}>{item.overview}</p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ color: "#999" }}>
                    vote: {item.vote_average.toFixed(1)}
                  </span>
                  <span style={{ color: "#999" }}>
                    popularity: {item.popularity.toFixed(1)}
                  </span>
                </div>
                <p style={{ color: "red", fontWeight: 700, marginTop: 5 }}>
                  {item.adult === false ? "Under 18" : ""}
                </p>
              </div>
            </div>
          ))
        : sort
        ? sort.map((item) => (
            <div
              key={item.id}
              className="movies-banner"
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
              }}
              onClick={() => {
                navigate(`/movies/${item.id}`);
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
                  alt=""
                  width={70}
                  height={100}
                  style={{
                    marginRight: 10,
                    marginBottom: 10,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <h3>{item.title}</h3>
              </div>
              <div>
                <div>
                  {item.genre_ids.map((id) => (
                    <Badge bg="danger" key={id} style={{ marginRight: 8 }}>
                      {genreList.find((item) => item.id === id)?.name}
                    </Badge>
                  ))}
                </div>
                <p style={{ marginTop: 8 }}>{item.overview}</p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ color: "#999" }}>
                    vote: {item.vote_average.toFixed(1)}
                  </span>
                  <span style={{ color: "#999" }}>
                    popularity: {item.popularity.toFixed(1)}
                  </span>
                </div>
                <p style={{ color: "red", fontWeight: 700, marginTop: 5 }}>
                  {item.adult === false ? "Under 18" : ""}
                </p>
              </div>
            </div>
          ))
        : searchMovies.results?.map((item) => (
            <div
              key={item.id}
              className="movies-banner"
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
              }}
              onClick={() => {
                navigate(`/movies/${item.id}`);
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
                  alt=""
                  width={70}
                  height={100}
                  style={{
                    marginRight: 10,
                    marginBottom: 10,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <h3>{item.title}</h3>
              </div>
              <div>
                <div>
                  {item.genre_ids.map((id) => (
                    <Badge bg="danger" key={id} style={{ marginRight: 8 }}>
                      {genreList.find((item) => item.id === id)?.name}
                    </Badge>
                  ))}
                </div>
                <p style={{ marginTop: 8 }}>{item.overview}</p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ color: "#999" }}>
                    vote: {item.vote_average.toFixed(1)}
                  </span>
                  <span style={{ color: "#999" }}>
                    popularity: {item.popularity.toFixed(1)}
                  </span>
                </div>
                <p style={{ color: "red", fontWeight: 700, marginTop: 5 }}>
                  {item.adult === false ? "Under 18" : ""}
                </p>
              </div>
            </div>
          ))}
    </>
  );
};

export default MovieList;
