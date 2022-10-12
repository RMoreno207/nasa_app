import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import LandingsList from './Landing/LandingList/LandingList';
import Landing from './Landing/Landing';
import LandingForm from "./Landing/LandingForm/LandingForm";
import Detail from "./Landing/Detail/Detail";


function Main() {
  return <main className="main">
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Landing />} path="/landing" />
      <Route element={<LandingsList />} path="/landing/list" />
      <Route element={<LandingForm />} path="/landing/form/:id" />
      <Route element={<Detail />} path="/landing/detail/:id" />
    </Routes>
  </main>;
}

export default Main