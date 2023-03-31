import React from 'react'
import { useState, useContext } from 'react';
import ReactPaginate from "react-paginate";
import { landingsContext } from '../../../context/landingsContext';
import { v4 as uuidv4 } from 'uuid';
import Card from '../Card/Card';
import axios from 'axios';


function List() {
  const { landings, setLandings } = useContext(landingsContext);//Almacenar fetch de all landings
  const { items, setItems } = useContext(landingsContext);//Recoge los datos a mostrar

  const [pageNumber, setPageNumber] = useState(0);//Para paginacion
  const itemsPerPage = 5;//Numero de items a mostrar en cada pagina
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(items.length / itemsPerPage);//Contador de paginas
  const changePage = ({ selected }) => {//componente ReactPaginate contiene un objeto llamado selected y nos dice la pagina en la que estamos
    setPageNumber(selected);
  }

  const deleteItem = async (id) => {
    try {
      const remainingLandings = landings.filter((item) => id !== item.id)//Creamos una cosntante con el listado de landings sin el que acabamos de borrar
      setLandings(remainingLandings);//Guardamos el nuevo listado en Landings
      setItems(remainingLandings);//Guardamos el nuevo listado en Items para que se actualice la lista renderizada
      alert("Landing borrada correctamente");
      await axios.delete(`https://nasa-app-one.vercel.app/api/astronomy/landings/delete/${id}`)//Borramos la landing de la base de datos
    } catch (error) {
      throw error
    }
  }


  return (
    <section className='list-none'>
      {/* Mandamos lalista de items paginada si no esta vacia */}
      {items.length > 0 ? items
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((item, i) => <Card key={uuidv4()} index={i} value={item} delete={() => deleteItem(item.id)} />) : "Loading..."}
      {/* Indice de las paginas */}
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