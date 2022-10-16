import { useParams, Link, useNavigate, Navigate } from "react-router-dom";//Para capturar el parametro ID pasado por los parametros del router
import React, { useEffect, useState, useContext } from "react";
import { landingsContext } from '../../../../context/landingsContext'
import { useForm } from 'react-hook-form';
import axios from "axios";


function LandingForm(props) {
  const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm();
  const { landings, setLandings } = useContext(landingsContext);
  const { items, setItems } = useContext(landingsContext);//Almacenar fetch de all landings
  const params = useParams();// Para poder usar los parametros capturados por el router

  const [searchId] = useState(params.id);//Creo variable de estado local para almacenar la ID
  const [search, setSearch] = useState();
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  function toRedirect() {
    navigate('/landing/list');
  }

  const itemDetails = async () => {
    try {
      const { data } = await axios.get(`/api/astronomy/landings/?id=${searchId}`);
      setSearch(...data)
    } catch (error) {
      console.log(error);
    }
  }
  console.log(landings.length);


  useEffect(() => {
    itemDetails()//Lanzamos la busqueda
    if (redirect) {
      toRedirect();
    }
  }, [redirect]
  );

  const editItem = async (data) => {
    try {
      console.log("EDIT ITEM DATA", data);
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
      //Primero borramos el antiguo item de las listas
      const remainingLandings = landings.filter((item) => data.id !== item.id)//Creamos una cosntante con el listado de landings sin el que acabamos de borrar
      console.log(remainingLandings.length);
      await setLandings([...remainingLandings, refactorData]);//Guardamos el nuevo listado en Landings
      console.log(landings.length);
      await setItems([...remainingLandings, refactorData]);//Guardamos el nuevo listado en Items para que se actualice la lista renderizada
      //Ahora introducimos el item modificado en la lista
      // setLandings([...landings, refactorData])
      // setItems([...items, refactorData])

      setRedirect(true);
      await axios.put('/api/astronomy/landings/edit', refactorData);
    } catch (error) {
      console.log(error, "No se ha podido editar el landing")
    }
  }

  return (
    <div>
      {search ? setValue("latitude", search.geolocation.latitude) : "..."}
      {search ? setValue("longitude", search.geolocation.longitude) : "..."}
      {search ? setValue("id", search.id) : "..."}
      {search ? setValue("mass", search.mass) : "..."}
      {search ? setValue("name", search.name) : "..."}
      {search ? setValue("recclass", search.recclass) : "..."}
      {search ? setValue("reclat", search.reclat) : "..."}
      {search ? setValue("reclong", search.reclong) : "..."}
      {search ? setValue("year", search.year) : "..."}

      {search ? <form onSubmit={handleSubmit(editItem)}>
        <fieldset>
          <div>
            <input
              id="outlined-basic"
              label="id"
              variant="outlined"
              type="hidden"
              name="id"
              {...register("id", { required: true, minLength: { value: 1, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}
            />
          </div>
          <div>
            <label id="name">Nombre</label>
            <input
              autoFocus="true"
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
              {...register("nametype", { required: true, minLength: { value: 2, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}

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
              {...register("fall", { required: true, minLength: { value: 2, message: "El nombre del nuevo Pokemon debe ser mayor de 2 caracteres." } })}

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
            />
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