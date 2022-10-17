import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import List from "../../List/List";
import axios from 'axios';
import { landingsContext } from '../../../../context/landingsContext';


function LandingList() {
  const { register, setValue, reset, handleSubmit, formState, formState: { errors, isSubmitSuccessful } } = useForm();
  const { landings, setLandings } = useContext(landingsContext);//Almacenar fetch de all landings
  const { items, setItems } = useContext(landingsContext);//Almacenar fetch de all landings para paginar
  const [sortName, setSortName] = useState(true); //Estado ordenar por nombre ascendente o descendente
  const [sortMass, setSortMass] = useState(false);//Estado ordenar por masa ascendente o descendente
  const [sortDate, setSortDate] = useState(false);//Estado ordenar por fecha ascendente o descendente
  const byName = useRef();//useRef se usa como getElementById


  useEffect(() => {
    if (isSubmitSuccessful) {//Para resetear todos los input al crear un landing
      reset({
        id: "",
        recclass: "",
        mass: ""
      });
    }
  }, [formState, items]);

  //Borrar filtros
  const handleDeleteFilters = () => {
    setItems(landings);
  }

  //Buscar por nombre
  const handleName = (e) => {
    e.preventDefault();
    const parameter = byName.current.value;
    const newItem = items.filter((item, i) => parameter.toUpperCase() == item.name.toUpperCase())//"convertimos" en mayusculas ambos parametros a comparar
    setItems(newItem);
  }

  //Ordenar por nombre
  function handleSortByName() {
    if (sortName) {
      //Para ordenar de la Z a la A
      const data = [...items].sort((a, b) => {
        return a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1
      })
      setItems(data);
      setSortName(false)
    } else {
      //Para ordenar de la A a la Z
      const data = [...items].sort((a, b) => {
        return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
      })
      setItems(data);
      setSortName(true)
    }
  }

  //Ordenar por masa
  function handleSortByMass() {
    if (sortMass) {
      //Para ordenar de la Mas a menos
      const data = [...items].sort((a, b) => {
        return a.mass < b.mass ? 1 : -1
      })
      setItems(data);
      setSortMass(false)
    } else {
      //Para ordenar de la Menos a Mas
      const data = [...items].sort((a, b) => {
        return a.mass > b.mass ? 1 : -1
      })
      setItems(data);
      setSortMass(true)
    }
  }

  //Ordenar por fecha
  function handleSortByDate() {
    if (sortDate) {
      //Para ordenar de la Mas a menos
      const data = [...items].sort((a, b) => {
        return a.year < b.year ? 1 : -1
      })
      setItems(data);
      setSortDate(false)
    } else {
      //Para ordenar de la Menos a Mas
      const data = [...items].sort((a, b) => {
        return a.year > b.year ? 1 : -1
      })
      setItems(data);
      setSortDate(true)
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
      reclat: data.reclat,
      reclong: data.reclong,
      geolocation: {
        latitude: data.latitude,
        longitude: data.longitude
      }
    }
    try {
      await axios.post('/api/astronomy/landings/create', refactorData)
      setLandings([...landings, refactorData])
      setItems([...items, refactorData])
      alert("Landing creado con exito!")
    } catch (error) {
      alert("No ha sido posible crear el nuevo landing")
      console.log(error, "No se ha podido crear el nuevo landing")
    }
  }

  return (
    <div className='mx-5'>
      {/* Valores por defecto en el formulario para facilitar la creacion */}
      {setValue("latitude", "37.41667")}
      {setValue("longitude", "-6")}
      {setValue("reclat", "37.41667")}
      {setValue("reclong", "-6")}

      <h1 className=' text-lg text-white font-bold  text-center'>Registra un nuevo Landing</h1>
      <form onSubmit={handleSubmit(createItem)}>
        <fieldset >
          <div>
            <label id="id">ID</label>
            <input className="w-full"
              id="outlined-basic"
              label="id"
              variant="outlined"
              {...register("id", { required: true, valueAsNumber: true })}
              type="string"
              name="id"
              placeholder="2000"
            />
            <p>{errors.id?.message}</p>
          </div>
          <div>
            <label id="name">Nombre</label>
            <input className="w-full"
              id="outlined-basic"
              label="name"
              variant="outlined"
              {...register("name", { required: true, minLength: { value: 2, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}
              type="text"
              name="name"

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
            <label id="recclass">Recclass</label>
            <input className="w-full"
              id="outlined-basic"
              label="recclass"
              variant="outlined"
              {...register("recclass", { required: true, minLength: { value: 2, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}
              type="text"
              name="recclass"
              placeholder="L5"
            />
            <p>{errors.recclass?.message}</p>
          </div>
          <div>
            <label id="mass">Masa (g)</label>
            <input className="w-full"
              id="outlined-basic"
              label="mass"
              variant="outlined"
              {...register("mass", { required: true, minLength: { value: 1, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}
              type="number"
              name="mass"
              placeholder="2000"
            />
            <p>{errors.mass?.message}</p>
          </div>
          <div>
            <input className="w-full"
              id="outlined-basic"
              label="fall"

              type="hidden"
              name="fall"
              value="Fell"
              {...register("fall", { required: true })}

            />
          </div>
          <div>
            <label id="year">Fecha</label>
            <input className="w-full"
              id="outlined-basic"
              label="year"
              variant="outlined"
              {...register("year", { required: true })}
              type="date"
              name="year"

            />

          </div>
          <div>
            <label id="reclat">reclat</label>
            <input className="w-full"
              id="outlined-basic"
              label="reclat"
              variant="outlined"
              {...register("reclat", { required: true, minLength: { value: 2, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}
              type="text"
              name="reclat"

            />
            <p>{errors.reclat?.message}</p>
          </div>
          <div>
            <label id="reclong">reclong</label>
            <input className="w-full"
              id="outlined-basic"
              label="reclong"
              variant="outlined"
              {...register("reclong", { required: true, minLength: { value: 2, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}
              type="text"
              name="reclong"

            />
            <p>{errors.reclong?.message}</p>
          </div>
          <div>
            <label >Localizacion</label><br></br>
            <label>Latitud</label>
            <input className="w-full"
              id="outlined-basic"
              label="latitude"
              variant="outlined"
              {...register("latitude", { required: true, minLength: { value: 2, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}
              type="text"
              name="latitude"

            />
            <p>{errors.name?.message}</p>
            <label>Longitud</label>
            <input className="w-full"
              id="outlined-basic"
              label="longitude"
              variant="outlined"
              {...register("longitude", { required: true, minLength: { value: 2, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}
              type="text"
              name="longitude"

            />
            <p>{errors.name?.message}</p>

          </div>


          <div>
            <button type="submit">Create</button>
          </div>
        </fieldset>
      </form>
      <hr></hr>
      <h1 className=' text-lg text-white font-bold  text-center'>Listado de todos los Landings registrados</h1>
      <div >
        <button className="button1 bg-black border-2 mx-4 rounded-xl p-1" onClick={handleDeleteFilters}>Delete filters</button>
      </div>
      <div >
        <label htmlFor="searchMass" className=' text-lg text-white font-bold  text-center'>Search landing by name</label>
        <input type="text" name="byName" ref={byName} placeholder="landing name" />
        <button className="button1 bg-black border-2 mx-4 rounded-xl p-1" type='submit' onClick={handleName}>Search landing</button>
      </div>
      <div>
        <div >
          <button className="button1 bg-black border-2 mx-4 rounded-xl p-1" onClick={handleSortByName}>Sort by name</button>
        </div>
        <div >
          <button className="button1 bg-black border-2 mx-4 rounded-xl p-1" onClick={handleSortByDate}>Sort by date</button>
        </div>
        <div >
          <button className="button1 bg-black border-2 mx-4 rounded-xl p-1" onClick={handleSortByMass}>Sort by mass</button>
        </div>
      </div>
      {/* Renderizamos el componente List si el estado de landings no esta vacio */}
      {landings.length > 0 ? <List /> : "Loading..."}
    </div>
  )
}

export default LandingList