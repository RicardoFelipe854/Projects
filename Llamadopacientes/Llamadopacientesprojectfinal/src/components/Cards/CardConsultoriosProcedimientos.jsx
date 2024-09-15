import React from "react";
import { useNavigate } from "react-router-dom";
import { navigateCall } from "../../models/controlNavigate";


function CardProcedimientos({title = "Titulo por defecto" }){
  const navigate = useNavigate();

  const handleClick = () => {
    navigate( navigateCall() );
  }

  return(
    < >
      <div onClick={ handleClick }
           className="border rounded-2xl flex inline-flex inline-grid py-14 px-10 mx-3 my-3 text-2xl bg-custom-green font-inknut-antiqua">
        { title }
      </div>
    < />
  )
}

export default CardProcedimientos;