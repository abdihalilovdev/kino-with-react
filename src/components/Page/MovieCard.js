import React from 'react';
import {Link} from "react-router-dom";

const MovieCard = ({el}) => {
    return (
        <div className='movies-card'>
            <Link to={`/movies/detail-page/${el.id}`}>
                <img width={230} src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${el.poster_path}`} alt="img"/>
            </Link>
            <div className='movies-card-title'>
                <h3>{el.title}</h3>
                <h5>{el.vote_average}</h5>
            </div>
        </div>
    );
};

export default MovieCard;