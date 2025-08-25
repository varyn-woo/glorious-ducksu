import { ServerElement } from "./UiElement";
import { usePlayerState } from "./GameController";

export function Interface() {
    const ps = usePlayerState();
    if (!ps || !ps.me) {
        return <div>
            <p>Something went wrong - you are not in the players list</p>
        </div>
    }
    if (ps.me.isWaiting) {
        return <p>Awaiting responses from other players...</p>
    }

    return <div style={{ flexDirection: "column", alignItems: "center", gap: "2em" }}>
        {ps.gameState?.uiElements.map((el, index) => <ServerElement key={index} se={el} />)}
    </div>
}
