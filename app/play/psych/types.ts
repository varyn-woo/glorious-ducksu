import { UserText_t, Player_t } from "@/app/utils/types";

export enum PsychGameState_t {
    question,
    answer,
    voting,
    results,
    waiting
}

export interface PsychGlobalState_t {
    gameState: PsychGameState_t;
    psychState: PsychState_t;
    players: Player_t[];
}

export interface PsychState_t {
    questions: UserText_t[];
    answers: UserText_t[];
}