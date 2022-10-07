import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import axios from "axios";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { map } from 'leaflet';
import { Link } from 'react-router-dom';



function Landing() {
  var icon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2049/2049726.png',
    iconSize: [30, 30],
    iconAnchor: null
  });
  const map = { "width": "100%", "height": "50vh" };

  useEffect(() => {
    getLandings()
  }, [])

  const getLandings = async () => {
    try {
      //Hacer fetch al back
      const { data } = await axios.get(``);
      const newLanding = {
        name: data.name,
        id: data.id,
        nametype: data.nametype,
        recclass: data.recclass,
        mass: data.mass,
        fall: data.fall,
        year: data.year,
        reclat: data.reclat,
        relong: data.relong,
        geolocation: data.geolocation,
      }

    } catch (error) {
      console.log(error)
    }

  }

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
          <label htmlFor="searchMass">Search landing by mass</label>
          <input type="text" name="searchMass" placeholder="landing mass" />
          <button className="button1">Search landing</button>
        </div>
        <div >
          <label htmlFor="searchClass">Search landing by class</label>
          <input type="text" name="searchClass" placeholder="landing class" />
          <button className="button1">Search landing</button>
        </div>
      </form>
    </div>
    <div>
      <MapContainer style={map} center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.775, 6.08333]} icon={icon} >
          <Popup>
            "name": "Aachen",
            "id": "1",
            "nametype": "Valid",
            "recclass": "L5",
            "mass": "21",
            "fall": "Fell",          </Popup>
        </Marker>


        {/* Borrar y meter map del fetch del back */}

        <Marker position={[56.18333, 10.23333]} icon={icon} >
          <Popup>
            "name": "Aachen",
            "id": "1",
            "nametype": "Valid",
            "recclass": "L5",
            "mass": "21",
            "fall": "Fell",          </Popup>
        </Marker>
      </MapContainer>
      {/* Borrar y meter map del fetch del back */}

    </div>
    <div>
      <Link to={"/landing/list"}>
        <button>Crear un landing</button>
      </Link>
    </div>
  </>)
}
export default Landing



