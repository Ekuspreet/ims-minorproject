import { React, useState } from 'react'
import NavbarProfile from '../Components/Navbar/NavbarProfile'
import Alertbox from '../Components/Alerts/Alertbox';

import Activejobs from '../Components/Profile/Activejobs';
import Employees from '../Components/Profile/Employees';
import InventoryItems from '../Components/Profile/InventoryItems';
import Recipes from '../Components/Profile/Recipes';



const Profile = () => {


  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState('Activejobs')
  const toggle = () => { setDrawerOpen(!isDrawerOpen) }

  return (


    <>

      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} />
        <div className="drawer-content">

          <NavbarProfile toggler={toggle} />

          <div className="main-content flex justify-between p-10 gap-8 ">


            <div className="section w-full">
              <div className="card w-full bg-base-300 shadow-xl h-fit ">
              <div className="card-body">
              <h2 className='card-title mx-auto'>  {tab} </h2>
               </div></div>
              {tab == 'Activejobs' && <Activejobs />}
              {tab == 'Employees' && <Employees />}
              {tab == 'InventoryItems' && <InventoryItems />}
              {tab == 'Recipes' && <Recipes />}
            </div>
            <Alertbox />

          </div>


        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-screen sm:w-80  min-h-full bg-base-200 text-base-content gap-3">


            <button tabIndex={0} onClick={toggle} className="btn btn-ghost drawer-button ">

              <span class="material-symbols-outlined text-red-500">
                close
              </span>
            </button>

            {/* Sidebar content here */}
            <li><a onClick={() => { setTab("Activejobs"); toggle() }}>Active Jobs</a></li>
            <li><a onClick={() => { setTab("InventoryItems"); toggle() }} >Inventory Items</a></li>
            <li><a onClick={() => { setTab("Recipes"); toggle() }}>Recipes</a></li>
            <li><a onClick={() => { setTab("Employees"); toggle() }}>Employees</a></li>
            <button className='btn btn-primary btn-outline text-md'> Create A New Job </button>

          </ul>
        </div>
      </div>
    </>


  )
}

export default Profile