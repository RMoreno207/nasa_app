import React from 'react'
import { useRef, useContext, useState } from 'react';
import { landingsContext } from '../../../context/landingsContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';


function Landing() {
  const { landings } = useContext(landingsContext);//Almacenar fetch de all landings
  const { setFilter } = useContext(landingsContext);
  const byMass = useRef();//useRef se usa como getElementById
  const byClass = useRef();//useRef se usa como getElementById
  const [expanded, setExpanded]=useState(false);//Para expandir o contraer el texto de la cabecera

  //Boton expandir texto
  const toggleExpansion=()=>{
    setExpanded(!expanded);
  }

  //Texto cabecera
  const text=
  `This comprehensive data set from The Meteoritical Society contains information on all of the known meteorite landings. The Fusion Table is collected by Javier de la Torre and we've also provided an XLS file that consists of 34,513 meteorites and includes the following fields:

  place type_of_meteorite mass_g fell_found year database coordinate_1 coordinates_2 cartodb_id created_at updated_at year_date longitude latitude geojson**5/14/13

  Please find an updated data set from The Meteoritical Society that includes more recent meteorites. Under NameType, 'valid' is for most meteorites and 'relict' are for objects that were once meteorites but are now highly altered by weathering on Earth.
`;

  //Borrar filtros
  const handleDeleteFilters = () => {
    setFilter("");
  }

  //Filter mass
  const handleMass = () => {
    const parameter = byMass.current.value;
    setFilter(`mass/${parameter}`);
    byMass.current.value="";
  }

  //Filter class
  const handleClass = () => {
    const parameter = byClass.current.value;
    setFilter(`class/${parameter}`);
    byClass.current.value="";
  }

  var icon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2049/2049726.png',
    iconSize: [30, 30],
    iconAnchor: null
  });
  const map = { "width": "100%", "height": "50vh" };

  return (<>
    <div className=' mx-4 '>
      <h1 className=' text-lg text-white font-bold  text-center'>Meteorite Landings</h1>

      <div className='m-auto max-w-xl text-justify'>
        {expanded ? (
          <p>{text}</p>
        ) : (
          <p>{text.slice(0, 100)}...</p> // Display the first 100 characters and add "..."
        )}
        
        <button  className='m-auto' onClick={toggleExpansion}>
        {expanded ? <b>Show Less</b> : <b>Show All</b>}
      </button>
      </div>
  
      
  
      

    </div>
    <div>
      <h2 className=' text-lg text-white font-bold  text-center'>Filters</h2>
      <div className='mx-4'>
        
      <div className='flex justify-center' >
        <button className="button1 bg-black mx-1 ml-4 rounded p-3 m-4" type='submit' onClick={handleMass}>Search</button>
          <label htmlFor="searchMass" className='mx-2 my-auto'>by mass</label>
          <input className="text-black rounded w-32 my-auto mx-2" type="text" name="byMass" ref={byMass} placeholder="2900" onKeyDown={(e)=>{
            if(e.key=="Enter"){
              handleMass();
            }
          }}/>
        </div>

        <div className='flex justify-center' >
        <button className="button1 bg-black mx-1 ml-4 rounded p-3 m-4"  onClick={handleClass}>Search</button>
          <label htmlFor="searchClass" className='mx-2 my-auto'>by class</label>
          <input className="text-black rounded w-32 my-auto mx-2" type="text" name="byClass" ref={byClass} placeholder="L6" onKeyDown={(e)=>{
            if(e.key=="Enter"){
              handleClass();
            }
          }}/>
        </div>

        <div className='flex justify-center'>
          <button className="button1 bg-black mx-4 rounded p-3 m-4" onClick={handleDeleteFilters}>Delete filters</button>
        </div>
      </div>
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
                <li>Name: <Link to={`/landing/detail/${data.id}`}>{data.name}</Link></li>
                <li>ID: {data.id}</li>
                <li>Class: {data.recclass}</li>
                <li>Mass: {data.mass} kg</li>
                <li>Year: {data.year}</li>
                <li>Latitude: {data.reclat}</li>
                <li>Longitude: {data.reclong}</li>
              </ul>
            </Popup>
          </Marker>
        ) : null)}
      </MapContainer>
    </div>
  </>)
}
export default Landing
