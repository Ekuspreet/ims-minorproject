import { React, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom';
import NavbarProfile from '../Components/Navbar/NavbarProfile'
import Alertbox from '../Components/Alerts/Alertbox';

import Activejobs from '../Components/Profile/Activejobs';
import Employees from '../Components/Profile/Employees';
import InventoryItems from '../Components/Profile/InventoryItems';
import Recipes from '../Components/Profile/Recipes';
import Drawer from '../Components/Profile/Drawer';
import axios from 'axios';



const Profile = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState('Activejobs')
  const toggle = () => { setDrawerOpen(!isDrawerOpen) }
  const { username,bid} = location.state
  // console.log(location)
  async function logout(){
    // const response = await axios.post("/api/user/signup", signUpData);
    navigate('/')
  }
  return (


    <>
      <Drawer toggle = {toggle} setTab = {setTab} isDrawerOpen={isDrawerOpen} >

        <NavbarProfile toggler={toggle} user = {username} bid = {bid} logout = {logout} />

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