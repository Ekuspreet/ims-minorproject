import React from 'react'

const Drawer = ({children, toggle , setTab,isDrawerOpen}) => {
  return (
    <>
    <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} />
        <div className="drawer-content">
            {
                children
            }
            </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-screen sm:w-80  min-h-full bg-base-200 text-base-content gap-3">


            <button tabIndex={0} onClick={toggle} className="btn btn-ghost drawer-button ">

              <span className="material-symbols-outlined text-red-500">
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

export default Drawer