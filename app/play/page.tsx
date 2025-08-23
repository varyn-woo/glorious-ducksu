import { useState, useEffect } from 'react'

async function getGame() {
    try {
        const response = await fetch("http://localhost:8080/game_get");
        if (!response.ok) {
            console.error("Error getting game: ", response.status);
            return "Error getting game: " + response.status;
        }
        const gameData = await response.json();
        console.log(gameData);
        return gameData.Name;
    } catch (error) {
        console.error("Error getting game: ", error);
        return "Error getting game: " + error;
    }
}


export default function Play() {
    const [game, setCurrentGame] = useState("");
    useEffect(() => {
        getGame().then((gameName) => {
            setCurrentGame(gameName);
        });
    }, [])
    return (
        <p>We are playing {game}</p>
    );
}