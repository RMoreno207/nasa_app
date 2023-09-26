import { useParams, Link } from "react-router-dom"; //Para capturar el parametro ID pasado por los parametros del router
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { landingsContext } from "../../../../context/landingsContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Detail() {
  const params = useParams(); // Para poder usar los parametros capturados por el router
  const [search, setSearch] = useState();
  const [searchId] = useState(params.id); //Creo variable de estado local para almacenar la ID
  const { urlApi } = useContext(landingsContext);

  useEffect(() => {
    itemDetails(); //Lanzamos la busqueda
  }, []);

  var icon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2049/2049726.png",
    iconSize: [30, 30],
    iconAnchor: null,
  });
  const map = { width: "100%", height: "50vh" };

  //Obtener los detalles del landing
  const itemDetails = async () => {
    try {
      const { data } = await axios.get(
        `${urlApi}/api/astronomy/landings/?id=${searchId}`
      );
      setSearch(...data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article>
      <div className="list-none max-w-xl m-auto">
        <h1 className=" text-xl">{search ? search.name : "..."}</h1>
        <li>ID: {search ? search.id : "..."}</li>
        <li>Mass: {search ? search.mass : "..."}</li>
        <li>Recclass: {search ? search.recclass : "..."}</li>
        <li>Year: {search ? search.year.slice(0, 4) : "..."}</li>
        <li>Latitude: {search ? search.geolocation.latitude : "..."}</li>
        <li>Longitude: {search ? search.geolocation.longitude : "..."}</li>

        <button
          className="button1 bg-black mx-4 rounded p-3 m-4"
          onClick={() => window.history.back()}
        >
          Volver
        </button>
      </div>
      <div className="max-w-xl mx-4 md:mx-auto text-justify">
        {search ? (
          <MapContainer
            style={map}
            center={[search.geolocation.latitude, search.geolocation.longitude]}
            zoom={1.5}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={[
                search.geolocation.latitude,
                search.geolocation.longitude,
              ]}
              icon={icon}
            >
              <Popup>
                <ul>
                  <li>Name: {search.name}</li>
                  <li>ID: {search.id}</li>
                  <li>Class: {search.recclass}</li>
                  <li>Mass: {search.mass} kg</li>
                  <li>Year: {search.year ? search.year.slice(0, 4) : null}</li>
                  <li>Latitude: {search.reclat}</li>
                  <li>Longitude: {search.reclong}</li>
                </ul>
              </Popup>
            </Marker>
          </MapContainer>
        ) : null}
      </div>
    </article>
  );
}

export default Detail;
