import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react';
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import { landingsContext } from '../../../context/landingsContext';


function Card(props) {
  console.log("card", props);
  // const { id, name, year, mass, recclass } = props.value;



  return (
    <article>
      <hr></hr>
      <li>{props.value.name}</li>
      <li>{props.value.id}</li>
      <li>{props.value.mass}</li>
      <li>{props.value.recclass}</li>
      <li>{props.value.year}</li>
      <Link to={`/landing/form/${props.value.id}`}><button>Editar</button></Link>
      <button onClick={props.delete}>Borrar</button>
    </article>
  )
}

export default Card