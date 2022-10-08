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

  useEffect(() => {
    getLandings()
  }, [])

  const getLandings = async () => {
    try {
      //Hacer fetch al back
      const { data } = await axios.get(`/api/astronomy/landings/`);
      setLandings(data);

    } catch (error) {
      console.log(error)
    }
  }

  const data = {
    landings,
    setLandings
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
