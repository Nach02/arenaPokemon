import React, {useEffect}from "react";
import { useSelector, useDispatch } from "react-redux";
import Pokemon from "../pokemon/pokemon";
import Events from "../events/events";
import { getPokemons } from "../../Redux/Actions";
import Spinner from "../Spinner";
import './stadium.css'
import Turns from "../turns/turns";
import Carrusell from "../carrusell/carrusell";
import Seleccion from "./seleccion/seleccion";
import estadio1 from '../../img/estadio1.jpg'

var random=Math.floor(((Math.random())*150)%150)

function Stadium(){
    var dispatch= useDispatch()
    var state=useSelector((state)=>state)
    console.log('prueba de cookies')
    var cookies=document.cookie

    window.document.addEventListener('myCustomEvent', handleEvent,false)
    var event = new CustomEvent('myCustomEvent', { detail: 'mensaje de poke' })
    function handleEvent(e) {
        window.parent.document.dispatchEvent(event)
    console.log(e.detail) // outputs: {foo: 'bar'}
    }
    // window.addEventListener("prueba", (event) => {
    //     // Do we trust the sender of this message?  (might be
    //     // different from what we originally opened, for example).
    //     console.log('poken esta recibiendo un mensaje')
    //     console.log(event)
    //     event.source.dispatchEvent(new CustomEvent("prueba", {
    //         bubbles: true,
    //         detail: {
    //           secret: "Manz",
    //           cookie: cookies
    //         }
    //       }));
    //     // event.source.postMessage("hi there yourself!  the secret response " +
    //     //                    `${cookies}`,
    //     //                    event.origin);
    //     // if (event.origin !== "http://example.com")
    //     //   return;
      
    //     // event.source is popup
    //     // event.data is "hi there yourself!  the secret response is: rheeeeet!"
    //   }, false);
    console.log(cookies)
    useEffect(() => {
        dispatch(getPokemons())
    }, []);

    if(state.status===""){
        return(
            <div>
                <h1 style={{textAlign:"center"}}>Walcome to Arena Pokemon!</h1>
                <p style={{textAlign:"center"}}>Here you can test your skills as a Pokemon trainer</p>
                
                {state.pokemones.length>149?
                (<div><p style={{position: "relative",
                    top: 25+"rem",
                    left: 14+"rem",
                    width: 338+"px"}}>Choose any <b>three</b> pokemons for your combat!</p>
                <div className="pantalla">                
                    <Carrusell/>
                </div>
                </div>)
                :
                (<Spinner/>)}
                <Seleccion/>
            </div>
        )
    }else{
        return (
            <div  className="batallaPokemon">  
            <img></img>    
                <div>
                    <h2 style={{textAlign: "center"}}>Batalla pokemon</h2>
                    <Turns/>
                    {state.pokemones.length>149?
                    (<div className="escenario">                    
                        <Pokemon nombre={state.player1Pokemons[0].name} player='player1'/>
                        <Events/>
                        <Pokemon nombre={state.player2Pokemons[0].name} player='player2'/>
                    </div>)
                    :
                    (<Spinner/>)                
                    }
                </div>
            </div>
        );
     }
}
export default Stadium