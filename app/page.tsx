"use client";
import { useRouter } from 'next/navigation'

export function GameButton({ game }: { game: string }) {
  const router = useRouter();
  const handleClick = () => {
    selectGame(game);
    router.push("/play/");
  };

  return (
    <button onClick={handleClick}>{game}</button>
  );
};

async function selectGame(game: string) {
  try {
    const response = await fetch("http://localhost:8080/game_set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "{\"game\": \"" + game + "\"}",
    });
  } catch (error) {
    console.error("Error setting game: ", error);
  }
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