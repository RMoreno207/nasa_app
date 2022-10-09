import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react';
import ReactPaginate from "react-paginate";
import { landingsContext } from '../../../context/landingsContext';
import { v4 as uuidv4 } from 'uuid';
import Card from '../Card/Card';
import axios from 'axios';


function List(props) {
  console.log("list", props);
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

  // try {
  //   axios.post('/api/astronomy/landings/create', refactorData)
  // } catch (error) {
  //   console.log(error, "No se ha podido crear el nuevo landing")
  // }

  const deleteItem = async (i, id) => {
    try {
      await axios.delete(`/api/astronomy/landings/delete/${id}`)
    } catch (error) {
      throw error
    }
    // const remainingLandings = landings.filter((landing, j) => i !== j)
    // setLandings(remainingLandings);
  }


  return (
    <section>
      {items
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((items, i) => <Card key={uuidv4()} index={i} value={items} delete={() => deleteItem(i, items.id)} />)}
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
    </section>
  )
}

export default List