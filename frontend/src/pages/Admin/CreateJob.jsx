import React, { useEffect, useState } from "react";
import API from "../../api";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  // GET JOBS
  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // CREATE JOB
  const createJob = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!form.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!form.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!form.salary.trim()) {
      newErrors.salary = "Salary is required";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await API.post("/jobs/create", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
      });

      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create job");
    }
  };

  // DELETE JOB
  const deleteJob = async (id) => {
    try {
      await API.delete(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-slate-900">
      {/* CREATE JOB */}
      <form
        onSubmit={createJob}
        className="bg-white dark:bg-slate-800 p-4 rounded mb-6"
      >
        <h2 className="text-xl font-bold mb-3 dark:text-white">
          Create Job
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="block w-full mb-2 p-2 border rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mb-2">
            {errors.title}
          </p>
        )}

        <input
          type="text"
          placeholder="Company"
          value={form.company}
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
          className="block w-full mb-2 p-2 border rounded"
        />
        {errors.company && (
          <p className="text-red-500 text-sm mb-2">
            {errors.company}
          </p>
        )}

        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          className="block w-full mb-2 p-2 border rounded"
        />
        {errors.location && (
          <p className="text-red-500 text-sm mb-2">
            {errors.location}
          </p>
        )}

        <input
          type="text"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) =>
            setForm({ ...form, salary: e.target.value })
          }
          className="block w-full mb-2 p-2 border rounded"
        />
        {errors.salary && (
          <p className="text-red-500 text-sm mb-2">
            {errors.salary}
          </p>
        )}

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="block w-full mb-2 p-2 border rounded"
          rows="4"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mb-2">
            {errors.description}
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Job
        </button>
      </form>

      {/* JOB LIST */}
      <div>
        <h2 className="text-xl font-bold mb-3 text-white">
          All Jobs
        </h2>

        {jobs.length === 0 ? (
          <p className="text-gray-300">No jobs found</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-3 mb-3 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{job.title}</h3>

                <p className="text-sm text-gray-600">
                  {job.company}
                </p>

                <p className="text-sm text-gray-600">
                  {job.location}
                </p>

                <p className="text-sm text-green-600 font-semibold">
                  Salary: {job.salary}
                </p>
              </div>

              <button
                onClick={() => deleteJob(job._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminJobs;