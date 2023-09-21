import React from "react";
import { useState, useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { landingsContext } from "./context/landingsContext";
import axios from "axios";

function App() {
  const [landings, setLandings] = useState([]); //Almacenar fetch de all landings
  const [items, setItems] = useState([]); //Almacenar all landings para paginar
  const [filter, setFilter] = useState(""); //almacena el parametro para filtrar
  const [apod, setApod] = useState([]); //almacena el apod

  const url = "https://api.nasa.gov/planetary/apod?api_key="; //URL del fetch para obtener el APOD
  const apiKey = process.env.REACT_APP_API_KEY;
  const urlApi = "https://nasa-app-api-seven.vercel.app";

  useEffect(() => {
    getApod();
  });

  useEffect(() => {
    getLandings();
  }, [filter]);

  //Obtener el APOD
  const getApod = async () => {
    if (!apod) {
      try {
        const { data } = await axios.get(url + apiKey); //fetch a API NASA para obtener el APOD
        const dataFilter = {
          url: data.hdurl,
          title: data.title,
          explanation: data.explanation,
        };
        setApod(dataFilter);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Obtener todas las Landings
  const getLandings = async () => {
    try {
      const { data } = await axios.get(
        `${urlApi}/api/astronomy/landings/${filter}`
      );
      setLandings(data);
      setItems(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    landings,
    setLandings,
    items,
    setItems,
    filter,
    setFilter,
    apod,
    setApod,
    getLandings,
  };

  return (
    <div className="App min-h-screen bg-black text-white">
      <landingsContext.Provider value={data}>
        <BrowserRouter>
          <Header />
          <Main />
          <Footer />
        </BrowserRouter>
      </landingsContext.Provider>
    </div>
  );
}

export default App;
