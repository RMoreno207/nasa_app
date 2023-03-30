import React from 'react'
import { Link } from 'react-router-dom';


function Card(props) {
  return (
    <article>
      <hr></hr>
      <Link to={`/landing/detail/${props.value.id}`}><li className='className="button1 bg-black border-2 mx-4 rounded-xl p- text-center" '>{props.value.name}</li></Link>
      <li>Masa: {props.value.mass}</li>
      <li>Clase: {props.value.recclass}</li>
      <li>Año: {props.value.year.substring(0, 10)}</li>
      <Link to={`/landing/form/${props.value.id}`}><button className="button1 bg-black border-2 mx-4 rounded-xl p-1">Editar</button></Link>
      <button onClick={props.delete} className="button1 bg-black border-2 mx-4 rounded-xl p-1">Borrar</button>
    </article>
  )
}

export default Card