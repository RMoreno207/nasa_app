import React from 'react'
import { Link } from 'react-router-dom';


function Card(props) {
  return (
    <article>
      <hr></hr>
      <Link to={`/landing/detail/${props.value.id}`}><li className='className="button1 bg-black border-2 mx-4 rounded-xl p-2 text-center" '>{props.value.name}</li></Link>
      <li>{props.value.mass}</li>
      <li>{props.value.recclass}</li>
      <li>{props.value.year.substring(0, 10)}</li>
      <Link to={`/landing/form/${props.value.id}`}><button className="button1 bg-black border-2 mx-4 rounded-xl p-2">Editar</button></Link>
      <button onClick={props.delete} className="button1 bg-black border-2 mx-4 rounded-xl p-2">Borrar</button>
    </article>
  )
}

export default Card