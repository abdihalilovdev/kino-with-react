import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {APIKEY} from "../../ApiKey";
import {useParams} from "react-router-dom";
import actors from "./Actors";
import Slider from "react-slick";
import ActorMovies from "./ActorMovies";
import {LanguageContext} from "../../context";

const ActorDetail = () => {
    const [actor, setActor] = useState({})
    const {language} = useContext(LanguageContext)
    const [view, setView] = useState(300)
    const {actorId} = useParams()
    const getDetail = async (id, key) => {
        const res = await axios(`https://api.themoviedb.org/3/person/${id}?api_key=${key}&language=${language}`)
        setActor(res.data)
    }
    const printText = (text) => {
        if (view === 300) {
            setView(text.length)
        } else {
            setView(300)
        }
    }


    useEffect(() => {
        getDetail(actorId, APIKEY)
    }, [language])
    return (
        <div id='actor-detail'>
            <div className='container'>
                <div className="actor-detail">
                    <img width={400} src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${actor.profile_path}`}
                         alt=""/>
                    <div className="actor-detail-title">
                        <h1>{actor.name}</h1>
                        <h3>{actor.birthday}</h3>
                        <h4>Biography:</h4>
                        <p>{actor.biography && actor.biography.slice(0, view)}</p>
                        {
                            actor.biography && actor.biography.length > 300 &&
                            <span
                                onClick={() => printText(actor.biography)}
                                className='view-more'
                            >{view === 300 ? 'view more' : 'close'}</span>
                        }

                    </div>
                </div>
                <div>
                    <ActorMovies actorId={actorId}/>
                </div>
            </div>
        </div>
    );
};

export default ActorDetail;

// https://api.themoviedb.org/3/person/{person_id}?api_key=<<api_key>>&language=en-US