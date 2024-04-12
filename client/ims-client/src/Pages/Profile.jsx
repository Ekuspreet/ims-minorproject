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
import CompletedJobs from '../Components/Profile/CompletedJobs';


const Profile = () => {


  const navigate = useNavigate()
  const [user, setUser] = useState({});
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState('Jobs Dashboard')


  console.log("In Profile")
  
  const toggle = () => { setDrawerOpen(!isDrawerOpen) }


  

  useEffect(()=>{

    async function getUserInfo(){
      const response = await axios.get('/api/user_info')
      console.log(response.data.user_info)
      console.log("IS LOGGED IN :",response.data.user_info.logged_in)
      if(!response.data.user_info.logged_in){
        navigate("/")

      }else{
        setTimeout(()=>{
        setUser({...response.data.user_info.user,
        bid: response.data.user_info.business_id})
        } ,200)
        
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
      <Drawer toggle = {toggle} setTab = {setTab} isDrawerOpen={isDrawerOpen} user={user} >

        <NavbarProfile user={user.name} role={user.role} email = {user.email} emp_id = {user.employee_id}  bid={user.bid} toggler={toggle} logout = {logout}  />

        <div className="main-content flex flex-col md:flex-row justify-between p-10 gap-8 ">


          <div className="section w-full">
            <div className="card w-full bg-base-300 shadow-xl h-fit ">
              <div className="card-body">
                <h2 className='card-title mx-auto'>  {tab} </h2>
              </div>
            </div>
            {tab == 'Jobs Dashboard' && <Activejobs role = {user.role} />}
            {tab == 'Employees' && <Employees role = {user.role} />}
            {tab == 'Inventory Items' && <InventoryItems role = {user.role} />}
            {tab == 'Recipes' && user.role == "admin" && <Recipes />}
            {tab == 'Completion Log' && <CompletedJobs />}
          </div>
        

        </div>
      
      </Drawer>

    </>


  )
}

export default Profile