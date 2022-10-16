import React from "react";
import { landingsContext } from "../../../context/landingsContext";
import './Home.css'
import { useContext } from "react";


function Home() {
  const { apod } = useContext(landingsContext); //Traer la url del APOD


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