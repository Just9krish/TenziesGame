export default function Dice(props) {

    const backGroundColor = {
        backgroundColor:
            props.isHeld == true ? "#59E391" : "#fff"
    }

    return (
        <div className="dice" style={backGroundColor} >
            <p>{props.value}</p>
        </div>
    )
}