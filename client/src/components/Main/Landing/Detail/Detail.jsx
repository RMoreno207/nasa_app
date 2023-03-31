import { useParams, Link } from "react-router-dom";//Para capturar el parametro ID pasado por los parametros del router
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


function Detail() {
  const params = useParams();// Para poder usar los parametros capturados por el router
  const [search, setSearch] = useState();
  const [searchId] = useState(params.id);//Creo variable de estado local para almacenar la ID


  useEffect(() => {
    itemDetails()//Lanzamos la busqueda
  }, []
  );

  var icon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2049/2049726.png',
    iconSize: [30, 30],
    iconAnchor: null
  });
  const map = { "width": "100%", "height": "50vh" };

  //Obtener los detalles del landing
  const itemDetails = async () => {
    try {
      const { data } = await axios.get(`https://nasa-app-one.vercel.app/api/astronomy/landings/?id=${searchId}`);
      setSearch(...data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article className="list-none mx-4">
      <h1 className=" text-xl">{search ? search.name : "..."}</h1>
      <li>ID: {search ? search.id : "..."}</li>
      <li>Mass: {search ? search.mass : "..."}</li>
      <li>Recclass: {search ? search.recclass : "..."}</li>
      <li>Reclat: {search ? search.reclat : "..."}</li>
      <li>Reclong: {search ? search.reclong : "..."}</li>
      <li>Date: {search ? search.year : "..."}</li>
      <li>Longitude: {search ? search.geolocation.longitude : "..."}</li>
      <li>Latitude: {search ? search.geolocation.latitude : "..."}</li>

      <Link to={'/landing/list'}><button className="button1 bg-black border-2 mx-4 rounded-xl p-1">Volver</button></Link>
      <div>
        <MapContainer style={map} center={[51.505, -0.09]} zoom={1} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {search ?
            <Marker
              position={[search.geolocation.latitude, search.geolocation.longitude]}
              icon={icon}>
              <Popup>Detalles:
                <ul>
                  <li>Nombre: {search.name}</li>
                  <li>ID: {search.id}</li>
                  <li>Clase: {search.recclass}</li>
                  <li>Masa: {search.mass} kg</li>
                  <li>Fecha: {search.year}</li>
                  <li>Latitud: {search.reclat}</li>
                  <li>Longitud: {search.reclong}</li>
                </ul>
              </Popup>
            </Marker>
            : null}
        </MapContainer>
      </div>
    </article>
  )
}


export default Detail