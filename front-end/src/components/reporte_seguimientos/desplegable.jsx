import React, {useState} from 'react';
import Desplegable_item from "./desplegable_Item";
import items from "./seleccionado.json";



const Desplegable2 = () =>{

    return (
        <div className="fichas">
          { items.map((item, index) => <Desplegable_item key={index} item={item} />) }
        </div>
    )
}

export default Desplegable2 


















