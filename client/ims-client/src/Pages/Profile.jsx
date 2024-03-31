import { React, useState,useEffect } from 'react'

import {useNavigate } from 'react-router-dom';

import NavbarProfile from '../Components/Navbar/NavbarProfile'
import Alertbox from '../Components/Alerts/Alertbox';

import Activejobs from '../Components/Profile/Activejobs';
import Employees from '../Components/Profile/Employees';
import InventoryItems from '../Components/Profile/InventoryItems';
import Recipes from '../Components/Profile/Recipes';
import Drawer from '../Components/Profile/Drawer';
import axios from 'axios';

import Cookies from 'js-cookie';


const Profile = () => {
  const navigate = useNavigate()

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState('Activejobs')


  console.log("In Profile")
  
  const toggle = () => { setDrawerOpen(!isDrawerOpen) }

  
  useEffect(()=>{

  function getUserInfo(){
    if(!Cookies.get("session")){
      navigate("/")
    }
  }
  
  getUserInfo();
  
  },[]
  )

  async function logout(){
    await axios.post(`/api/user/signout`);
    navigate('/')
  }
  return (


    <>
      <Drawer toggle = {toggle} setTab = {setTab} isDrawerOpen={isDrawerOpen} >

        <NavbarProfile toggler={toggle} logout = {logout} />

        <div className="main-content flex flex-col md:flex-row justify-between p-10 gap-8 ">


          <div className="section w-full">
            <div className="card w-full bg-base-300 shadow-xl h-fit ">
              <div className="card-body">
                <h2 className='card-title mx-auto'>  {tab} </h2>
              </div>
            </div>
            {tab == 'Activejobs' && <Activejobs />}
            {tab == 'Employees' && <Employees />}
            {tab == 'InventoryItems' && <InventoryItems />}
            {tab == 'Recipes' && <Recipes />}
          </div>
          <Alertbox />

        </div>
      
      </Drawer>

    </>


  )
}

export default Profile