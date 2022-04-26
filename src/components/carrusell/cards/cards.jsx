import './cards.css'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { selectPokemon } from '../../../Redux/Actions'
function Card(props){
    var dispatch=useDispatch()
    var eleccion=useSelector((state)=>state.player1Pokemons)
    function select(e){
        dispatch(selectPokemon(e.target.id))
    }
    return ( 
        <div id={props.name}className={props.class}onClick={(e)=>select(e)} >
            <p>{props.name}</p>
            
            <img class="imagen"src={props.imagen}/>
            <p>HP {props.hp}</p>
            <p>attk:{props.attk}</p>            
            <p>def:{props.def}</p>
            {/* <ul>type:{props.type.map(t=><il>{t.type.name}  </il>)}</ul> */}
        </div>
    )
}

export default Card