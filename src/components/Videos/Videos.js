import React, {useEffect, useState} from 'react';
import {APIKEY} from "../../ApiKey";
import axios from "axios";
import Slider from "react-slick";

const Videos = ({movieId}) => {
    const [videos,setVideos] = useState([])
    const getVideos = async (id,key) => {
        const res = await axios(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}&language=en-US`)
        const {data} = res
        setVideos(data.results)
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3
    };
    useEffect(()=> {
        getVideos(movieId,APIKEY)
    },[])

    return (
      <div id='videos'>
          <div className='container'>
              <Slider {...settings}>
                  {
                      videos.map(el => (
                          <div key={el.id}>
                              <iframe width="280" height="215" src={`https://www.youtube.com/embed/${el.key}`}
                                      title="YouTube video player" frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                      allowFullScreen></iframe>
                          </div>
                      ))
                  }
              </Slider>
          </div>
      </div>
    );
};

export default Videos;

// https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US