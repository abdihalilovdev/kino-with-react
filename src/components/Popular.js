import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {APIKEY} from "../ApiKey";
import MovieCard from "./Page/MovieCard";
import {LanguageContext} from "../context";
import Loader from "../Loader/Loader";

const Popular = () => {
    const [popular, setPopular] = useState([])
    const [loader, setLoader] = useState(false)
    const [page, setPage] = useState(1)
    const {language} = useContext(LanguageContext)
    const getPopular = async () => {
        try {
            setLoader(true)
            const res = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=${language}&page=${page}`)
            const {data} = await res
            setPopular(data.results)
            setTimeout(() => {
                setLoader(false)
            },1000)
        } catch (e) {
            console.log(e)
        }
    }
    const arrayPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    useEffect(() => {
        getPopular()
    }, [language, page])

    return (
        <div id='movies'>
            {
                loader ? <Loader/>
                    : <div className="container">
                        <div className="movies">
                            {
                                popular.map(el => (
                                    <MovieCard key={el.id} el={el}/>
                                ))
                            }
                        </div>
                        <div className='pages-btn'>
                            {
                                arrayPages.map(el => (
                                    <button
                                        style={{
                                            background: el === page ? 'red' : ''
                                        }}
                                        onClick={() => setPage(el)}>{el}</button>
                                ))
                            }
                        </div>
                    </div>
            }
        </div>
    );
};

export default Popular;