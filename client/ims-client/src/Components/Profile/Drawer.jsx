import React from 'react'
import CreateJob from './CreateJob';

const Drawer = ({children, toggle , setTab,isDrawerOpen, user}) => {
  return (
    <>
    <div className="drawer z-20">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} />
        <div className="drawer-content">
            {
                children
            }
            </div>
        <div className="drawer-side z-20">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-screen sm:w-80  min-h-full bg-base-200 text-base-content gap-3">


            <button tabIndex={0} onClick={toggle} className="btn btn-ghost drawer-button ">

              <span className="material-symbols-outlined text-red-500">
                close
              </span>
            </button>

            {/* Sidebar content here */}
            <li><a onClick={() => { setTab("Jobs Dashboard"); toggle() }}>Jobs Dashboard</a></li>
            <li><a onClick={() => { setTab("Inventory Items"); toggle() }} >Inventory Items</a></li>
            {user.role == "admin" && <li><a onClick={() => { setTab("Recipes"); toggle() }}>Recipes</a></li>}
            <li><a onClick={() => { setTab("Employees"); toggle() }}>Employees</a></li>
            <li><a onClick={() => { setTab("Completion Log"); toggle() }}>Completed Jobs</a></li>
            
          {user.role == "admin" &&  <CreateJob/>}

          </ul>
        </div>
      </div>
            </>
  )
}

export default Drawer