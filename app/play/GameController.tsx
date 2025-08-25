
import { create, fromBinary } from "@bufbuild/protobuf";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ServerResponseSchema } from "~/gen/api_pb";
import { GameStateSchema, PlayerSchema, type GameState, type Player } from "~/gen/game_state_pb";
import { useWebSocket } from "~/utils/Websocket";
import { StartScreen } from "./StartScreen";
import { Interface } from "./Interface";

export interface PlayerState {
  gameState: GameState | null,
  me: Player | undefined,
}

const GameContext = createContext<PlayerState | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const ws = useWebSocket();
  const playerId = crypto.randomUUID()
  const me = useMemo(() => gameState?.players.find((p: Player) => p.id === playerId) ?? create(PlayerSchema, {
    id: playerId,
  }), [gameState])
  const playerState = useMemo(() => { return { gameState, me } }, [gameState, me])

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
    <GameContext.Provider value={playerState}>
      {children}
    </GameContext.Provider>
  );
}

export const usePlayerState = () => useContext(GameContext)

export function GameWindow() {
  const ps = usePlayerState();
  if (!ps || !ps.gameState) {
    return <div>Loading game state...</div>;
  }

  if (!ps.gameState.started) {
    return <StartScreen />
  }
  return <Interface />
}