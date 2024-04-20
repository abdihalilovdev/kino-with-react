import './App.scss';
import Header from "./components/Header";
import Recipes from "./components/Recipes";
import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Popular from "./components/Popular";
// import {useEffect, useState} from "react";
import TopRated from "./components/TopRated";
import DetailPage from "./components/Page/DetailPage";
import ActorDetail from "./components/Actors/ActorDetail";
import {useState} from "react";
import SearchResult from "./SearchResult/SearchResult";

const App = () => {
    const [mode, setMode] = useState(JSON.parse(localStorage.getItem('mode')) || false)
    return (
        <div style={{
            background: mode ? 'black' : '',
            color: mode ? 'white' : ''
        }}>
            <Header setMode={setMode} mode={mode}/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/recipes'} element={ <Recipes/>} />
                <Route path={'/popular'} element={ <Popular/>} />
                <Route path={'/top-rated'} element={ <TopRated/> }/>
                <Route path={'/movies/detail-page/:movieId'} element={ <DetailPage/> }/>
                <Route path={'/actors/detail-page/:actorId'} element={ <ActorDetail/> }/>
                <Route path={'/movies/search-input/:movieName'} element={ <SearchResult/> }/>
            </Routes>
        </div>
    );
};

export default App;