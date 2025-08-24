import { create } from "@bufbuild/protobuf";
import { type ReactNode, useRef, useEffect, useContext, createContext } from "react";
import { UserInputRequestSchema, type UserInputRequest } from "~/gen/api_pb";

const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const socketRef = useRef<WebSocket | null>(new WebSocket('ws://localhost:8080/'));

    useEffect(() => {
        // Open the connection when the component mounts
        const socket = new WebSocket('ws://localhost:8080/');

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

export function makeRequest(request: UserInputRequest["request"]
) {
    return create(UserInputRequestSchema, {
        request
    });
}