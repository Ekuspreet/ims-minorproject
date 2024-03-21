import { React, useState,useContext,useEffect } from 'react'

import { json, useNavigate } from 'react-router-dom';

import NavbarProfile from '../Components/Navbar/NavbarProfile'
import Alertbox from '../Components/Alerts/Alertbox';

import Activejobs from '../Components/Profile/Activejobs';
import Employees from '../Components/Profile/Employees';
import InventoryItems from '../Components/Profile/InventoryItems';
import Recipes from '../Components/Profile/Recipes';
import Drawer from '../Components/Profile/Drawer';
import axios from 'axios';
import { UserContext } from '../App';





const Profile = () => {

  const [user, setUser] = useContext(UserContext)

  const navigate = useNavigate()
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState('Activejobs')
  console.log("In Profile", user)
  
  const toggle = () => { setDrawerOpen(!isDrawerOpen) }


  // console.log(location)
  async function logout(bid){
    const signoutdata = {"business_id": bid}
    const response = await axios.post(`/api/user/signout`,signoutdata);
    console.log(response.data)
    navigate('/')
  }
  return (


    <>
      <Drawer toggle = {toggle} setTab = {setTab} isDrawerOpen={isDrawerOpen} >

        <NavbarProfile toggler={toggle} user = {user.name} bid = {user.bid} logout = {logout} />

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