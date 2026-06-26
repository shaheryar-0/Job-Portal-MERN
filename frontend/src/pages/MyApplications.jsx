import React, { useEffect, useState } from "react";
import API from "../api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const appRes = await API.get("/apply", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const jobRes = await API.get("/jobs");

    setApplications(appRes.data || []);
    setJobs(jobRes.data || []);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

    fetchData();
  }, []);

  // MATCH JOB FROM DB
  const getJobDetails = (jobId) => {
    return jobs.find((job) => String(job._id) === String(jobId));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-slate-900">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
        My Applications
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500">No applications yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => {
            const job = getJobDetails(app.jobId);

            return (
              <div
                key={app._id}
                className="p-5 rounded-lg shadow bg-white dark:bg-slate-700"
              >
                <h2 className="font-bold text-lg text-black dark:text-white">
                  {job?.title || "Job not found"}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {job?.company || "Company not found"}
                </p>

                <p className="text-sm mt-2 text-gray-600 dark:text-gray-200">
                  {job?.location || "Location not found"}
                </p>

                <p className="text-sm mt-2 text-green-600 font-semibold">
                  Salary: {job?.salary || "N/A"}
                </p>

                <div className="mt-3 text-sm text-green-500 font-medium">
                  Status: Applied ✓
                </div>

                {!job && (
                  <p className="text-red-400 text-xs mt-2">
                    Job data missing
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyApplications;