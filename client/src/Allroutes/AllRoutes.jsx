import React from 'react'
import Header from '../Component/Header'
import UploadsVideo from '../Component/UploadsVideo'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetallVideo from '../Component/GetallVideo';

const AllRoutes = () => {
  return (
    <>
         {/* <Header/> */}
        

         <BrowserRouter> <Header/>
      <Routes>
    
        {/* <Route path="/" element={<Header />}/>  */}
          {/* <Route index element={<Home />} /> */}
          <Route path="UploadsVideo" element={<UploadsVideo />} />
          <Route path="getvideo" element={<GetallVideo/>} />
          {/* <Route path="*" element={<NoPage />} /> */}
        
      </Routes>
    </BrowserRouter>
    </>
 
  )
}

export default AllRoutes