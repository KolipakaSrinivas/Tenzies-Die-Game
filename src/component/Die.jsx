export default function Die(props) {

    const style = {
        backgroundColor: props.isHeld === true ? '#59E391' : ''
    }

    return (
        <div className="die-face" style={style} onClick={props.holdDice}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}
