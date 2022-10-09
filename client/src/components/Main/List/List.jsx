import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react';
import ReactPaginate from "react-paginate";
import { landingsContext } from '../../../context/landingsContext';


function List(props) {
  // console.log(props);
  // const { id, name, year, mass, recclass } = props.value;




  const { landings, setLandings } = useContext(landingsContext);//Almacenar fetch de all landings
  const [items, setItems] = useState(landings.slice(0, 21));//Recoge los datos a mostrar
  console.log(items);
  const [pageNumber, setPageNumber] = useState(0);//Para paginacion

  const itemsPerPage = 5;//Numero de items a mostrar en cada pagina
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(items.length / itemsPerPage);//Contador de paginas

  const changePage = ({ selected }) => {//componente ReactPaginate contiene un objeto llamado selected y nos dice la pagina en la que estamos
    setPageNumber(selected);
  }

  const displayItems = items
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((items) => {
      return (
        <article>
          <hr></hr>
          <li>{items.name}</li>
          <li>{items.id}</li>
          <li>{items.mass}</li>
          <li>{items.recclass}</li>
          <li>{items.year}</li>
          <li>Editar</li>
          <li>Borrar</li>
        </article>
      );
    });





  return (
    <article>
      {displayItems}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </article>
  )
}

export default List