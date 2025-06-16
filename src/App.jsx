import React, { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Encrypt from './Encrypt';
import Success from './Success'
import { ToastContainer } from 'react-toastify'
function App() {

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />
      <Routes>
        <Route path="/encryptMessage" element={<Encrypt />} />
        <Route path="/success" element={<Success />} />

      </Routes>
    </div>
  )

}

export default App
