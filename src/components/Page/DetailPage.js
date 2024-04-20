import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIKEY } from "../../ApiKey";
import axios from "axios";
import Actors from "../Actors/Actors";
import Videos from "../Videos/Videos";
import { LanguageContext } from "../../context";
import Modal from "./Modal/Modal";

const DetailPage = () => {
  const [detail, setDetail] = useState({});
  const { language } = useContext(LanguageContext);
  const { movieId } = useParams();

  const getDetail = async (id, key) => {
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=${language}`
      );
      const { data } = await res;
      setDetail(data);
    } catch (e) {
      console.log("Error...", e);
    }
  };
  useEffect(() => {
    getDetail(movieId, APIKEY);
  }, [language]);
  const {
    poster_path,
    title,
    overview,
    release_date,
    runtime,
    backdrop_path,
    vote_average,
  } = detail;
  console.log(detail);
  return (
    <>
      <div
        id="detail"
        style={{
          background: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path}) no-repeat left/cover`,
          color: "white",
        }}
      >
        <div className="container">
          <div className="detail">
            <Modal detail={detail} />
            <div className="detail-desc">
              <h1>{title}</h1>
              <p>{overview}</p>
              <p>{release_date}</p>
              <h3>
                {Math.floor(runtime / 60)} h {runtime % 60} min
              </h3>
              <div
                style={{
                  background: `conic-gradient(yellow ${
                    Math.round(vote_average * 10) * 3.59
                  }deg, gray 0deg)`,
                }}
                className="detail-vote"
              >
                <div className="bgOne">
                  <h3>{Math.round(vote_average * 10)}%</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Actors movieId={movieId} />
      <Videos movieId={movieId} />
    </>
  );
};

export default DetailPage;
