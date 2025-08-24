import type { Route } from "./+types/home";
import { WebSocketProvider } from "~/utils/Websocket";
import { GameProvider, GameWindow } from "~/play/GameController";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Board games!" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (<main>
    <WebSocketProvider>
      <GameProvider>
        <GameWindow />
      </GameProvider>
    </WebSocketProvider>
  </main>);
}
