import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Topbar from './Topbar';
import Navbar from './Navbar';
import Header from './MidNavbar';


function Index() {
  return (
    
      <>
      <Topbar />
      <Header />
       <Navbar />
      </>
     
  );
}

export default Index;