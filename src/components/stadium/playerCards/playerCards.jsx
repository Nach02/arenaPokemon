import './playerCards.css'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deselectPokemon } from '../../../Redux/Actions'
function PlayerCards(props){
    var dispatch=useDispatch()
    function quitar(){
        dispatch(deselectPokemon(props.name))
    }
    return ( 
        <div id={props.class}className="playerCard">
            <button className='btn3' onClick={quitar}>X</button>
            <p>{props.name}</p>            
            <img class="imagen"src={props.imagen}/>
            <p>HP {props.hp}</p>
            <p>attk:{props.attk}</p>            
            <p>def:{props.def}</p>
            {/* <ul>type:{props.type.map(t=><il>{t.type.name}  </il>)}</ul> */}
        </div>
    )
}

export default PlayerCards