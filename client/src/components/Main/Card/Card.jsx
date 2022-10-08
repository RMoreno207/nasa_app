import React from 'react'

function Card(props) {
  console.log(props);
  const { id, name, year, mass, recclass } = props.value;

  return (
    <article>
      <ul>
        <li>{name}</li>
        <li>{id}</li>
        <li>{mass}</li>
        <li>{recclass}</li>
        <li>{year}</li>
        <li>Editar</li>
        <li>Borrar</li>
      </ul>
    </article>
  )
}

export default Card