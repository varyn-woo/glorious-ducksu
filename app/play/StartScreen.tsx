import { create } from "@bufbuild/protobuf";
import { useRef, useState } from "react";
import { StartGameRequestSchema, UserInputRequestSchema } from "~/gen/api_pb";
import type { Player } from "~/gen/game_state_pb";
import { RequestButton } from "~/ui/Inputs";
import { makeRequest } from "~/utils/Websocket";

export function StartScreen() {
    const [hasSelectedPlayer, setHasSelectedPlayer] = useState(false);
    const currentPlayer = useRef<Player | null>(null)
    if (!hasSelectedPlayer) {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
                <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>Glorious Ducksu Game Server</h1>
                <p>Please select a player to continue</p>
            </div>
        );
    }

    if (hasSelectedPlayer) {
        return (
            <>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
                    <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>Glorious Ducksu Game Server</h1>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 24 }}>
                    <p>Pick a game</p>
                    <div style={{ display: "flex", gap: 16 }}>
                        <RequestButton
                            request={makeRequest({ case: "newGameRequest", value: "Psych" })}
                            label="New Game"
                        />
                        <RequestButton
                            request={makeRequest({
                                case: "startGameRequest", value: create(StartGameRequestSchema, {
                                    hostPlayerId: currentPlayer.current?.id || "",
                                    gameId: "Psych"
                                })
                            })}
                            label="Start Game"
                        />
                    </div>
                </div>
            </>
        );
    }
}