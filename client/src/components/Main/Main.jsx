import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import LandingsList from './Landing/LandingList/LandingList';
import Landing from './Landing/Landing';


function Main() {
  return <main className="main">
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Landing />} path="/landing" />
      <Route element={<LandingsList />} path="/landing/list" />
    </Routes>
  </main>;
}

export default Main