import React from 'react';
import {data} from "./Data/Data";

const Recipes = () => {
    return (
        <div>
            <div className="container">
                <h1>Вкусные рецепты</h1>

                {
                    data.map((el,idx) => (
                        <div key={idx}>
                            <h3>{el.name}</h3>
                            <ul>
                                {
                                    el.ingredients.map(ingredients => (
                                        <li key={ingredients.name}>{ingredients.name}</li>
                                    ))
                                }
                            </ul>
                            <ol>
                                {
                                    el.steps.map(step => (
                                        <li key={step}>{step}</li>
                                    ))
                                }
                            </ol>
                            <hr/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Recipes;