import { create, toBinary } from "@bufbuild/protobuf";
import { useCallback, useRef, useState } from "react";
import { PlayerAddRequestSchema, StartGameRequestSchema, UserInputRequestSchema, type UserInputRequest } from "~/gen/api_pb";
import { type Player, PlayerSchema } from "~/gen/game_state_pb";
import { RequestButton, TextInput } from "~/ui/Inputs";
import { createUserInputRequest, useMakeWsRequest, useWebSocket } from "~/utils/Websocket";
import { useGameState } from "./GameController";

export function StartScreen() {
  const [hasSelectedPlayer, setHasSelectedPlayer] = useState(false);
  const currentPlayer = useRef<Player | null>(null)
  const [invalidMessage, setInvalidMessage] = useState<string | null>(null);
  const gameState = useGameState();
  const makeWsRequest = useMakeWsRequest();

  if (!hasSelectedPlayer) {
    return (
      <div style={{ flexDirection: "column", alignItems: "center", gap: "2em" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>Glorious Ducksu Game Server</h1>
        <TextInput
          label="Enter your name:"
          placeholder="your name"
          invalidMessage={invalidMessage}
          onChange={(name: string) => {
            console.log("got a new change in text field: ", name)
            const isValid = validateNameChoice(name, gameState?.players);
            if (!isValid) {
              setInvalidMessage("Name is already taken")
            } else {
              setInvalidMessage(null);
            }
          }}
          onSubmit={(name: string) => {
            currentPlayer.current = create(PlayerSchema, { displayName: name, id: crypto.randomUUID() });
            const req = createUserInputRequest({
              case: "playerAddRequest", value: create(PlayerAddRequestSchema, {
                playerId: currentPlayer.current.id,
                displayName: currentPlayer.current.displayName
              })
            });
            makeWsRequest(req);
            setHasSelectedPlayer(true);
          }} />
      </div>
    );
  }

  if (hasSelectedPlayer) {
    return (
      <>
        <div style={{ flexDirection: "column", alignItems: "center", gap: "2em" }}>
          <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>Glorious Ducksu Game Server</h1>
          <p>Current players:</p>
          {gameState?.players.map((player) => (
            <p>
              {player.displayName} {player.id === currentPlayer.current?.id ? "(You)" : ""}
            </p>
          ))}
          <p>Waiting for host to start the game...</p>
          {currentPlayer.current?.id === gameState?.hostPlayerId &&
            <div >
              <RequestButton
                request={createUserInputRequest({
                  case: "startGameRequest", value: create(StartGameRequestSchema, {
                    hostPlayerId: currentPlayer.current?.id || "",
                    gameId: "Psych"
                  })
                })}
                label="Start Game"
              />
            </div>
          }
        </div>
      </>
    );
  }
}

function validateNameChoice(name: string, players?: Player[] | undefined): boolean {
  return players ? players?.find((player) => player.displayName.toLowerCase() === name.toLowerCase()) === undefined : true;
}