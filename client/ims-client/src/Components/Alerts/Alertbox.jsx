import React, { useState } from 'react'
import Alert from './Alert'
const Alertbox = () => {
const [alerts, setAlerts] = useState([
  "Alert1","Alert2","Alert3","Alert1","Alert2","Alert3","Alert1","Alert2","Alert3"
])

  return (
    <>
    <div className=' bg-error h-[35em] md:w-[25em] rounded-lg px-3 overflow-y-scroll'>

        <div className=" text-center font-bold text-2xl py-2 text-slate-800 sticky top-0 bg-error"> AlertBox </div>
        { alerts.length != 0 ? (<div className="">
        { alerts.map(alert=>(
          <div className='my-1'>
        <Alert message={alert} />
        </div>
        ))}
        </div>):(
           <div className='text-base-200 font-semibold text-center'>No Alerts For Now </div>
        ) }
        
    </div>
    </>
    )
}

export default Alertbox