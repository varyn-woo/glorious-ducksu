"use client";
import { useRouter } from 'next/navigation'
import { fetchWithType, getDefaultFetchReq } from './utils/restApi';
import { request } from 'http';
import { Error, GameState_t } from './utils/types';

export function GameButton(props: { game: string }) {
  const router = useRouter();
  const handleClick = () => {
    selectGame(props.game);
    router.push("/play/" + props.game);
    console.log("Navigating to game:", props.game);
  };

  return (
    <button onClick={handleClick}>{props.game}</button>
  );
};

async function selectGame(game: string): Promise<GameState_t | Error> {
  const response = await fetchWithType<GameState_t>({
    endpoint: "http://localhost:8080/game_set",
    request: getDefaultFetchReq("POST", game)
  });
  if (response.error || !response.blob) {
    console.log(response.status, response.error)
    return {
      status: response.status,
      message: response.error ?? "An unknown error occurred"
    };
  }
  return response.blob
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col items-center 5">
        <h1 className="text-6xl font-bold">Glorious Ducksu Game Server</h1>
      </div>
      <div className="flex flex-col items-center 5 p-24">
        <p>Pick a game</p>
        <div className="flex-auto">
          <GameButton game="Psych" />
          <GameButton game="Mao" />
        </div>
      </div>
    </main>
  );
}