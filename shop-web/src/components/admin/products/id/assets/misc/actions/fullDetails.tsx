import ReactDOM from "react-dom";



export default function FullDetails() {

    return (
        <>
            {ReactDOM.createPortal(
            <div>

            </div>,document.body)}
        </>
    )
}