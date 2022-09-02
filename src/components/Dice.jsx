export default function Dice(props) {

    const backGroundColor = {
        backgroundColor:
            props.isHeld == true ? "#59E391" : "#fff"
    }

    return (
        <div
            className="dice"
            style={backGroundColor}
            // onClick={(event) => props.holdDice(event, props.id)}
            onClick={props.holdDice}
        >
            <p>{props.value}</p>
        </div>
    )
}