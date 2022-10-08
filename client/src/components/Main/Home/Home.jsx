import React, { useEffect, useState } from "react";
import { landingsContext } from "../../../context/landingsContext";
import axios from 'axios';
import './Home.css'
import { useContext } from "react";


function Home() {
  const [apod, setApod] = useState(""); //Almacenar la url del APOD
  const { filter, setFilter } = useContext(landingsContext);
  const url = "https://api.nasa.gov/planetary/apod?api_key=";
  const apiKey = process.env.REACT_APP_API_KEY


  const getApod = async () => {
    try {
      const { data } = await axios.get(url + apiKey);//fetch a API NASA para obtener el APOD
      const dataFilter = {
        url: data.hdurl,
        title: data.title
      }
      setApod(dataFilter);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setFilter("");
    getApod()//Lanzamos la busqueda
  }, []);
  return (
    <div>
      <h1>This is the APOD</h1>
      <h2> {apod.title}</h2>

      <img src={apod.url} alt="APOD" />
      <h4>From</h4>
      <h1>NASA</h1>
    </div>
  )
}

export default Home