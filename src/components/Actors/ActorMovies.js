import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {APIKEY} from "../../ApiKey";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import {LanguageContext} from "../../context";

const ActorMovies = ({actorId}) => {
    const [movies,setMovies] = useState([])
    const {language} = useContext(LanguageContext)
    const getActorMovies = async (id,key) => {
        const response = await axios(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${key}&language=${language}`)
        setMovies(response.data.cast)
    }
    useEffect(()=> {
        getActorMovies(actorId,APIKEY)
    },[language])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3
    };
    return (
        <Slider {...settings}>
            {
                movies.filter(el => el.poster_path).map(el => (
                    <div key={el.id}>
                        <Link to={`/movies/detail-page/${el.id}`}>
                            <img width={230} src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${el.poster_path}`} alt=""/>
                        </Link>
                        <h3>{el.title}</h3>
                    </div>
                ))
            }
        </Slider>
    );
};

export default ActorMovies;