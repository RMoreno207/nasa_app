import React from "react";
import { useState, useContext } from "react";
import ReactPaginate from "react-paginate";
import { landingsContext } from "../../../context/landingsContext";
import { v4 as uuidv4 } from "uuid";
import Card from "../Card/Card";
import axios from "axios";

function List() {
  const { landings, setLandings } = useContext(landingsContext); //Almacenar fetch de all landings
  const { items, setItems } = useContext(landingsContext); //Recoge los datos a mostrar
  const { urlApi } = useContext(landingsContext);

  const [pageNumber, setPageNumber] = useState(0); //Para paginacion
  const itemsPerPage = 10; //Numero de items a mostrar en cada pagina
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(items.length / itemsPerPage); //Contador de paginas
  const changePage = ({ selected }) => {
    //componente ReactPaginate contiene un objeto llamado selected y nos dice la pagina en la que estamos
    setPageNumber(selected);
  };

  const deleteItem = async (id) => {
    try {
      const remainingLandings = landings.filter((item) => id !== item.id); //Creamos una cosntante con el listado de landings sin el que acabamos de borrar
      setLandings(remainingLandings); //Guardamos el nuevo listado en Landings
      setItems(remainingLandings); //Guardamos el nuevo listado en Items para que se actualice la lista renderizada
      alert("Landing borrada correctamente");
      await axios.delete(`${urlApi}/api/astronomy/landings/delete/${id}`); //Borramos la landing de la base de datos
    } catch (error) {
      throw error;
    }
  };

  return (
    <section>
      <div className="m-auto max-w-xl text-justify list-none">
        {/* Mandamos lalista de items paginada si no esta vacia */}
        {items.length > 0
          ? items
              .slice(pagesVisited, pagesVisited + itemsPerPage)
              .map((item, i) => (
                <Card
                  key={uuidv4()}
                  index={i}
                  value={item}
                  delete={() => deleteItem(item.id)}
                />
              ))
          : "Loading..."}
      </div>
      {/* Indice de las paginas */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 20,
          boxSizing: "border-box",
          width: "100%",
          height: "100%",
        }}
      >
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={changePage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          containerClassName={
            "pagination w-100 h-100 flex items-center justify-center"
          }
          activeClassName={"item active bg-black"}
          pageClassName={"item pagination-page mx-1 text-xs"}
          disabledClassName={"disabled-page "}
          breakLabel={"..."}
          breakClassName={"item break-me mx-1"}
          nextLabel={"Next"}
          nextClassName={"item next  ml-1 text-sm "}
          previousLabel={"Previous"}
          previousClassName={"item previous mr-1 text-sm"}
          renderOnZeroPageCount={null}
        />
      </div>
    </section>
  );
}

export default List;
