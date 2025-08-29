import { create, toBinary } from "@bufbuild/protobuf";
import { type ReactNode, useRef, useEffect, useContext, createContext, useCallback } from "react";
import { UserInputRequestSchema, type UserInputRequest } from "~/gen/api_pb";
import { usePlayerState } from "~/play/GameController";

const WebSocketContext = createContext<WebSocket | null>(null);
const endpoint = 'wss://localhost:8443/ws'

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const socketRef = useRef<WebSocket | null>(new WebSocket(endpoint));

    useEffect(() => {
        // Open the connection when the component mounts
        const socket = new WebSocket(endpoint);

        socket.onopen = () => console.log('WebSocket connected');
        socket.onclose = () => console.log('WebSocket disconnected');
        socketRef.current = socket;

        // The cleanup function runs when the component unmounts
        return () => {
            socket.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={socketRef.current} >
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);

export const useMakeWsRequest = () => {
    const webSocket = useContext(WebSocketContext);
    return useCallback((request: UserInputRequest) => {
        if (!webSocket) {
            console.error("WebSocket is not connected");
            return;
        }
        webSocket.send(toBinary(UserInputRequestSchema, request));
    }, [webSocket]);
}

export function createUserInputRequest(playerId: string | undefined, request: UserInputRequest["request"]
) {
    return create(UserInputRequestSchema, {
        playerId,
        request,
    });
}