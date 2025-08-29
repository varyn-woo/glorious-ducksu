
import type { UiElement, VotingOption } from "~/gen/ui_elements_pb";
import { RequestButton, TextInput } from "../ui/Inputs";
import { createUserInputRequest, useMakeWsRequest } from "~/utils/Websocket";
import { create } from "@bufbuild/protobuf";
import { TextInputSchema, VoteSchema } from "~/gen/game_state_pb";
import { usePlayerState } from "./GameController";
import type { Key } from "react";

export function ServerElement(props: { se: UiElement }) {
    const ps = usePlayerState();
    const makeWsRequest = useMakeWsRequest();
    const el = props.se.element;
    switch (el.case) {
        case "textField":
            return (<TextInput
                label={el.value.label}
                placeholder={el.value.placeholder}
                onSubmit={(name: string) => {
                    const req = createUserInputRequest(ps?.me?.id, {
                        case: "textInputRequest", value: create(TextInputSchema, {
                            text: name,
                            inputType: el.value.inputType,
                        })
                    });
                    makeWsRequest(req);
                }} />);
        case "simpleButton":
            return (<RequestButton
                request={createUserInputRequest(ps?.me?.id, {
                    case: "buttonPressRequest",
                    value: el.value,
                })}
                label={el.value} />)
        case "simpleText":
            return (<p>{el.value}</p>)
        case "stringList":
            return <div style={{ flexDirection: "column" }}>
                {el.value.elements.map((listItem: string, index: number) => <p key={index}>{listItem}</p>)}
            </div>
        case "votingOptions":
            return <div style={{ flexDirection: "column" }}>
                {el.value.options.map((listItem: VotingOption, index: Key) => <RequestButton
                    key={index}
                    request={
                        createUserInputRequest(ps?.me?.id, {
                            case: "voteRequest",
                            value: create(VoteSchema, {
                                targetId: listItem.id,
                                rank: 1,
                            })
                        })
                    }
                    label={listItem.option}
                />
                )
                }
            </div>
        case "countdownTimer":
            const timeDiff = (Date.now() / 1000) - Number(ps?.gameState?.timerStart?.seconds ?? 0)
            return (
                <p>{timeDiff} seconds remaining...</p>
            )
        default:
            return <p>Unknown UI element</p>
    }
}