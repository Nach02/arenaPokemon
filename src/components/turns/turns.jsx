import React from "react";
import { useSelector} from "react-redux";
import './turns.css'

function Turns(){
    var turn=useSelector((state)=>state)
    return(
        <div id="turnos">            
            {turn.player1.attacks?(<h4>Its your turn to attack!</h4>):(<></>)}
        </div>
    
    )
}

export default Turns