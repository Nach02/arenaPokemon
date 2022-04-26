import React from "react"
import { useDispatch, useSelector } from "react-redux"
import PlayerCards from "../playerCards/playerCards"
import { changeStatus } from "../../../Redux/Actions"
import './seleccion.css'
function Seleccion(){
    var selected=useSelector((state)=>state.player1Pokemons)
    var dispatch=useDispatch()

    function action(){
        dispatch(changeStatus("pelea"))
    }
    if(selected.length>0){
        return(
            <div className="seleccion">
                <p className="titulo">tu seleccion</p>
                <div className="listado">
                {selected.map(s =>
                    <PlayerCards class='playercard' name={s.name} attk={s.attk} def={s.def} hp={s.hp} imagen={s.imagen} type={s.type}/>           
                    )}
                </div> 
                {selected.length>2?(<button className="btn2" onClick={action}> GO to Action!</button>):(<></>)} 
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}
export default Seleccion