import React from 'react'
import {Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <div className='bg-red-400'>
      App
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="dashboard" element={<Dashboard />} />


    </Routes>
    </div>
   
  )
}

export default App
