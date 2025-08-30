import { ServerElement } from "./UiElement";
import { usePlayerState } from "./GameController";
import { CenteredWindow } from "~/ui/Containers";

export function GameInterface() {
    const ps = usePlayerState();
    if (!ps || !ps.me) {
        return <CenteredWindow>
            <p>Something went wrong - you are not in the players list</p>
        </CenteredWindow>
    }
    if (ps.me.isWaiting) {
        return <CenteredWindow>Awaiting responses from other players...</CenteredWindow>
    }

    return <CenteredWindow>
        {ps.gameState?.uiElements.map((el, index) => <ServerElement key={index} se={el} />)}
    </CenteredWindow>
}