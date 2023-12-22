import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { movieAction } from "../redux/actions/movieAction";
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

  const handleShow = () => {
    setShow(true);
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    dispatch(detailMovie(id));
    dispatch(Trailer(id));
  }, [dispatch, id]);

  if (loading) {
    return <ClipLoader color="#fff" loading={loading} size={150} />;
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
            {selectedMovie?.vote_average.toFixed(1)}
          </span>
        </div>
        <p className={styles.overview}>{selectedMovie?.overview}</p>
        <p className={styles.date}>{selectedMovie?.release_date}</p>
      </div>
      <Button className={styles.button} variant="danger" onClick={handleShow}>
        Watch trailer
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        animation={false}
        size="xl"
      >
        <Modal.Body>
          {selectedMovie?.id === trailer?.id && (
            <YouTube
              videoId={trailer?.results?.key}
              opts={opts}
              onEnd={(e) => {
                e.target.stopVideo(0);
              }}
            />
          )}
        </Modal.Body>
      </Modal>

      <Tabs defaultActiveKey="home" transition={false}>
        <Tab eventKey="home" title="REVIEWS">
          {reviews?.results?.map((item) => (
            <div className={styles.review}>
              <div>{item.author}</div>
              <div>{item.content}</div>
            </div>
          ))}
        </Tab>
        <Tab eventKey="profile" title="RELATED MOVIES">
          <div className={styles.recommendContainer}>
            {recommend?.results?.map((item) => (
              <div
                style={{
                  backgroundImage:
                    "url(" +
                    `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}` +
                    ")",
                  width: "40%",
                  height: "300px",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  padding: 10,
                  borderRadius: 8,
                  marginTop: 15,
                }}
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
                    {item.vote_average.toFixed(1)}
                  </span>
                </div>
                <p className={styles.adult}>{item.adult ? "18" : "Under 18"}</p>
              </div>
            ))}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MovieDetail;
