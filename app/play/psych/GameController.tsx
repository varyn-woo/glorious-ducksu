"use client"

import { TextInput } from "@/app/ui/Inputs";
import { UserText_t, Player_t } from "@/app/utils/types";
import { useState } from "react";

// represents the various stages of a game


export interface GameWindowProps_t {
    players: Player_t[];
}

export function GameWindow(props: GameWindowProps_t) {

    const [gameState, setGameState] = useState<PsychGlobalState_t>({
        gameState: PsychGameState_t.question,
        questions: [],
        answers: [],
        players: props.players,
    });

    const handleQuestionSubmit = (user: string, question: string) => {
        questions.push({ user, text: question });
        setGameState(PsychGameState_t.answer);
    }

    const handleAnswerSubmit = (user: string, answer: string) => {
        answers.push({ user, text: answer });
        if (answers.length >= totalUsers) {
            setGameState(PsychGameState_t.voting);
        }
    };

    switch (gameState) {
        case PsychGameState_t.question:
            return (
                <div className="flex flex-col max-w-screen items-center p-24">
                    <p>Enter a question here:</p>
                    <TextInput onChange={(_) => { }} onSubmit={handleQuestionSubmit} />
                </div>
            );
        case PsychGameState_t.answer:
            return (
                <div className="flex flex-col max-w-screen items-center p-24">
                    <p>Enter your answer here:</p>
                    <TextInput onSubmit={handleAnswerSubmit} />
                </div>
            );
        case PsychGameState_t.voting:
            return (
                <div className="flex flex-col max-w-screen items-center p-24">
                    <p>Vote for the best answer!</p>
                    {/* Voting logic goes here */}
                </div>
            );
        case PsychGameState_t.results:
            return (
                <div className="flex flex-col max-w-screen items-center p-24">
                    <p>Results will be displayed here.</p>
                    {/* Results display logic goes here */}
                </div>
            );
        case PsychGameState_t.waiting:
            return (
                <div className="flex flex-col max-w-screen items-center p-24">
                    <p>Waiting for other players...</p>
                </div>
            );
        default:
            return (
                <div className="flex flex-col max-w-screen items-center p-24">
                    <p>Unknown game state.</p>
                </div>
            );
    }
}