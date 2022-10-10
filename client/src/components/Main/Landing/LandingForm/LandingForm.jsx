import { useParams, Link } from "react-router-dom";//Para capturar el parametro ID pasado por los parametros del router
import React, { useEffect, useState, useContext } from "react";
import { landingsContext } from '../../../../context/landingsContext'
import { useForm } from 'react-hook-form';
import axios from "axios";


function LandingForm(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // const { landings, setLandings } = useContext(landingsContext);//Almacenar fetch de all landings
  const params = useParams();// Para poder usar los parametros capturados por el router
  console.log(params);
  const [searchId] = useState(params.id);//Creo variable de estado local para almacenar la ID
  const [search, setSearch] = useState();
  console.log(searchId);
  console.log("search", search);


  const itemDetails = async () => {
    try {
      console.log("Estas en el fetch");
      const { data } = await axios.get(`/api/astronomy/landings/?id=${searchId}`);
      console.log("DATA", data);
      setSearch(...data)
      // console.log(search.name);
    } catch (error) {
      console.log(error);
    }
  }
  console.log("SEARCH", search);

  useEffect(() => {
    itemDetails()//Lanzamos la busqueda
  }, []
  );

  const editItem = async (data) => {
    console.log("36", data);
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
      await axios.post('/api/astronomy/landings/edit', refactorData)
    } catch (error) {
      console.log(error, "No se ha podido editar el landing")
    }
  }

  return (
    <div>
      {search ? <form onSubmit={handleSubmit(editItem)}>
        <fieldset>
          <div>

            <input
              id="outlined-basic"
              label="id"
              variant="outlined"
              type="hidden"
              name="id"
              value="search.id"
            />

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
              value={search.name} />
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
              value={search.recclass} />
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
              value={search.mass} />
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
              value={search.year} />

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
              value={search.reclat} />
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
              value={search.reclong} />
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
              value={search.geolocation.latitude} />
            <p>{errors.name?.message}</p>
            <label>Longitud</label>
            <input
              id="outlined-basic"
              label="longitude"
              variant="outlined"
              {...register("longitude", { required: true, minLength: { value: 2, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}
              type="text"
              name="longitude"
              value={search.geolocation.longitude} />
            <p>{errors.name?.message}</p>

          </div>


          <div>
            <button type="submit">Edit</button>
          </div>
        </fieldset>
      </form> : "Loading..."}
    </div>
  )
}

export default LandingForm