async function getGame() {
    try {
        const response = await fetch("localhost:8080/game_get", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            console.error("Error getting game: ", response.status);
            return "Error getting game: " + response.status;
        }
        const data = response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error getting game: ", error);
        return "Error getting game: " + error;
    }
}


export default async function Play() {
    var game = await getGame();
    return (
        <p>We are playing {game}</p>
    );
}