import React from 'react'
0
const Activejobs = () => {
  const active = [
    {
      title: 'Making Gold',
      batchsize: '25kg',
      deadline: '11/12/14'
    },
    {
      title: 'Testing Product',
      batchsize: '10kg',
      deadline: '02/03/24'
    },
    {
      title: 'Quality Check',
      batchsize: '5kg',
      deadline: '05/06/24'
    },
    {
      title: 'Shipping',
      batchsize: '30kg',
      deadline: '08/09/24'
    },
    {
      title: 'Packaging',
      batchsize: '15kg',
      deadline: '10/11/24'
    },
    {
      title: 'Assembling',
      batchsize: '20kg',
      deadline: '12/13/24'
    },
    {
      title: 'Inspecting',
      batchsize: '10kg',
      deadline: '14/15/24'
    }
  ];
  
  return (
    <>

      <div className="flex flex-wrap mt-3 gap-4  w-full  justify-evenly mx-auto">

        {
          active.map((job)=>(
<div className="card w-64 bg-slate-200 text-base-300 font-semibold shadow-xl">
            <div className="card-body">
              <h2 className="card-title font-bold">{job.title}</h2>
              <p>Batch :  {job.batchsize} </p>
              <p>Deadline :  {job.deadline} </p>
              {/* <p>Ordered By : Dilraj Client Ltd.  </p> */}
              <div className="card-actions justify-end">
              </div>
            </div>
          </div>

          ))
          
        }
      </div>
    </>
  )
}

export default Activejobs