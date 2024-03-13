import { React, useState } from 'react'
import NavbarProfile from '../Components/Navbar/NavbarProfile'
import Alertbox from '../Components/Alerts/Alertbox';

import Activejobs from '../Components/Profile/Activejobs';
import Employees from '../Components/Profile/Employees';
import InventoryItems from '../Components/Profile/InventoryItems';
import Recipes from '../Components/Profile/Recipes';
import Drawer from '../Components/Profile/Drawer';



const Profile = () => {


  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState('Activejobs')
  const toggle = () => { setDrawerOpen(!isDrawerOpen) }

  return (


    <>
      <Drawer toggle = {toggle} setTab = {setTab} isDrawerOpen={isDrawerOpen} >

        <NavbarProfile toggler={toggle} />

        <div className="main-content flex justify-between p-10 gap-8 ">


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