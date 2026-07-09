import React from 'react';
import Header from './fragments/Header';
import Navbar from './fragments/Navbar';
import CardSection from './fragments/CardSection';
import Chisiamo from './fragments/Chisiamo';
import Personalizza from './fragments/Personalizza';
import './App.css'


function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Chisiamo />
      <CardSection />
      <Personalizza />
    </>
  );
}

export default App;
