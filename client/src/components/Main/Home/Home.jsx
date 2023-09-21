import React, { useEffect } from "react";
import { landingsContext } from "../../../context/landingsContext";
import './Home.css'
import { useContext } from "react";
import { useState} from "react";


function Home() {
  const { apod, getApod } = useContext(landingsContext); //Traer la url del APOD
  const [expanded, setExpanded]=useState(false);

  const toggleExpansion=()=>{
    setExpanded(!expanded);
  }

  useEffect(() => {

      getApod();
    
  },[]);

  const text = apod && apod.explanation ? apod.explanation : '';

  return (
    <div className=" text-center relative mx-auto" >
      <h1 className=" text-lg text-white font-bold absolute top-3 left-0 right-0" >This is the APOD</h1>
      <p className=" text-lg text-white font-bold absolute top-10 left-0 right-0" > {apod.title}</p>

      <img src={apod.url} alt="APOD" className=" max-h-screen mx-auto" />
      <h4 className=" right-0 left-0 ">From NASA</h4>


      <div className=" max-w-xl mx-4 md:mx-auto text-justify">
        {
        !expanded 
        ? (
        apod 
        ? (
        <p>{text.slice(0, 100)}...</p>
        ):(
        <p>...</p>
        )
        ):(
        <p>{text}</p>
        )}
      </div>
      <button onClick={toggleExpansion}>
        {expanded ? <b>Show Less</b> : <b>Show All</b>}
      </button>


    </div>
  )
}

export default Home