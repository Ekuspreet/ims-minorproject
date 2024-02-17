import{ React,useState }from 'react'
import NavbarProfile from '../Components/Navbar/NavbarProfile'




const Profile = () => {
  
  
const [isDrawerOpen, setDrawerOpen] = useState(false);
const toggle = () => { setDrawerOpen(!isDrawerOpen) }

  return (


<>

      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} />
        <div className="drawer-content">

          <NavbarProfile  toggler = {toggle} />

        <div className="hero-content">
          <div className="alerts bg-red-300 h-96 w-40">
          </div>          
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
            <li><a>Current Jobs</a></li>
            <li><a>Inventory Items</a></li>
            <li><a>Recipes</a></li>
            <li><a>Employees</a></li>
            <button className='btn btn-primary btn-outline text-md'> Create A New Job </button>

          </ul>
        </div>
        </div>
        </>


      )
}

export default Profile