import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import List from "../../List/List";
import axios from "axios";
import { landingsContext } from "../../../../context/landingsContext";

function LandingList() {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const { landings, setLandings, items, setItems } =
    useContext(landingsContext); //Almacenar fetch de all landings
  // const { items, setItems } = useContext(landingsContext);//Almacenar fetch de all landings para paginar
  const [sortName, setSortName] = useState(true); //Estado ordenar por nombre ascendente o descendente
  const [sortMass, setSortMass] = useState(false); //Estado ordenar por masa ascendente o descendente
  const [sortYear, setSortYear] = useState(false); //Estado ordenar por fecha ascendente o descendente
  const { setFilter } = useContext(landingsContext);
  const byName = useRef(); //useRef se usa como getElementById
  const { urlApi } = useContext(landingsContext);
  const [expanded, setExpanded] = useState(false); //Para expandir o contraer el texto de la cabecera

  useEffect(() => {
    if (isSubmitSuccessful) {
      //Para resetear todos los input al crear un landing
      reset({
        id: "",
        recclass: "",
        mass: "",
      });
    }
  }, [formState, items]);

  //Boton expandir form
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  //Borrar filtros
  const handleDeleteFilters = () => {
    console.log("borrando filtros");
    setFilter("");
    setItems(landings);
  };

  //Buscar por nombre
  const handleName = () => {
    const parameter = byName.current.value.trim(); //Trim para eliminar los espacios en blanco del principio y del final
    if (parameter !== "") {
      const regex = new RegExp(parameter, "i"); //i indica que sea case-insensitive
      const newItem = landings.filter((item) => regex.test(item.name));
      setItems(newItem);
    }
    var inputByName = document.getElementById("inputByName");
    inputByName.value = "";
  };

  //Ordenar por nombre
  function handleSortByName() {
    if (sortName) {
      //Para ordenar de la A a la Z
      const data = [...items].sort((a, b) => {
        return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
      });
      setItems(data);
      setSortName(false);
    } else {
      //Para ordenar de la Z a la A
      const data = [...items].sort((a, b) => {
        return a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1;
      });
      setItems(data);
      setSortName(true);
    }
  }

  //Ordenar por masa
  function handleSortByMass() {
    if (sortMass) {
      //Para ordenar de la Mas a menos
      const data = [...items].sort((a, b) => {
        if (!a.mass) {
          return 1;
        } else if (!b.mass) {
          return -1;
        } else {
          return parseInt(a.mass) < parseInt(b.mass) ? 1 : -1;
        }
      });
      setItems(data);
      setSortMass(false);
    } else {
      //Para ordenar de la Menos a Mas
      const data = [...items].sort((a, b) => {
        if (!a.mass) {
          return 1;
        } else if (!b.mass) {
          return -1;
        } else {
          return parseInt(a.mass) > parseInt(b.mass) ? 1 : -1;
        }
      });
      setItems(data);
      setSortMass(true);
    }
  }

  //Ordenar por fecha
  function handleSortByYear() {
    if (sortYear) {
      //Para ordenar de la Menos a Mas
      const data = [...items].sort((a, b) => {
        if (!a.year) {
          return 1; //Mueve ese item al principio de la lista
        } else if (!b.year) {
          return -1; //Mueve ese item al principio de la lista
        } else {
          return parseInt(a.year.slice(0, 4)) - parseInt(b.year.slice(0, 4));
        }
      });
      setItems(data);
      setSortYear(false);
    } else {
      //Para ordenar de la Mas a menos
      const data = [...items].sort((a, b) => {
        if (!a.year) {
          return 1; //Mueve ese item al principio de la lista
        } else if (!b.year) {
          return -1; //Mueve ese item al principio de la lista
        } else {
          return parseInt(b.year.slice(0, 4)) - parseInt(a.year.slice(0, 4));
        }
      });
      setItems(data);
      setSortYear(true);
    }
  }

  //Preparar datos recibidos del formulario para añadirlos a la bbdd
  const createItem = async (data) => {
    console.log(data);
    const refactorData = {
      name: data.name,
      id: data.id,
      nametype: data.nametype,
      recclass: data.recclass,
      mass: data.mass,
      fall: data.fall,
      year: data.year,
      reclat: data.latitude,
      reclong: data.longitude,
      geolocation: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    };
    try {
      await axios.post(`${urlApi}/api/astronomy/landings/create`, refactorData);
      console.log(refactorData);

      setLandings([...landings, refactorData]);
      setItems([...items, refactorData]);
      alert("Landing creado con exito!");
    } catch (error) {
      alert("No ha sido posible crear el nuevo landing");
      console.log(error, "No se ha podido crear el nuevo landing");
    }
  };

  return (
    <div className="mx-5">
      {/* Valores por defecto en el formulario para facilitar la creacion */}
      {/* {setValue("latitude", "37.41667")}
      {setValue("longitude", "-6")}
       */}

      <div>
        <h1 className=" text-lg text-white font-bold  text-center">
          Register a new Landing
        </h1>
        {expanded ? (
          <form className="max-w-xl m-auto" onSubmit={handleSubmit(createItem)}>
            <fieldset>
              <div>
                <label id="id">ID</label>
                <input
                  className="w-full text-black"
                  id="outlined-basic"
                  label="id"
                  variant="outlined"
                  {...register("id", { required: true, valueAsNumber: true })}
                  type="text"
                  name="id"
                  placeholder="2000"
                />
                <p>{errors.id?.message}</p>
              </div>
              <div>
                <label id="name">Name</label>
                <input
                  className="w-full text-black"
                  id="outlined-basic"
                  label="name"
                  variant="outlined"
                  {...register("name", {
                    required: true,
                    minLength: {
                      value: 2,
                      message:
                        "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres.",
                    },
                  })}
                  type="text"
                  name="name"
                  placeholder="Rokamon"
                />
                <p>{errors.name?.message}</p>
              </div>
              <div>
                <input
                  id="outlined-basic"
                  label="nametype"
                  type="hidden"
                  name="nametype"
                  value="Valid"
                  {...register("nametype", { required: true })}
                />
              </div>
              <div>
                <label id="recclass">Class</label>
                <input
                  className="w-full text-black"
                  id="outlined-basic"
                  label="recclass"
                  variant="outlined"
                  {...register("recclass", {
                    required: true,
                    minLength: {
                      value: 2,
                      message:
                        "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres.",
                    },
                  })}
                  type="text"
                  name="recclass"
                  placeholder="L5"
                />
                <p>{errors.recclass?.message}</p>
              </div>
              <div>
                <label id="mass">Mass (g)</label>
                <input
                  className="w-full text-black"
                  id="outlined-basic"
                  label="mass"
                  variant="outlined"
                  {...register("mass", {
                    required: true,
                    minLength: {
                      value: 1,
                      message:
                        "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres.",
                    },
                  })}
                  type="text"
                  name="mass"
                  placeholder="2000"
                />
                <p>{errors.mass?.message}</p>
              </div>
              <div>
                <input
                  className="w-full text-black"
                  id="outlined-basic"
                  label="fall"
                  type="hidden"
                  name="fall"
                  value="Fell"
                  {...register("fall", { required: true })}
                />
              </div>
              <div>
                <label id="year">Year</label>
                <input
                  className="w-full text-black"
                  id="outlined-basic"
                  label="year"
                  variant="outlined"
                  {...register("year", { required: true })}
                  type="text"
                  name="year"
                  placeholder="1989 "
                />
              </div>

              <div>
                <label>Latitude</label>
                <input
                  className="w-full text-black"
                  id="outlined-basic"
                  label="latitude"
                  variant="outlined"
                  {...register("latitude", {
                    required: true,
                    minLength: {
                      value: 2,
                      message:
                        "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres.",
                    },
                  })}
                  type="text"
                  name="latitude"
                  placeholder="37.41667"
                />
                <p>{errors.name?.message}</p>
                <label>Longitude</label>
                <input
                  className="w-full text-black"
                  id="outlined-basic"
                  label="longitude"
                  variant="outlined"
                  {...register("longitude", {
                    required: true,
                    minLength: {
                      value: 2,
                      message:
                        "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres.",
                    },
                  })}
                  type="text"
                  name="longitude"
                  placeholder="-6"
                />
                <p>{errors.name?.message}</p>
              </div>

              <div>
                <button
                  type="submit"
                  className="button1 bg-black mx-4 rounded p-3 m-4"
                >
                  Create
                </button>
              </div>
            </fieldset>
          </form>
        ) : null}
        <div className="flex justify-center items-center">
          <button
            className="button1 bg-black mx-0 rounded p-3 m-4"
            onClick={toggleExpansion}
          >
            {expanded ? "Hide Form" : "Show Form"}
          </button>
        </div>
      </div>

      <hr></hr>
      <br></br>

      <div>
        <label
          htmlFor="searchMass"
          className="flex justify-center text-lg text-white font-bold"
        >
          Search landing by name
        </label>
        <div className="flex justify-center">
          <input
            className="my-auto mx-4 rounded text-black"
            type="text"
            id="inputByName"
            name="byName"
            ref={byName}
            placeholder="Landing name"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleName();
              }
            }}
          />
          <button
            className="button1 bg-black mx-1 rounded p-3 m-4"
            type="submit"
            onClick={handleName}
          >
            Search landing
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="button1 text-xs bg-black mx-1 rounded p-1 m-auto"
          onClick={handleSortByName}
        >
          Sort by name
        </button>
        <button
          className="button1 text-xs bg-black mx-1 rounded p-1 m-auto"
          onClick={handleSortByYear}
        >
          Sort by year
        </button>
        <button
          className="button1 text-xs bg-black mx-1 m-auto rounded p-1"
          onClick={handleSortByMass}
        >
          Sort by mass
        </button>
        <button
          className="button1 bg-black mx-4 rounded p-3 m-4"
          onClick={handleDeleteFilters}
        >
          Delete filters
        </button>
      </div>
      <h1 className=" text-lg text-white font-bold  text-center m-4">
        Landing list
      </h1>
      {/* Renderizamos el componente List si el estado de landings no esta vacio */}
      {landings.length > 0 ? <List /> : "Loading..."}
    </div>
  );
}

export default LandingList;
