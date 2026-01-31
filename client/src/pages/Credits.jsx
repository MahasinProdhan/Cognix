import React, { useEffect, useState } from "react";
import { dummyPlans } from "../assets/assets";
import Loading from "./Loading";

const Credits = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    setPlans(dummyPlans);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="h-screen px-4 py-12 mx-auto overflow-y-scroll max-w-7xl sm:px-6 lg:px-8">
      <h2 className="mb-10 text-3xl font-semibold text-center text-gray-800 xl:mt-30 dark:text-white">
        Credit Plans
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`border border-gray-200 dark:border-purple-700 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${plan._id === "pro" ? "bg-purple-50 dark:bg-purple-900" : "bg-white dark:bg-transparent"}`}
          >
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                {plan.name}
              </h3>
              <p className="mb-4 text-2xl font-bold text-purple-600 dark:text-purple-300">
                ${plan.price}
                <span className="text-base font-normal text-gray-600 dark:text-purple-200">
                  {" "}
                  / {plan.Credits} Credits
                </span>
              </p>

              <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside dark:text-purple-200">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <button className="py-2 mt-6 font-medium text-white transition-colors bg-purple-600 rounded cursor-pointer hover:bg-purple-700 active:bg-purple-800">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credits;
