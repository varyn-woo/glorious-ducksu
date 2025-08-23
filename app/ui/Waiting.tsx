import { useEffect } from "react";

export interface WaitingProps_t {
    tick: number; // milliseconds
    doneWaiting: () => Promise<boolean>;
    moveOn: () => void;
}

export function Waiting(props: WaitingProps_t) {
    useEffect(() => {
        // Set up the interval
        const intervalId = setInterval(async () => {
            const done = await props.doneWaiting();
            if (done) {
                props.moveOn();
            }
        }, props.tick);

        // Clean up the interval when the component unmounts or dependencies change
        return () => clearInterval(intervalId);
    }, [props]);
    return <p>Waiting...</p>;
}