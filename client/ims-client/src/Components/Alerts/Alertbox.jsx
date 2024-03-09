import React from 'react'
import Alert from './Alert'

const Alertbox = () => {
  return (
    <>
    <div className=' bg-error h-[30em] w-[30em] rounded-lg px-3'>

        <div className=" text-center font-bold text-2xl py-2 text-slate-800"> AlertBox </div>
        <div className="flex flex-col gap-2">
        <Alert message={"Message alert 1"}/>
        <Alert message={"Message alert 2"}/>
        <Alert message={"Message alert 3"}/>
        <Alert message={"Message alert 4"}/>
        </div>
    </div>
    </>
    )
}

export default Alertbox