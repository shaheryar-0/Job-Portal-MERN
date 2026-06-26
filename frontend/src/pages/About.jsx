import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">

   

      {/* About Section */}
      <div className="w-[90%] mx-auto py-16">

        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
          About Job Portal
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
          Welcome to our Job Portal — a platform designed to connect job seekers
          with top companies. Our goal is to simplify the job search process
          and help you find your dream job faster and easier.
        </p>

        {/* About Cards Section */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-6 bg-gray-100 dark:bg-slate-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              For Job Seekers
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Browse thousands of jobs, apply easily, and track your applications
              all in one place.
            </p>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-slate-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              For Employers
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Post jobs, find qualified candidates, and manage applications
              efficiently.
            </p>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-slate-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              To make hiring simple, fast, and accessible for everyone.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;