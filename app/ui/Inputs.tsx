import { toBinary, create } from "@bufbuild/protobuf";
import { useCallback, useRef } from "react";
import { UserInputRequestSchema, type UserInputRequest } from "~/gen/api_pb";
import { useMakeWsRequest, useWebSocket } from "~/utils/Websocket";

export function TextInput(props: {
  label: string
  placeholder?: string
  invalidMessage?: string | null
  onChange?: (value: string) => void | undefined,
  onSubmit: (value: string) => void,
}) {

  const currentInput = useRef<string>("");
  const onChangeUpdate = useCallback((text: string) => {
    props.onChange ? props.onChange(text) : null;
    currentInput.current = text;
  }, [props.onChange])

  return (
    <div style={{ flexDirection: "column", alignItems: "center", gap: "2em" }}>
      <p>{props.label}</p>
      <input
        id="textInput"
        type="text"
        onChange={(e) => onChangeUpdate(e.target.value)}
        placeholder={props.placeholder || "Type here..."}
      />
      <p style={{ color: "#aa0000", height: "2em" }}>{props.invalidMessage}</p>
      <button
        onClick={() => props.onSubmit(currentInput.current)}
        disabled={props.invalidMessage !== null || currentInput.current === ""}
      >
        Submit
      </button>
    </div>
  );

}



export function RequestButton(props: { request: UserInputRequest, label: string }) {

  const makeWsRequest = useMakeWsRequest();

  const handleClick = () => {
    makeWsRequest(props.request);
  };

  return (
    <button onClick={handleClick}>{props.label}</button>
  );
};