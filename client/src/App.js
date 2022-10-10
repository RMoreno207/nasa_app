import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { landingsContext } from './context/landingsContext';
import axios from 'axios';


function App() {
  const [landings, setLandings] = useState([]);//Almacenar fetch de all landings
  const [filter, setFilter] = useState("");//almacena el parametro para filtrar
  const [apod, setApod] = useState([]);//almacena el apod
  const url = "https://api.nasa.gov/planetary/apod?api_key=";
  const apiKey = process.env.REACT_APP_API_KEY


  useEffect(() => {
    getLandings()
    getApod()
  }, [filter])

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

  const getLandings = async () => {
    try {
      //Hacer fetch al back
      console.log(filter);
      const { data } = await axios.get(`/api/astronomy/landings/${filter}`);
      setLandings(data);
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  const data = {
    landings,
    setLandings,
    filter,
    setFilter,
    apod,
    setApod
  };


  return (
    <div className="App">
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
