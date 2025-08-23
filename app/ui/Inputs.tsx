import { toBinary, create } from "@bufbuild/protobuf";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { UserInputRequestSchema } from "~/gen/api_pb";
import { useWebSocket } from "~/utils/Websocket";

export function TextInput(props: {
    onChange?: (value: string) => void | undefined,
    onSubmit: (value: string) => void,
    placeholder?: string
}) {

    return (
        <div className="flex items-center">
            <input
                id="textInput"
                type="text"
                onChange={(e) => props.onChange ? props.onChange(e.target.value) : null}
                placeholder={props.placeholder || "Type here..."}
                className="border rounded p-2"
            />
            <button
                onClick={() => props.onSubmit((document.querySelector('input[id="textInput"]') as HTMLInputElement).value)}
                className="ml-2 bg-blue-500 text-white rounded p-2"
            >
                Submit
            </button>
        </div>
    );

}


export function GameButton(props: { game: string }) {
    const navigate = useNavigate();
    const webSocket = useWebSocket();
    const triggerNewGame = useCallback(() => {
        if (!webSocket) {
            console.error("WebSocket is not connected");
            return;
        }
        const req = create(UserInputRequestSchema, {
            request: {
                value: "game",
                case: 'newGameRequest'
            }
        });
        webSocket.send(toBinary(UserInputRequestSchema, req));
    }, [webSocket]);


    const handleClick = () => {
        triggerNewGame();
        navigate("/play/" + props.game);
        console.log("Navigating to game:", props.game);
    };

    return (
        <button onClick={handleClick}>{props.game}</button>
    );
};