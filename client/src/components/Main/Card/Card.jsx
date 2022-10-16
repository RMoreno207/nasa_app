import React from 'react'
import { Link } from 'react-router-dom';


function Card(props) {
  return (
    <article>
      <hr></hr>
      <Link to={`/landing/detail/${props.value.id}`}><li>{props.value.name}</li></Link>
      <li>{props.value.mass}</li>
      <li>{props.value.recclass}</li>
      <li>{props.value.year.substring(0, 10)}</li>
      <Link to={`/landing/form/${props.value.id}`}><button>Editar</button></Link>
      <button onClick={props.delete}>Borrar</button>
    </article>
  )
}

export default Card