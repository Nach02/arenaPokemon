import React from "react";


function Ataque(props){
    var URL=window.location.origin + `/img/${props.type}.png`
    return(
        <div style={{display: "flex", alignItems: "center"}}>            
            <img style={{width:20+"px",height:20+"px"}} src={URL}/>
            <p>{props.nombre}</p>
        </div>
    
    )  
}

export default Ataque