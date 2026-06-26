import React, { useEffect, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import API from "../../api";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [activeJobId, setActiveJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  // FETCH JOBS
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data || []);
      } catch (err) {
        console.log("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // APPLY JOB
  const handleApply = async (jobId) => {
    if (applying) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setActiveJobId(jobId);
        setMessage("⚠ Please login first");
        setTimeout(() => setMessage(""), 3000);
        return;
      }

      setApplying(true);

      await API.post(
        "/apply",
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setActiveJobId(jobId);
      setMessage("✅ Applied successfully!");
      setTimeout(() => setMessage(""), 3000);

    } catch (err) {
      setActiveJobId(jobId);
      setMessage(err.response?.data?.message || "❌ Error applying job");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading jobs...
      </div>
    );
  }

  return (
    <section id="jobs">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10 px-6">

        {jobs.map((job) => (
          <div
            key={job._id}
            className="
              flex flex-col justify-between
              h-[320px]
              w-full
              bg-white dark:bg-slate-700
              rounded-xl
              shadow-md
              hover:shadow-xl
              transition-all
              p-4
            "
          >

            {/* TOP */}
            <div>
              <h2 className="font-bold text-lg dark:text-white">
                {job.title}
              </h2>

              <p className="text-gray-500 dark:text-gray-300 text-sm">
                {job.location}
              </p>

              <p className="text-sm mt-3 text-gray-600 dark:text-gray-200">
                {job.description}
              </p>

              <div className="flex items-center mt-3">
                <span className="text-sm dark:text-gray-200 font-medium">
                  {job.company}
                </span>
              </div>
            </div>

            {/* TIME */}
            <div className="flex items-center text-xs text-gray-400 mt-2">
              <BiTimeFive className="mr-1" />
              {job.createdAt
                ? new Date(job.createdAt).toLocaleDateString()
                : "Recently"}
            </div>

            {/* MESSAGE */}
            <div className="h-6 mt-2">
              {activeJobId === job._id && message && (
                <p className="text-center text-xs text-green-500">
                  {message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              disabled={applying}
              onClick={() => handleApply(job._id)}
              className="
                w-full
                mt-2
                py-2
                rounded-md
                border
                border-blue-500
                text-blue-600
                dark:text-white
                dark:border-white
                hover:bg-blue-500
                hover:text-white
                transition
                disabled:opacity-50
              "
            >
              {applying ? "Applying..." : "Apply Now"}
            </button>

          </div>
        ))}

      </div>
    </section>
  );
};

export default Jobs;