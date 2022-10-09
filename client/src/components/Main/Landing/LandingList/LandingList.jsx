import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import List from "../../List/List";
import { landingsContext } from '../../../../context/landingsContext';
import axios from 'axios';


function LandingList() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { landings, setLandings } = useContext(landingsContext);//Almacenar fetch de all landings
  const { filter, setFilter } = useContext(landingsContext);

  useEffect(() => {
    setFilter("");
  }, []);




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
    } catch (error) {
      console.log(error, "No se ha podido crear el nuevo landing")
    }
  }

  return (
    <div>
      <h1>Registra un nuevo Landing</h1>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <form onSubmit={handleSubmit(createItem)}>
        <fieldset>
          <div>
            <label id="id">ID</label>
            <input
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
            <input
              id="outlined-basic"
              label="name"
              variant="outlined"
              {...register("name", { required: true, minLength: { value: 2, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}
              type="text"
              name="name"
              value="Rokamon"
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
            />

          </div>
          <div>
            <label id="recclass">Recclass</label>
            <input
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
            <input
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
            <input
              id="outlined-basic"
              label="fall"

              type="hidden"
              name="fall"
              value="Fell"
            />
          </div>
          <div>
            <label id="year">Fecha</label>
            <input
              id="outlined-basic"
              label="year"
              variant="outlined"
              {...register("year", { required: true })}
              type="date"
              name="year"
              placeholder="Rokamon"
            />

          </div>
          <div>
            <label id="reclat">reclat</label>
            <input
              id="outlined-basic"
              label="reclat"
              variant="outlined"
              {...register("reclat", { required: true, minLength: { value: 2, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}
              type="text"
              name="reclat"
              value="37.41667"
            />
            <p>{errors.reclat?.message}</p>
          </div>
          <div>
            <label id="reclong">reclong</label>
            <input
              id="outlined-basic"
              label="reclong"
              variant="outlined"
              {...register("reclong", { required: true, minLength: { value: 2, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}
              type="text"
              name="reclong"
              value="-6"
            />
            <p>{errors.reclong?.message}</p>
          </div>
          <div>
            <label >Localizacion</label><br></br>
            <label>Latitud</label>
            <input
              id="outlined-basic"
              label="latitude"
              variant="outlined"
              {...register("latitude", { required: true, minLength: { value: 2, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}
              type="text"
              name="latitude"
              value="37.41667"
            />
            <p>{errors.name?.message}</p>
            <label>Longitud</label>
            <input
              id="outlined-basic"
              label="longitude"
              variant="outlined"
              {...register("longitude", { required: true, minLength: { value: 2, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}
              type="text"
              name="longitude"
              value="-6"
            />
            <p>{errors.name?.message}</p>

          </div>


          <div>
            <button type="submit">Create</button>
          </div>
        </fieldset>
      </form>
      <hr></hr>
      <h1>Listado de todos los Landings registrados</h1>
      <List />
    </div>
  )
}

export default LandingList