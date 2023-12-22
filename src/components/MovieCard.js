import React from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";

const MovieCard = (item) => {
  const navigate = useNavigate();
  const { genreList } = useSelector((state) => state.movie);
  return (
    <div
      className="card"
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
      <div className="overlay">
        <h5>{item.title}</h5>
        <div style={{ margin: "8px 0" }}>
          {item.genre_ids.map((id) => (
            <Badge bg="danger" key={id} style={{ marginRight: 8 }}>
              {genreList.find((item) => item.id === id)?.name}
            </Badge>
          ))}
        </div>
        <div>
          <span>{item.vote_average}</span>
          <p>{item.adult ? "18" : "Under 18"}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
