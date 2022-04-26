

export const GET_POKEMONS='GET_POKEMONS'
export const GET_POKE_DETAILS='GET_POKE_DETAILS'
export const ATTACK='ATTACK'
export const GET_ATTACKS='GET_ATTACKS'
export const CHANGE_TURN='CHANGE_TURN'
export const SELECT_POKEMON='SELECT_POKEMON'
export const DESELECT_POKEMON='DESELECT_POKEMON'
export const CHANGE_STATUS='CHANGE_STATUS'
export const SUMA='SUMA'
export const RESTA='RESTA'


export function changeTurn(){
    return{
        type:CHANGE_TURN
    }
}
export function suma(){
    return{
        type:SUMA,
    }
}
export function resta(){
    return{
        type:RESTA,
    }
}

export function changeStatus(status){
        return{
            type:CHANGE_STATUS,
            payload:status
        }
}

export function deselectPokemon(name){
    return{
        type:DESELECT_POKEMON,
        payload:name
    }
}

export function selectPokemon(name){
    return {
        type:SELECT_POKEMON,
        payload:name,
    }
}

export function getPokeDetail(arg,player){
    return{
        type:GET_POKE_DETAILS,
        payload:arg,
        player:player
    }
}


export function getAttacks(arg,player){
    return{
        type:GET_ATTACKS,
        payload:{
            arg:arg,
            player:player
        }
    }
}
export function attack(fo,value,type){
    return {
        type:ATTACK,
        payload:{
            fo:fo,
            value:value,
            type:type
        }
    }
}
var id=0;
export const getPokemons=function(){
    return function(dispatch){
        return fetch('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0')
        .then((descarga)=> descarga.json())
        .then(async function b(data){  
            var resultado= await Promise.all(data.results.map((p)=>fetch(p.url).then((descarga)=>descarga.json()).then(async(respuesta)=> {
                var attacks=[]
                if(respuesta.moves.length<4){
                    attacks=respuesta.moves
                }else{        
                var m1=Math.floor(((Math.random())*(respuesta.moves.length))%(respuesta.moves.length))                    
                var m2=Math.floor(((Math.random())*(respuesta.moves.length))%(respuesta.moves.length))
                while (m2===m1) { m2++}
                var m3=Math.floor(((Math.random())*(respuesta.moves.length))%(respuesta.moves.length))
                while (m3===m1|| m3===m2) { m3++}
                var m4=Math.floor(((Math.random())*(respuesta.moves.length))%(respuesta.moves.length))
                while (m4===m1|| m4===m2|| m4===m3) { m4++}
                attacks=[respuesta.moves[m1],respuesta.moves[m2],respuesta.moves[m3],respuesta.moves[m4]]
                }
                var filtrado=attacks.filter(a=>a!==undefined)
                const ataques=await Promise.all(filtrado.map((a)=>fetch(a.move.url).then((descarga)=>descarga.json()).then((respuesta)=>{
                    var objeto={
                        name:respuesta.name,
                        power:respuesta.power,
                        type:respuesta.type.name
                    }
                    return objeto
                })))
               var type=[]
               respuesta.types.map((t)=>{type.push(t.type.name)})
                var obj={
                    id:id++,
                    name:respuesta.species.name,
                    moves:ataques,
                    hp:respuesta.stats[0].base_stat,
                    attk:respuesta.stats[1].base_stat,
                    def:respuesta.stats[2].base_stat,
                    type:type,
                    imagen:respuesta.sprites.other.home.front_default,
                    inicial:respuesta.stats[0].base_stat,
                    }
                return obj} )))
            dispatch({
                type:GET_POKEMONS,
                payload:resultado
            }) 
            })
        }
        
    }


