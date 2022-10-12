import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react';
import { landingsContext } from '../../../context/landingsContext';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useForm } from 'react-hook-form';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { map } from 'leaflet';
import { Link } from 'react-router-dom';


function Landing() {
  const { landings } = useContext(landingsContext);//Almacenar fetch de all landings
  const { setFilter } = useContext(landingsContext);
  const { register, setValue, reset, handleSubmit, watch, formState, formState: { errors, isSubmitSuccessful } } = useForm();
  const byMass = useRef();//useRef se usa como getElementById
  const byClass = useRef();//useRef se usa como getElementById


  //Borrar filtros
  const handleDeleteFilters = () => {
    setFilter("");
  }

  //Filter mass
  const handleMass = (e) => {
    e.preventDefault();
    console.log(e);
    const parameter = byMass.current.value;
    setFilter(`mass/${parameter}`);
  }

  //Filter class
  const handleClass = (e) => {
    e.preventDefault();
    const parameter = byClass.current.value;
    setFilter(`class/${parameter}`);
  }

  var icon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2049/2049726.png',
    iconSize: [30, 30],
    iconAnchor: null
  });
  const map = { "width": "100%", "height": "50vh" };

  return (<>
    <div>
      <h1>Meteorite Landings</h1>
      <p>
        This comprehensive data set from The Meteoritical Society contains information on all of the known meteorite landings. The Fusion Table is collected by Javier de la Torre and we've also provided an XLS file that consists of 34,513 meteorites and includes the following fields:
      </p><p>
        place type_of_meteorite mass_g fell_found year database coordinate_1 coordinates_2 cartodb_id created_at updated_at year_date longitude latitude geojson**5/14/13
      </p><p>
        Please find an updated data set from The Meteoritical Society that includes more recent meteorites. Under NameType, 'valid' is for most meteorites and 'relict' are for objects that were once meteorites but are now highly altered by weathering on Earth.
      </p>

    </div>
    <div>
      <h2>Filters</h2>
      <form >

        <div >
          <button className="button1" onClick={handleDeleteFilters}>Delete filters</button>
        </div>
        <div >
          <label htmlFor="searchMass">Search landing by mass</label>
          <input type="text" name="byMass" ref={byMass} placeholder="landing mass" />
          <button className="button1" type='submit' onClick={handleMass}>Search landing</button>
        </div>
        <div >
          <label htmlFor="searchClass">Search landing by class</label>
          <input type="text" name="byClass" ref={byClass} placeholder="landing class" />
          <button className="button1" onClick={handleClass} > Search landing</button>
        </div>
      </form>
    </div >
    <div>
      <MapContainer style={map} center={[51.505, -0.09]} zoom={1} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {landings.map((data, i) => data.geolocation && data.reclat && data.reclong ? (
          <Marker
            key={i}
            position={[data.geolocation.latitude, data.geolocation.longitude]}
            icon={icon}>
            <Popup>Detalles:
              <ul>
                <li>Nombre: {data.name}</li>
                <li>ID: {data.id}</li>
                <li>Clase: {data.recclass}</li>
                <li>Masa: {data.mass} kg</li>
                <li>Fecha: {data.year}</li>
                <li>Latitud: {data.reclat}</li>
                <li>Longitud: {data.reclong}</li>
              </ul>
            </Popup>
          </Marker>
        ) : null)}
      </MapContainer>
    </div>
  </>)
}
export default Landing



