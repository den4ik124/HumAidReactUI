import React from "react";
import { Rating } from "semantic-ui-react";

interface Props{
    currentRating: number;
}


export default function RatingElement({currentRating} : Props){
    
    function getRandomRating(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    
    return(
        <Rating disabled icon='star' defaultRating={getRandomRating(0,5)} maxRating={5} />
    )
}