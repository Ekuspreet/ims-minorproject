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


const Profile = () => {


  const navigate = useNavigate()
  const [user, setUser] = useState({});
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState('Active Jobs')


  console.log("In Profile")
  
  const toggle = () => { setDrawerOpen(!isDrawerOpen) }


  

  useEffect(()=>{

    async function getUserInfo(){
      const response = await axios.get('/api/user_info')
      console.log(response.data.user_info.user)
      console.log("IS LOGGED IN :",response.data.user_info.logged_in)
      if(!response.data.user_info.logged_in){
        navigate("/")

      }else{
        setTimeout(()=>{
        setUser(response.data.user_info.user)
        },500)
        
      }

      
    }
    
    getUserInfo();
    
    },[]
    )




  async function logout(){
    const response = await axios.get(`/api/user/signout`);
    console.log(response)
    navigate("/")
  }


  return (


    <>
      <Drawer toggle = {toggle} setTab = {setTab} isDrawerOpen={isDrawerOpen} >

        <NavbarProfile user={user.name}  toggler={toggle} logout = {logout} bid={user.bid} />

        <div className="main-content flex flex-col md:flex-row justify-between p-10 gap-8 ">


          <div className="section w-full">
            <div className="card w-full bg-base-300 shadow-xl h-fit ">
              <div className="card-body">
                <h2 className='card-title mx-auto'>  {tab} </h2>
              </div>
            </div>
            {tab == 'Active Jobs' && <Activejobs />}
            {tab == 'Employees' && <Employees />}
            {tab == 'Inventory Items' && <InventoryItems />}
            {tab == 'Recipes' && <Recipes />}
          </div>
          <Alertbox />

        </div>
      
      </Drawer>

    </>


  )
}

export default Profile