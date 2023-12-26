import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { Tabs, Tab, Badge, Button, Modal } from "react-bootstrap";
import YouTube from "react-youtube";
import { detailMovie, Trailer } from "../redux/reducers/movieReducer";
import styles from "./MovieDetail.module.scss";
import { FaStar } from "react-icons/fa6";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { selectedMovie, reviews, recommend, loading, genreList, trailer } =
    useSelector((state) => state.movie);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(detailMovie(id));
    dispatch(Trailer(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div id="loader">
        <ClipLoader color="#fff" loading={loading} size={150} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.imageContainer}
        style={{
          backgroundImage:
            "url(" +
            `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${selectedMovie.poster_path}` +
            ")",
        }}
      />

      <div>
        <span className={styles.title}>{selectedMovie?.title}</span>
        <div className={styles.badgeContainer}>
          {selectedMovie?.genres?.map((item) => (
            <Badge className={styles.badge} bg="danger" key={item.id}>
              {item.name}
            </Badge>
          ))}
        </div>
        <div className={styles.rateContainer}>
          <FaStar className={styles.rate} />{" "}
          <span className={styles.text}>
            {selectedMovie?.vote_average?.toFixed(1)}
          </span>
        </div>
        <p className={styles.overview}>{selectedMovie?.overview}</p>
        <p className={styles.date}>{selectedMovie?.release_date}</p>
      </div>
      <Button
        className={styles.button}
        variant="danger"
        onClick={() => setShow(true)}
      >
        Watch trailer
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        animation={false}
        centered
        size="xl"
      >
        <Modal.Body>
          {selectedMovie?.id === trailer?.id && (
            <YouTube
              className={styles.youtube}
              videoId={trailer?.results?.[0]?.key}
              opts={{
                height: "390",
                width: "640",
                playerVars: {
                  autoplay: 1,
                  rel: 0,
                  modestbranding: 1,
                },
              }}
              onEnd={(e) => {
                e.target.stopVideo(0);
              }}
            />
          )}
        </Modal.Body>
      </Modal>

      <Tabs defaultActiveKey="home" transition={false}>
        <Tab eventKey="home" title="REVIEWS">
          {reviews?.results?.length > 0 ? (
            reviews.results?.map((item) => (
              <div key={item.id} className={styles.review}>
                <h5>{item.author}</h5>
                <div>{item.content}</div>
              </div>
            ))
          ) : (
            <p className={styles.empty}>There are no reviews</p>
          )}
        </Tab>
        <Tab eventKey="profile" title="RELATED MOVIES">
          <div className={styles.recommendContainer}>
            {recommend?.results?.length > 0 ? (
              recommend.results?.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundImage:
                      "url(" +
                      `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}` +
                      ")",
                    width: "45%",
                    height: "300px",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    padding: 10,
                    borderRadius: 8,
                    marginTop: 15,
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/movies/${item.id}`)}
                >
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
                    <span className={styles.text}>
                      {item.vote_average?.toFixed(1)}
                    </span>
                  </div>
                  <p className={styles.adult}>
                    {item.adult ? "18" : "Under 18"}
                  </p>
                </div>
              ))
            ) : (
              <p className={styles.empty}>There are no related movies</p>
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MovieDetail;
