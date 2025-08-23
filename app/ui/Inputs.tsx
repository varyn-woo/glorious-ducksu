"use client"

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