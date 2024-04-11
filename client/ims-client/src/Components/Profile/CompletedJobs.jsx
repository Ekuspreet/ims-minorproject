import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompletedJobs = () => {
  const [completedJobs, setCompletedJobs] = useState([]);
  const [fetch, triggerFetch] = useState(true);

  useEffect(() => {
    async function fetchCompletedJobs() {
      const response = await axios.get('/api/job/fetch/finished-jobs');
      console.log(response);
      if (response.status === 200) {
        setCompletedJobs(response.data.finished_jobs);
      }
    }
    if (fetch) {
      fetchCompletedJobs();
      triggerFetch(false);
    }
  }, [fetch]);

  return (
    <div className="overflow-auto h-[29em] mt-3">
      <table className="table text-center text-lg bg-base-200 font-semibold">
        <thead className="sticky top-0 text-md">
          <tr>
            <th className="bg-base-200 rounded-2xl">Job ID</th>
            <th className="bg-base-200 rounded-2xl">Job Name</th>
            <th className="bg-base-200 rounded-2xl">TimeStamp of Completion</th>
          </tr>
        </thead>
        <tbody>
          {completedJobs.map((job) => (
            <tr key={job.job_id}>
              <td>{job.job_id}</td>
              <td>{job.product}</td>
              <td>{job.completion_time}</td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedJobs;
