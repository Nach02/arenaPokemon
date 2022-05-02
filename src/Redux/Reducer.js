import { GET_ATTACKS,SUMA,RESTA,CHANGE_STATUS,DESELECT_POKEMON,SELECT_POKEMON,CHANGE_TURN,ATTACK,GET_POKEMONS,GET_POKE_DETAILS } from "./Actions";
import Swal from 'sweetalert';
const initialState={
  
    pokemones:[],//lista de pokemones con detalles
    player1Pokemons:[],//lista de pokemones del player 1
    player2Pokemons:[],
    actual:2,
    status:"",
    player1:{},//detalles del pokemon activo del player1
    player2:{},
    turn:"player1"
}

const RootReducer=(state=initialState,action)=>{
    switch(action.type){
        case SUMA:
            var resultado;
            if(state.actual===149){resultado=0}
            else{resultado=(state.actual%150)+1}
            
            return{
                ...state,
                actual:resultado
            }
        case RESTA:
            var resultado=0;
            if(state.actual===0){resultado=149}
            else{resultado=(state.actual%150)-1}
            return{
                ...state,
                actual:resultado
            }
        case CHANGE_STATUS:
            return{
                ...state,
                status:action.payload
            }
        case DESELECT_POKEMON:
            var filtrado=state.player1Pokemons.filter((p)=>p.name!==action.payload)
            return{
                ...state,
                player1Pokemons:filtrado
            }
        case SELECT_POKEMON:
            
            if(state.player1Pokemons.length>2){
                Swal({
                    icon: "error",
                    title: `you can select only three pokemons`,
                    button: false,
                    heightAuto: false,
                    timer: 3000,
                    })
                return {...state}
            }
            else{
                
                var [newPokemon]=state.pokemones.filter((p)=>p.name===action.payload)
                if(state.player1Pokemons.includes(newPokemon)){
                    Swal({
                        icon: "error",
                        title: `that Pokemon has been all ready selected, please select another one`,
                        button: false,
                        heightAuto: false,
                        timer: 3000,
                        })
                        return{...state}
                }
                var CPUPokemon=state.pokemones[Math.floor(((Math.random())*150)%150)]
                while (state.player2Pokemons.includes(CPUPokemon)) {
                    CPUPokemon=state.pokemones[Math.floor(((Math.random())*150)%150)]
                }
                
                var attacks;            
                if(newPokemon.moves.length<5){
                        attacks=newPokemon.moves
                    }else{        
                    var m1=Math.floor(((Math.random())*(newPokemon.moves.length))%(newPokemon.moves.length))                    
                    var m2=Math.floor(((Math.random())*(newPokemon.moves.length))%(newPokemon.moves.length))
                    while (m2===m1) { m2++}
                    var m3=Math.floor(((Math.random())*(newPokemon.moves.length))%(newPokemon.moves.length))
                    while (m3===m1|| m3===m2) { m3++}
                    var m4=Math.floor(((Math.random())*(newPokemon.moves.length))%(newPokemon.moves.length))
                    while (m4===m1|| m4===m2|| m4===m3) { m4++}
                    attacks=[newPokemon.moves[m1],newPokemon.moves[m2],newPokemon.moves[m3],newPokemon.moves[m4]]
                    }                
                newPokemon.attacks=attacks
                
                if(CPUPokemon.moves.length<5){
                    attacks=CPUPokemon.moves
                }else{        
                var m1=Math.floor(((Math.random())*(CPUPokemon.moves.length))%(CPUPokemon.moves.length))                    
                var m2=Math.floor(((Math.random())*(CPUPokemon.moves.length))%(CPUPokemon.moves.length))
                while (m2===m1) { m2++}
                var m3=Math.floor(((Math.random())*(CPUPokemon.moves.length))%(CPUPokemon.moves.length))
                while (m3===m1|| m3===m2) { m3++}
                var m4=Math.floor(((Math.random())*(CPUPokemon.moves.length))%(CPUPokemon.moves.length))
                while (m4===m1|| m4===m2|| m4===m3) { m4++}
                attacks=[CPUPokemon.moves[m1],CPUPokemon.moves[m2],CPUPokemon.moves[m3],CPUPokemon.moves[m4]]
                }
                CPUPokemon.attacks=attacks
                
                return{
                    ...state,
                    player1Pokemons:[...state.player1Pokemons,newPokemon],
                    player2Pokemons:[...state.player2Pokemons,CPUPokemon]
                } 
            }
                
        case CHANGE_TURN:
            if(state.turn==="player1"){
                return{...state,
                    turn:"player2"
                }
            }else{
                return{...state,
                    turn:"player1"
                }
            }
            
        case GET_ATTACKS:
            var player=action.payload.player
            return{
                ...state,
                [player]:{...state[player],attacks:action.payload.arg}

            }
        case ATTACK:
            var i;
            var fo=action.payload.fo
            var hp=(state[fo].hp)-action.payload.value
                if(hp<1){
                    hp=0
                }

            if(fo=="player1"){
                i=state.player1Pokemons.findIndex(p=>p.name===state[fo].name)
                state.player1Pokemons[i].hp=hp;
                
            }else{
                i=state.player2Pokemons.findIndex(p=>p.name===state[fo].name)
                state.player2Pokemons[i].hp=hp;
            }
            
            return{
                ...state,
                [fo]:{...state[fo],
                    hp:hp,
                }

            }
        case GET_POKE_DETAILS:      
            var [activar]=state.pokemones.filter(p=>p.name===action.payload)
            if(action.player=== "player1"){
                // if(state.player1.order===action.payload.order){
                //     action.payload.order=action.payload.order+1
                // }
                return {
                    ...state,
                    player1:activar
                }
            }else{
                return {
                    ...state,
                    player2:activar
                }

            }            
        case GET_POKEMONS:
            return {
                ...state,
                pokemones:action.payload
            }
        
        default:
            return state
    }

}
export default RootReducer;