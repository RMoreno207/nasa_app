import React from "react";
import { landingsContext } from "../../../context/landingsContext";
import './Home.css'
import { useContext } from "react";


function Home() {
  const { apod } = useContext(landingsContext); //Traer la url del APOD

  return (
    <div className=" text-center relative " >
      <h1 className=" text-lg text-white font-bold absolute top-3 left-0 right-0" >This is the APOD</h1>
      <p className=" text-lg text-white font-bold absolute top-10 left-0 right-0" > {apod.title}</p>

      <img src={apod.url} alt="APOD" className=" min-w-full" />
      <h4 className="absolute top-48 right-0 left-0 ">From NASA</h4>
      <p className=" mx-10">{apod.explanation}</p>

    </div>
  )
}

export default Home