import { useState } from "react";
import { UserText_t } from "../../utils/gamepieces/types";
import { getCurrentUser } from "../../utils/gamepieces/userInfo";
import { TextInput } from "@/app/ui/Inputs";
import { getUserCount } from "../../utils/gamepieces/globalUserInfo";
import { GameWindow } from "./GameController";
import { Player } from "@/app/gen/game_state_pb";



export default function Psych() {
    const numUsers = 1; // Placeholder for the number of users, replace with actual logic
    return (
        <GameWindow totalUsers={numUsers} />
    );
}
    )
}