import { useParams, useNavigate, Navigate } from "react-router-dom";//Para capturar el parametro ID pasado por los parametros del router
import React, { useEffect, useState, useContext } from "react";
import { landingsContext } from '../../../../context/landingsContext'
import { useForm } from 'react-hook-form';
import axios from "axios";


function LandingForm(props) {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();
  const { landings, setLandings } = useContext(landingsContext);
  const { setItems } = useContext(landingsContext);//Almacenar fetch de all landings
  const params = useParams();// Para poder usar los parametros capturados por el router

  const [searchId] = useState(params.id);//Creo variable de estado local para almacenar la ID
  const [search, setSearch] = useState();//Almacena los detalles del landing
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const urlApi = "https://nasa-app-api-seven.vercel.app";

  function toRedirect() {
    navigate('/landing/list');
  }

  //Obtener los detalles del landing
  const itemDetails = async () => {
    try {
      const { data } = await axios.get(`${urlApi}/api/astronomy/landings/?id=${searchId}`);

      //recortar fecha
       if(data[0].year.length>4){
        data[0].year = data[0].year.slice(0,4);
      }
      setSearch(...data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    itemDetails()//Lanzamos la busqueda del landing a editar
    if (redirect) {
      toRedirect();
    }
  }, [redirect]
  );

  //Preparar datos recibidos del formulario para añadirlos a la bbdd
  const editItem = async (data) => {
    try {
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
          longitude: data.longitude
        }
      }

      //Primero borramos el antiguo item de las listas
      const remainingLandings = landings.filter((item) => data.id !== item.id)//Creamos una cosntante con el listado de landings sin el que acabamos de borrar
      console.log(remainingLandings.length);
      await setLandings([...remainingLandings, refactorData]);//Guardamos el nuevo listado en Landings
      console.log(landings.length);
      await setItems([...remainingLandings, refactorData]);//Guardamos el nuevo listado en Items para que se actualice la lista renderizada
      setRedirect(true);
      alert("Landing editada con exito!")
      await axios.put(`${urlApi}/api/astronomy/landings/edit`, refactorData);
    } catch (error) {
      console.log(error, "No se ha podido editar el landing")
    }
  }

  return (
    <div>
      {search ? setValue("latitude", search.geolocation.latitude) : null}
      {search ? setValue("longitude", search.geolocation.longitude) : null}
      {search ? setValue("id", search.id) : null}
      {search ? setValue("mass", search.mass) : null}
      {search ? setValue("name", search.name) : null}
      {search ? setValue("recclass", search.recclass) : null}
      {search ? setValue("year", search.year) : null}

      {search ? <form onSubmit={handleSubmit(editItem)}>
      <h1 className=' text-lg text-white font-bold  text-center'>Landing edition</h1>
      {/* <p className="text-center">The landing is edited only in the local list</p> */}
        <fieldset className="mx-4" >
          <div>
            <input
              id="outlined-basic"
              label="id"
              variant="outlined"
              type="hidden"
              name="id"
              {...register("id", { required: true, minLength: { value: 1, message: "Debe de tener más de 1 carácter" } })}
            />
          </div>
          <div>
            <label id="name">Name</label>
            <input className="w-full text-black"
              autoFocus="true"
              id="outlined-basic"
              label="name"
              variant="outlined"
              {...register("name", { required: true, minLength: { value: 2, message: "Debe de tener más de 1 carácter" } })}
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
              {...register("nametype", { required: true, minLength: { value: 2, message: "Debe de tener más de 1 carácter" } })}

            />

          </div>
          <div>
            <label id="recclass">Recclass</label>
            <input className="w-full text-black"
              id="outlined-basic"
              label="recclass"
              variant="outlined"
              {...register("recclass", { required: true, minLength: { value: 2, message: "Debe de tener más de 1 carácter" } })}
              type="text"
              name="recclass"
            />
            <p>{errors.recclass?.message}</p>
          </div>
          <div>
            <label id="mass">Mass (g)</label>
            <input className="w-full text-black"
              id="outlined-basic"
              label="mass"
              variant="outlined"
              {...register("mass", { required: true, minLength: { value: 1, message: "Debe de tener más de 1 carácter" } })}
              type="text"
              name="mass"
            />
            <p>{errors.mass?.message}</p>
          </div>
          <div>
            <input className="w-full text-black"
              id="outlined-basic"
              label="fall"

              type="hidden"
              name="fall"
              value="Fell"
              {...register("fall", { required: true, minLength: { value: 2, message: "Debe de tener más de 1 carácter" } })}

            />
          </div>
          <div>
            <label id="year">Year</label>
            <input className="w-full text-black"
              id="outlined-basic"
              label="year"
              variant="outlined"
              {...register("year", { required: true })}
              type="text"
              name="year"
            />

          </div>
          
          <div>
            <label>Latitude</label>
            <input className="w-full text-black"
              id="outlined-basic"
              label="latitude"
              variant="outlined"
              {...register("latitude", { required: true, minLength: { value: 2, message: "Debe de tener más de 1 carácter" } })}
              type="text"
              name="latitude"
            />
            <p>{errors.name?.message}</p>
            <label>Longitude</label>
            <input className="w-full text-black"
              id="outlined-basic"
              label="longitude"
              variant="outlined"
              {...register("longitude", { required: true, minLength: { value: 2, message: "Debe de tener más de 1 carácter" } })}
              type="text"
              name="longitude"
            />
            <p>{errors.name?.message}</p>
          </div>
          <div>
            <button type="submit" className="button1 bg-black mx-4 rounded p-3 m-4" >Edit Landing</button>
          </div>
        </fieldset>
      </form> : "Loading..."}
    </div>
  )
}

export default LandingForm