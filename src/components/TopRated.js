import React, {useContext, useEffect, useState} from 'react';
import {APIKEY} from "../ApiKey";
import axios from "axios";
import MovieCard from "./Page/MovieCard";
import {LanguageContext} from "../context";

const TopRated = () => {
    const [topRated, setTopRated] = useState([])
    const {language} = useContext(LanguageContext)
    const getTopRated = async () => {
        try {
            const url = await axios(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=${language}&page=1`)
            const {data} = await url
            setTopRated(data.results)
        } catch (e) {
            console.log("error.." , e)

        }
    }
    useEffect(()=>{
        getTopRated()
    },[language])
    console.log(topRated)
    return (
        <div id='movies'>
            <div className="container">
                <div className="movies">
                    {
                        topRated.map(el => <MovieCard el={el}/>)
                    }
                </div>
            </div>
        </div>
    );
};

export default TopRated;

// https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1