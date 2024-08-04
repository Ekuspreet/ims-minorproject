import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ActiveJobs = ({ role }) => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [fetch, triggerFetch] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      const response = await axios.get(`${import.meta.env.VITE_BASEURL}/job/fetch`);
      if (response.status === 200) {
        setActiveJobs(response.data.active_jobs);
        setPendingJobs(response.data.pending_jobs);
      }
    }
    if (fetch) {
      fetchJobs();
      triggerFetch(false);
    }
  }, [fetch]);

  const handleFinishJob = async (job_id) => {
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/job/finish`, {
      job_id : job_id
    })
    console.log(response);
    if(response.status == "200"){
      triggerFetch(true);
      setActiveJobs([...activeJobs])
    }
    console.log('Finishing job:', job_id);
  };

  const handleCancelJob = async (job_id) => {
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/job/cancel`, {
      job_id : job_id
    })
    console.log(response);
    if(response.status == "200"){
      triggerFetch(true);
      setActiveJobs([...activeJobs])
    }
    console.log('Cancelling job:', job_id);
  };

  const handleStartJob = async (job_id) => {
    const response = await axios.post('/api/job/start', {
      job_id : job_id
    })
    console.log(response);
    if(response.status == "200"){
      triggerFetch(true);
      setActiveJobs([...activeJobs])
    }
    console.log('Starting job:', job_id);
  };

  return (
    <>
      <div className="flex flex-wrap mt-3 gap-6 h-[28.5em] overflow-auto  w-fit justify-center px-6  mx-auto">
        {activeJobs.map((job) => (
          <div key={job.job_id} className="card w-60 bg-base-200 h-60  font-semibold shadow-xl border-t-2 border-success ">
            <div className="card-body">
              <p className='border border-neutral-content rounded-lg w-fit p-1 px-2'>{job.job_id}</p>
              <h2 className=" card-title font-bold text-xl">{job.product}</h2>
              <p>Quantity :  {job.quantity} </p>
              <p>Status :  In Progress </p>
              {role === "employee" && (
                <button
                  className='btn btn-success btn-sm font-bold'
                  onClick={() => handleFinishJob(job.job_id)}
                >
                  Finish Job
                </button>
              )}
            </div>
          </div>
        ))}
        {pendingJobs.map((job) => (
          <div key={job.job_id} className="card w-60 bg-base-200  h-60 font-semibold shadow-xl border-t-2 border-error">
            <div className="card-body flex flex-col">
              <p className='border border-neutral-content rounded-lg w-fit p-1 px-2'>{job.job_id}</p>
              <h2 className="card-title font-bold text-2xl">{job.product}</h2>
              <p className='text-neutral-content opacity-85'>Quantity :  {job.quantity} </p>
              <p className='text-neutral-content opacity-85'>Status :  {job.status} </p>
              {role === "admin" && (
                <button
                  className='btn btn-error btn-sm font-bold'
                  onClick={() => handleCancelJob(job.job_id)}
                >
                  Cancel
                </button>
              )}
              {role === "employee" && (
                <button
                  className='btn btn-success btn-sm font-bold'
                  onClick={() => handleStartJob(job.job_id)}
                >
                  Start Job
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ActiveJobs;
