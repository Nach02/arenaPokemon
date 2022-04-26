import React, { useEffect }from "react"
import ReactDOM from 'react-dom'
import { useDispatch,useSelector } from "react-redux"
import { selectPokemon,suma,resta } from "../../Redux/Actions.js"

import Card from "./cards/cards.jsx"
import './carrusell.css'



function Carrusell(){
    var dispatch=useDispatch()
    // var cartaIzquierda=5//actual +3
    // var cartaDerecha=-1//actual-3
    var state=useSelector((state)=> state)
    var cartaDerecha=state.actual-3;
    if(state.actual===2){
        cartaDerecha=149
    }
    if(state.actual===1){
        cartaDerecha=148
    }
    if(state.actual===0){
        cartaDerecha=147
    }
    var cartaIzquierda=state.actual+3
    if(state.actual===149){
        cartaIzquierda=2
    }
    if(state.actual===148){
        cartaIzquierda=1
    }
    if(state.actual===147){
        cartaIzquierda=0
    }
    useEffect(() => {
    }, []);
    function moveRight(){
        
        var carta=cartaDerecha;
        var [uno]=document.getElementsByClassName("card1")
        var [dos]=document.getElementsByClassName("card2")
        var [tres]=document.getElementsByClassName("card3")
        var [cuatro]=document.getElementsByClassName("card4")
        var [cinco]=document.getElementsByClassName("card5")
        var padre=document.getElementById("carrousel")
        
        padre.removeChild(cinco)
        var numero=1
        uno.setAttribute('class',`card${numero+1}`)
        dos.setAttribute("class",`card${numero+2}`)
        tres.setAttribute("class",`card${numero+3}`)
        cuatro.setAttribute("class",`card${numero+4}`)

        var nuevo=document.createElement("div")
        nuevo.id=state.pokemones[carta].name
        nuevo.setAttribute("class","card1")
        var nombre=document.createElement('p') 
        nombre.innerText= state.pokemones[carta].name
        var imagen=document.createElement('img')
        imagen.setAttribute('src',state.pokemones[carta].imagen)
        imagen.setAttribute('class',"imagen")
        var hp=document.createElement('p')
        hp.innerText=`HP: ${state.pokemones[carta].hp}`
        var attk=document.createElement('p')
        attk.innerText=`attk: ${state.pokemones[carta].attk}`
        var def=document.createElement('p')
        def.innerText=`def: ${state.pokemones[carta].def}`
        nuevo.append(nombre)
        nuevo.append(imagen)
        nuevo.append(hp)
        nuevo.append(attk)
        nuevo.append(def)
        nuevo.addEventListener('click',(e)=>dispatch(selectPokemon(e.target.id)))
        padre.appendChild(nuevo)
        dispatch(resta())

    }
    function moveLeft(){
        var carta=cartaIzquierda
        var [uno]=document.getElementsByClassName("card1")
        var [dos]=document.getElementsByClassName("card2")
        var [tres]=document.getElementsByClassName("card3")
        var [cuatro]=document.getElementsByClassName("card4")
        var [cinco]=document.getElementsByClassName("card5")
        var padre=document.getElementById("carrousel")
        
        padre.removeChild(uno)
        var numero=1
        dos.setAttribute("class",`card${numero}`)
        tres.setAttribute("class",`card${numero+1}`)
        cuatro.setAttribute("class",`card${numero+2}`)
        cinco.setAttribute("class",`card${numero+3}`)

        var nuevo=document.createElement("div")
        nuevo.id=state.pokemones[carta].name
        nuevo.setAttribute("class","card5")
        var nombre=document.createElement('p') 
        nombre.innerText= state.pokemones[carta].name
        var imagen=document.createElement('img')
        imagen.setAttribute('src',state.pokemones[carta].imagen)
        imagen.setAttribute('class',"imagen")
        var hp=document.createElement('p')
        hp.innerText=`HP: ${state.pokemones[carta].hp}`
        var attk=document.createElement('p')
        attk.innerText=`attk: ${state.pokemones[carta].attk}`
        var def=document.createElement('p')
        def.innerText=`def: ${state.pokemones[carta].def}`
        nuevo.append(nombre)
        nuevo.append(imagen)
        nuevo.append(hp)
        nuevo.append(attk)
        nuevo.append(def)
        nuevo.addEventListener('click',(e)=>dispatch(selectPokemon(e.target.id)))
        padre.appendChild(nuevo)
        dispatch(suma())
        // cartaIzquierda=cartaIzquierda+1
        // cartaDerecha=cartaDerecha+1
    }
    
    return (
        <div id="carrousel"className="carrousel">
            {/* <p className="pantalla1">pantalla</p> */}
            <button class='btnleft' onClick={ moveRight}>{"<"}</button>
            <Card class='card1' name={state.pokemones[0].name} attk={state.pokemones[0].attk} def={state.pokemones[0].def} hp={state.pokemones[0].hp} imagen={state.pokemones[0].imagen} type={state.pokemones[0].type}/>           
            <Card class='card2'name={state.pokemones[1].name} attk={state.pokemones[1].attk} def={state.pokemones[1].def} hp={state.pokemones[1].hp} imagen={state.pokemones[1].imagen} type={state.pokemones[1].type}/>           
            <Card class='card3'name={state.pokemones[2].name} attk={state.pokemones[2].attk} def={state.pokemones[2].def} hp={state.pokemones[2].hp} imagen={state.pokemones[2].imagen} type={state.pokemones[2].type}/>           
            <Card class='card4'name={state.pokemones[3].name} attk={state.pokemones[3].attk} def={state.pokemones[3].def} hp={state.pokemones[3].hp} imagen={state.pokemones[3].imagen} type={state.pokemones[3].type}/>           
            <Card class='card5'name={state.pokemones[4].name} attk={state.pokemones[4].attk} def={state.pokemones[4].def} hp={state.pokemones[4].hp} imagen={state.pokemones[4].imagen} type={state.pokemones[4].type}/>           
            <button class='btnright' onClick={moveLeft}>{">"} </button>
            {/* <p className="pantalla2">pantall</p> */}
        </div>
    )

}

export default Carrusell