
import { create, fromBinary } from "@bufbuild/protobuf";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ServerResponseSchema } from "~/gen/api_pb";
import { GameStage, GameStateSchema, type GameState } from "~/gen/game_state_pb";
import { useWebSocket } from "~/utils/Websocket";
import { StartScreen } from "./StartScreen";

const GameContext = createContext<GameState | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const ws = useWebSocket();

  // Set up ping to keep the connection alive
  useEffect(() => {
    if (!ws) return;
    const pings = setInterval(() => {
      console.log("Sending ping to server");
      if (ws.readyState === WebSocket.OPEN) {
        ws.send('ping');
      }
    }, 3000); // Ping every 3 seconds
    return () => clearInterval(pings);
  }, [ws]);

  if (!ws) {
    return <div>Connecting to WebSocket...</div>;
  }

  ws.onmessage = (event: any) => {
    console.log("Received message:", event.data);
    if (event.type === "pong") {
      console.log("Received pong");
      return;
    }
    if (event.data instanceof Blob) {
      event.data.bytes().then(handleMessage);
      return;
    }
    console.error("Unknown message format:", event.data);
  };

  function handleMessage(data: Uint8Array) {
    const resp = fromBinary(ServerResponseSchema, data);
    if (resp.response.case !== "gameState") {
      console.error("Unexpected message type:", resp.response.case);
      return;
    }
    setGameState(create(GameStateSchema, resp.response.value));
    console.log("Updated game state:", gameState);
  }
  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  );
}

export const useGameState = () => useContext(GameContext);

export function GameWindow() {
  const gameState = useGameState();
  if (!gameState) {
    return <div>Loading game state...</div>;
  }
  switch (gameState.currentStage) {
    case GameStage.AWAITING_PLAYERS:
      return <StartScreen />;
    default:
      return <div>Game in progress: {GameStage[gameState.currentStage]}</div>;
  }
}