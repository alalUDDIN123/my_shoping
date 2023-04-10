import style from "../styles/reviewModal.module.css"
export function ReviewModal(props) {
    console.log("prop::", props)
    return (
        <div className={style._reviw_modal} >
            <div>
                <p>{props.content}</p>
                <button onClick={props.onClose}>Close</button>
            </div>
        </div>
    );
}