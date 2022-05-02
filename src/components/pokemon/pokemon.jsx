import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokeDetail,attack, getAttacks,changeTurn,changeStatus, getDetails } from "../../Redux/Actions";
import Swal from 'sweetalert';



import './pokemon.css'
import imagen from '../../img/Buttons.svg'
import Ataque from "../ataque/ataque";


function Pokemon(props){
    
    var dispatch=useDispatch()
    var fo;
    const detalles=useSelector((state)=>state[props.player])  
    const turn=useSelector((state)=>state.turn) 
    const player1Pokemons=useSelector((state)=>state.player1Pokemons)
    const player2Pokemons=useSelector((state)=>state.player2Pokemons) 
    const status=useSelector((state)=>state.status)
    const state=useSelector((state)=>state)
    var [hpInicial]=state.pokemones.filter((p)=>p.name===detalles.name)
    var contador=1
    var contador2=1
    let attacks=[]
    if(props.player==="player1"){
        fo="player2"        
    }else{fo="player1"}

    var detallesFo=useSelector((state)=>state[fo])
        
    useEffect(() => {
        dispatch(getPokeDetail(props.nombre,props.player)) 
        if(props.player==="player1"){
            var esuchaUp=document.addEventListener('keyup',(e)=>{
                if(e.key==="Shift"){
                dispatch(changeStatus("ataques"))
                }
            })
        }        
    }, []);

    useEffect(()=>{

        if(detalles.id!== undefined){  
            var attacks=[]
            if(props.player==="player1"){
                player1Pokemons.forEach(p => {
                    if(p.name===detalles.name){
                        attacks=p.attacks;
                    }                
                });
            } else{
                player2Pokemons.forEach(p=>{
                    if(p.name===detalles.name){
                        attacks=p.attacks
                    }
                })
            }
            if(detalles.attacks===undefined){
                dispatch(getAttacks(attacks,props.player)) 
            }            
        }        
    },[state])

    function efectoAtaque(tipoPlayer,tipoAtaque){
        var result=1
        switch (tipoAtaque) {
            case "normal":
                    if(tipoPlayer.includes("rock")){result= 0.5}
                    if(tipoPlayer.includes("ghost")){result= 0}
                    return result
                
            case "fighting":      
                if(tipoPlayer.includes("normal")||tipoPlayer.includes("rock")||tipoPlayer.includes("ice")){result= 2}          
                if(tipoPlayer.includes("flying")||tipoPlayer.includes("poison")||tipoPlayer.includes("bug")||tipoPlayer.includes("psychic")){result= 0.5}                
                if(tipoPlayer.includes("ghost")){result= 0}
                return result
                
            case "flying":
                if(tipoPlayer.includes("fight")||tipoPlayer.includes("bug")||tipoPlayer.includes("grass")){result= 2}          
                if(tipoPlayer.includes("rock")||tipoPlayer.includes("electric")){result= 0.5}
                return result

            case "ground":
                if(tipoPlayer.includes("electric")||tipoPlayer.includes("fire")||tipoPlayer.includes("rock")||tipoPlayer.includes("poison")){result= 2}          
                if(tipoPlayer.includes("bug")||tipoPlayer.includes("grass")){result= 0.5}
                if(tipoPlayer.includes("flying")){result= 0}
                return result

            case "poison":
                if(tipoPlayer.includes("bug")||tipoPlayer.includes("grass")){result= 2}          
                if(tipoPlayer.includes("poison")||tipoPlayer.includes("ground")||tipoPlayer.includes("rock")||tipoPlayer.includes("ghost")){result= 0.5}
                return result

            case "rock":
                if(tipoPlayer.includes("flying")||tipoPlayer.includes("bug")||tipoPlayer.includes("fire")||tipoPlayer.includes("ice")){result= 2}          
                if(tipoPlayer.includes("fight")||tipoPlayer.includes("ground")||tipoPlayer.includes("rock")||tipoPlayer.includes("ghost")){result= 0.5}
                return result

            case "bug":
                if(tipoPlayer.includes("poison")||tipoPlayer.includes("grass")||tipoPlayer.includes("psychic")){result= 2}          
                if(tipoPlayer.includes("fight")||tipoPlayer.includes("flying")||tipoPlayer.includes("fire")){result= 0.5}
                return result

            case "ghost":
                if(tipoPlayer.includes("ghost")){result= 2}
                if(tipoPlayer.includes("normal")||tipoPlayer.includes("psychic")){result= 0}
                return result

            case "fire":
                if(tipoPlayer.includes("bug")||tipoPlayer.includes("grass")||tipoPlayer.includes("ice")){result= 2}          
                if(tipoPlayer.includes("rock")||tipoPlayer.includes("water")||tipoPlayer.includes("fire")||tipoPlayer.includes("dragon")){result= 0.5}
                return result
                
            case "water":
                if(tipoPlayer.includes("rock")||tipoPlayer.includes("ground")||tipoPlayer.includes("fire")){result= 2}          
                if(tipoPlayer.includes("water")||tipoPlayer.includes("grass")||tipoPlayer.includes("dragon")){result= 0.5}
                return result

            case "grass":
                if(tipoPlayer.includes("rock")||tipoPlayer.includes("ground")||tipoPlayer.includes("water")){result= 2}          
                if(tipoPlayer.includes("flying")||tipoPlayer.includes("poison")||tipoPlayer.includes("bug")||tipoPlayer.includes("fire")||tipoPlayer.includes("grass")||tipoPlayer.includes("dragon")){result= 0.5}
                return result

            case "electric":
                if(tipoPlayer.includes("flying")||tipoPlayer.includes("water")){result= 2}          
                if(tipoPlayer.includes("grass")||tipoPlayer.includes("electric")||tipoPlayer.includes("dragon")){result= 0.5}
                if(tipoPlayer.includes("ground")){result= 0}
                return result

            case "psychic":
                if(tipoPlayer.includes("fight")||tipoPlayer.includes("poison")){result= 2}          
                if(tipoPlayer.includes("psychic")){result= 0.5}
                return result

            case "ice":
                if(tipoPlayer.includes("flying")||tipoPlayer.includes("ground")||tipoPlayer.includes("grass")||tipoPlayer.includes("dragon")){result= 2}          
                if(tipoPlayer.includes("water")||tipoPlayer.includes("ice")){result= 0.5}
                return result

            case "dragon":
                if(tipoPlayer.includes("dragon")){result= 2}          
                return result  
        
            default:
                return 1;
        }
    }
    
    function desplegar(clas){
        var [subMenu]=document.getElementsByClassName(clas)
        if(subMenu.classList.contains('desplegado')){
            subMenu.style.height='0px'
            subMenu.classList.remove('desplegado')
        }else{
            subMenu.classList.add('desplegado')
            if(clas==="attacksContainer"){
                var [otro]=document.getElementsByClassName("pokemonsContainer")
                if(otro.classList.contains('desplegado')){
                    otro.classList.remove('desplegado')
                    otro.style.height='0px'
                }                
            }else{
                var [otro]=document.getElementsByClassName("attacksContainer")
                if(otro.classList.contains('desplegado')){
                    otro.classList.remove('desplegado')
                    otro.style.height='0px'
                }  
            }
            subMenu.style.height='220px'
        }      
    }

    function changePokemon(name){
        dispatch(getPokeDetail(name,"player1"))
    }

    function atacar(a){
        var alertaFondo;
        var icono;
        var alertaShow;
        var texto
        var turnos=document.getElementById("turnos")
        var efecto
        var damage=a.power;
        var type=a.type;
        if(detalles.hp>0){
        if(damage===null){
            damage=5
        }else{damage=damage/10}           
        efecto=efectoAtaque(detallesFo.type,type)
        damage=Math.round(damage*efecto) 

        dispatch(changeTurn())                        
        setTimeout(()=>dispatch(attack(fo,damage,type)),5000)
        setTimeout(()=>{turnos.classList.toggle("change")},6000) 
        Swal({    
            title: "WOW! "+detalles.name+" made a "+type+" attack!!",
            button:false,
            heightAuto: false,
            icon: window.location.origin + `/img/${a.type}.png`,            
            iconHeight:50,
            imageHeight: 80, 
            imageWidth: 80,  
          });
        [alertaFondo]=document.getElementsByClassName('swal-overlay')
        alertaShow=document.getElementsByClassName('swal-modal')
        alertaShow[0].style.backgroundColor="rgba(255,255,255)";
        [icono]=document.getElementsByClassName('swal-icon')
              icono.style.height="150px" 
        
        setTimeout(()=>{ 
            if(efecto===0){
                texto=`${detalles.name} miss the attack, made no damage`
                alertaShow[0].style.backgroundColor="rgba(0,100,255,0.69)"
            }
            if(efecto===0.5){
                texto=`${detalles.name} made a great attack, but not very effective`
                alertaShow[0].style.backgroundColor="rgba(63,255,106,0.69)"
            }
            if(efecto===2){
                texto=`the ${detalles.name} attack it's SUPER effective`
                alertaShow[0].style.backgroundColor="rgba(255,0,5,0.69)"
            }
            if(efecto===1){
                texto=`${detallesFo.name} received a direct hit`
                alertaShow[0].style.backgroundColor="rgba(255,170,0,0.69)"
            }
            Swal({
                icon: detallesFo.imagen,
                iconHeight:50,
                imageHeight: 80, 
                imageWidth: 80, 
                title: texto,
                button: false,
                heightAuto: false,
                timer: 3000,
              });
              [icono]=document.getElementsByClassName('swal-icon')
              icono.style.height="150px"
        },2000)
        if((state.player2.hp-damage)>0){
            setTimeout(()=>{//selecciona el ataque de player2
            var x=Math.floor((Math.random()*(detallesFo.attacks.length))%(detallesFo.attacks.length))
            if(detallesFo.attacks[x].power===null){
                damage=5
            }else{damage=detallesFo.attacks[x].power/10}  
            type=detallesFo.attacks[x].type
            efecto=efectoAtaque(detalles.type,type)
            damage=Math.round(damage*efecto)
            
            dispatch(changeTurn()) 
            setTimeout(()=>dispatch(attack("player1",damage,type)),5000)
            setTimeout(()=>turnos.classList.toggle("change"),4000)
            alertaShow[0].style.backgroundColor="rgba(255,255,255)"           
            Swal({       
            title: "WOW! "+detallesFo.name+" made a "+type+" attack!!",
            button:false,
            heightAuto: false,
            icon: window.location.origin + `/img/${type}.png`, 
            timer:3000
            });
            setTimeout(()=>{
                if(efecto===0){
                    texto=`${detallesFo.name} miss the attack, made no damage`
                    alertaShow[0].style.backgroundColor="rgba(0,100,255,0.69)"
                }
                if(efecto===0.5){
                    texto=`${detallesFo.name} made a great attack, but not very effective`
                    alertaShow[0].style.backgroundColor="rgba(63,255,106,0.69)"
                }
                if(efecto===2){
                    texto=`the ${detallesFo.name} attack it's SUPER effective`
                    alertaShow[0].style.backgroundColor="rgba(255,0,5,0.69)"
                }
                if(efecto===1){
                    texto=`${detalles.name} received a direct hit`
                    alertaShow[0].style.backgroundColor="rgba(255,170,0,0.69)"
                }
                Swal({
                    icon: detalles.imagen,
                    title: texto,
                    button: false,
                    heightAuto: false,
                    timer: 3000,
                  });
                  [icono]=document.getElementsByClassName('swal-icon')
              icono.style.height="150px"
            },2000)
            if((state.player1.hp-damage)<1){     
                var pokemonCount= player1Pokemons.filter((p)=>p.hp>0)
                console.log(pokemonCount)
                if(pokemonCount.length>1){
                setTimeout(()=>{
                    alertaShow[0].style.backgroundColor="rgba(255,255,255)" 
                    Swal({
                    icon: "warning",
                    title: `${state.player1.name} can not continue battle,Player 1 select a new pokemon`,
                    button: false,
                    heightAuto: false,
                    timer: 3000,
                  })},6000)
                }else{
                    setTimeout(()=>{
                        alertaShow[0].style.backgroundColor="rgba(255,255,255)" 
                    Swal({
                        icon: "warning",
                        title: `${state.player1.name}can not continue battle and Player 1 has no more Pokemon's to battle! Player 2 you are the WINER!!!`,
                        button: true,
                        heightAuto: false,
                        closeOnClickOutside:false
                      }).then((result) => {
                        if (result=== true) {
                            document.location.reload(true)
                        }
                        })
                    },6000)
                }
            }                            
            },6000) 
        }else{         
            var index=player2Pokemons.findIndex(p=>p.name===detallesFo.name)
            if(index<2){
            setTimeout(()=>{
                alertaShow[0].style.backgroundColor="rgba(255,255,255)" 
                Swal({
                icon: "warning",
                title: `${state.player2.name} can not continue battle,Player 2 pick another pokemon!`,
                button: false,
                heightAuto: false,
                timer: 3000,
                })
                setTimeout(()=>turnos.classList.toggle("change"),4000)
            },6500)
            setTimeout(()=>{
                dispatch(getPokeDetail(player2Pokemons[index+1].name,"player2"))
                dispatch(changeTurn())
            },10000)
            }else{setTimeout(()=>{
                alertaShow[0].style.backgroundColor="rgba(255,255,255)"  
                Swal({
                    icon: "warning",
                    title: `${state.player2.name}can not continue battle and Player 2 has no more Pokemon's to battle! Player 1 you are the WINER!!!`,
                    button: true,
                    heightAuto: false,
                    closeOnClickOutside:false
                  }).then((result) => {
                    if (result=== true) {
                        document.location.reload(true)
                    }
                    })
            },10000)                 
            }
         }    }
         else{
            Swal({
                icon: "error",
                title: `${state.player1.name}can not continue battle please Player 1 select another pokemon`,
                button: true,
                heightAuto: false,
              })
         }
    }
    function salir(){
        document.location.reload(true)
    }
    
    return (
        <div id={props.player+2}>                        
            {detalles.id?
            (<div className={props.player}>                
                <div><h3 className={"titulo"+props.player}>{detalles.name.toUpperCase()}</h3>                    
                {props.player==="player1"?(
                <ul className={"display"+props.player}>
                        <p className="menu" onClick={e=>desplegar("attacksContainer")}>Attacks <ul className="attacksContainer">{detalles.attacks?.map(a=><div onClick={e=>atacar(a)}><Ataque nombre={a.name} type={a.type}/></div>)}</ul></p>
                        <p className="menu" onClick={e=>desplegar("pokemonsContainer")}>Pokemons<ul className="pokemonsContainer">{player1Pokemons.map(p=><div onClick={e=>changePokemon(p.name)}><p>{p.name}</p> <input type="range" value={p.hp}></input></div>)}</ul></p>
                        <p className="menu" onClick={e=>salir(e)}>End Battle</p>
                </ul>):(<></>)}
                <img className={"imagen"+props.player} src={detalles.imagen}/></div>
                <div id={props.player}>
                <p>hp: {detalles.hp}</p>                
                <progress max={100} value={(detalles.hp/detalles.inicial)*100}></progress>
                <p>attk: {detalles.attk}</p>
                <p>def: {detalles.def}</p>
                <div><ul>Type</ul>{detalles.type.map(t=><li>{t}</li>)}</div>                
                </div>
            </div>)
            :
            (<></>)}            
        </div>
    )
}
export default Pokemon