

export function CenteredWindow(props: { children: React.ReactNode }) {
    return <div style={{ flexDirection: "column", alignItems: "center", gap: "2em" }}>
        {props.children}
    </div>
}