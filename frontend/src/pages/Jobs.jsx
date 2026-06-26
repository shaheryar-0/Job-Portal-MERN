import React from "react";
import Jobs from "../Components/Jobs/Jobs";

const JobsPage = () => {
  return (
    <div className="w-[90%] m-10 py-10">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        Available Jobs
      </h1>

      <Jobs />
    </div>
  );
};

export default JobsPage;