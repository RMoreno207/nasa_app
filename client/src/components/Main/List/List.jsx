import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react';
import ReactPaginate from "react-paginate";
import { landingsContext } from '../../../context/landingsContext';
import { v4 as uuidv4 } from 'uuid';
import Card from '../Card/Card';
import axios from 'axios';


function List(props) {
  const { landings, setLandings } = useContext(landingsContext);//Almacenar fetch de all landings
  // const { getLandings } = useContext(landingsContext);
  const { items, setItems } = useContext(landingsContext);//Recoge los datos a mostrar
  // const [triger, setTriger] = useState(false);
  // const [searchId, setSearchId] = useState();//Creo variable de estado local para almacenar la ID

  const [pageNumber, setPageNumber] = useState(0);//Para paginacion
  const itemsPerPage = 5;//Numero de items a mostrar en cada pagina
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(items.length / itemsPerPage);//Contador de paginas

  const changePage = ({ selected }) => {//componente ReactPaginate contiene un objeto llamado selected y nos dice la pagina en la que estamos
    setPageNumber(selected);
  }

  // useEffect(() => {
  //   console.log("useEffect");
  //   if (triger) {
  //     // getLandings()
  //     console.log(landings);
  //     // const remainingItems = items.filter((item, j) => searchId !== item.id)
  //     // setItems(remainingItems);
  //     // console.log("remainingItems", remainingItems);
  //     // alert("Landing borrada con exito!")
  //   }

  // }, []
  // );


  const deleteItem = async (id) => {
    try {
      console.log(landings);
      const remainingLandings = landings.filter((item) => id !== item.id)//Creamos una cosntante con el listado de landings sin el que acabamos de borrar
      setLandings(remainingLandings);//Guardamos el nuevo listado en Landings
      setItems(remainingLandings);//Guardamos el nuevo listado en Items para que se actualice la lista renderizada
      alert("Landing borrada correctamente");
      console.log(landings);


      // setSearchId(i)
      // setTriger(true)
      console.log("DELETE ITEM", id);
      await axios.delete(`/api/astronomy/landings/delete/${id}`)//Borramos la landing de la base de datos

    } catch (error) {
      throw error
    }

  }


  return (
    <section>
      {items.length > 0 ? items
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((item, i) => <Card key={uuidv4()} index={i} value={item} delete={() => deleteItem(item.id)} />) : "Loading..."}
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