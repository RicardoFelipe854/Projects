import React from "react";
import { useNavigate } from "react-router-dom";
import { navigateFill } from "../../models/controlNavigate";

function CardTriages({title = "Titulo por defecto" }){
  const navigate = useNavigate();

  const handleClick = () => {
    navigate( navigateFill() );
  }

  return(
    < >
      <div onClick={ handleClick }
           className="border rounded-2xl flex inline-flex inline-grid py-14 px-12 mx-3 my-3 text-2xl bg-custom-orange font-inknut-antiqua">
        { title }
      </div>
    < />
  )
}

export default CardTriages;