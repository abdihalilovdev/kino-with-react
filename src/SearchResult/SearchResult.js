import React, {useEffect, useState} from 'react';
import axios from "axios";
import {APIKEY} from "../ApiKey";
import {useParams} from "react-router-dom";
import MovieCard from "../components/Page/MovieCard";

const SearchResult = () => {
    const [result, setResult] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [page, setPage] = useState(1)
    const {movieName} = useParams()
    const searchResult = async (key, name) => {
        const response = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${name}&language=en-US&page=${page}`)
        console.log(response)
        window.scroll(0, 0)
        setTotalPage(response.data.total_pages)
        setResult(response.data.results)
    }
    useEffect(() => {
        searchResult(APIKEY, movieName)
    }, [movieName, page])

    useEffect(()=>{
        setPage(1)
    },[movieName])

    return (
        <div id='movies'>
            <div className="container">
                <div className="movies">
                    {
                        result.map(el => <MovieCard key={el.id} el={el}/>)
                    }
                </div>
                <div className='buttons'>
                    <button style={{
                        visibility: page === 1 ? 'hidden' : 'visible'
                    }} onClick={() => setPage(page - 1)}>Prev
                    </button>
                    <h3>{page} / {totalPage}</h3>
                    <button style={{
                        visibility: page === totalPage ? 'hidden' : 'visible'
                    }} onClick={() => setPage(page + 1)}>Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;