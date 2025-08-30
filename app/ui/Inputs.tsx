import { toBinary, create } from "@bufbuild/protobuf";
import { useCallback, useRef } from "react";
import { UserInputRequestSchema, type UserInputRequest } from "~/gen/api_pb";
import { useMakeWsRequest, useWebSocket } from "~/utils/Websocket";

export function TextInput(props: {
  label: string
  placeholder?: string
  invalidMessage?: string | undefined
  onChange?: (value: string) => void | undefined,
  onSubmit: (value: string) => void,
}) {

  const currentInput = useRef<HTMLInputElement | null>(null);
  const onChangeUpdate = useCallback((text: string) => {
    if (props.onChange) {
      props.onChange(text)
    }
  }, [props.onChange])

  const onSubmitClear = useCallback(() => {
    props.onSubmit(currentInput.current?.value ?? "");
    if (currentInput.current) {
      currentInput.current.value = "";
    }
  }, [props.onSubmit])

  return (
    <div style={{ flexDirection: "column", alignItems: "center", gap: "2em" }}>
      <p>{props.label}</p>
      <input
        id="textInput"
        type="text"
        ref={currentInput}
        onChange={(e) => onChangeUpdate(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmitClear();
          }
        }}
        placeholder={props.placeholder || "Type here..."}
      />
      <p style={{ color: "#aa0000", height: "2em" }}>{props.invalidMessage}</p>
      <button
        onClick={onSubmitClear}
        disabled={props.invalidMessage !== undefined || currentInput.current?.value === ""}
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