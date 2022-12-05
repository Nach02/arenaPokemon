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
import { getCookies, setCookie } from "./cookies";

var random=Math.floor(((Math.random())*150)%150)

function Stadium(){
    var dispatch= useDispatch()
    var state=useSelector((state)=>state)
    if (typeof window !== 'undefined') {
        // las cookies tiene que ser Secure: true; SameSite:'None'
        setCookie('token', 'es un token')
        setCookie('cartToken','es un cartToken')
    
        window.onmessage = function (e) {
          if (e.origin === 'http://localhost:3000') {
            // TODO cambiar por URL permitidas
            const data = JSON.parse(e.data);
            const cookies = document.cookie.split('; ');
            if (data.title === 'getToken') {
              const  {token}  = getCookies()
              window.top.postMessage(
                JSON.stringify({ title: 'token', info: `${token}` }),
                '*' // TODO cambiar por URL permitidas
              );
            }
            if (data.title === 'getCartToken') {
                const  {cartToken}  = getCookies();
              window.top.postMessage(
                JSON.stringify({ title: 'cartToken', info: `${cartToken}` }),
                '*' // TODO cambiar por URL permitidas
              );
            }
            if (data.title === 'setToken') {
                setCookie('token',data.info)
            }
            if (data.title === 'setCartToken') {
                setCookie('cartToken',data.info)
            }
          }
        };
        window.top.postMessage(`{"title":"conectado"}`, '*');
      }

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