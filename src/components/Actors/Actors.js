import React, {useEffect, useState} from 'react';
import {APIKEY} from "../../ApiKey";
import axios from "axios";
import Slider from "react-slick";
import profile from '../../img/profile.webp'
import {Link} from "react-router-dom";
const Actors = ({movieId}) => {
    const [actors,setActors] = useState([])
    const getCredits = async (id,apiKey) => {
        const res = await axios(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`)
        const {data} = res
        setActors(data.cast)
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3
    };

    useEffect(()=>{
        getCredits(movieId,APIKEY)
    },[])
    return (
       <div id='actors'>
           <div className='container'>
               <Slider {...settings}>
                   {
                       actors.map(el => (
                           <Link to={`/actors/detail-page/${el.id}`}>
                               <div key={el.id} className='actors-card'>
                                   {
                                       el.profile_path ? <img src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${el.profile_path}`} alt=""/> :
                                           <img width={180} src={profile} alt=""/>
                                   }
                                   <h4>{el.name}</h4>
                               </div>
                           </Link>

                       ))
                   }
               </Slider>
           </div>
       </div>
    );
};

export default Actors;

// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US