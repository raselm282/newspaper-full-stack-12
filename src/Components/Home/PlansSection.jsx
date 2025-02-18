import React from "react";
import { useNavigate } from "react-router-dom";

const PlansSection = () => {
  const navigate = useNavigate();

  // ফিচার লিস্ট
  const plans = [
    {
      type: "Free",
      features: [
        "Access to limited articles",
        "Basic support",
        "Ads displayed",
      ],
    },
    {
      type: "Premium",
      features: [
        "Unlimited articles access",
        "Priority support",
        "Ad-free experience",
        "Exclusive content",
      ],
    },
  ];

  const handleSubscribeClick = () => {
    navigate("/subscription");
  };

  return (
    <div className="plans-section">
      <div className="flex items-center gap-x-3">
        <p className="font-bold ml-12 my-12 text-3xl">Our Plans</p>
      </div>
      <div className="flex justify-center gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="p-6 bg-gray-100 shadow-md w-64 text-center dark:bg-gray-800 dark:text-white/60"
          >
            <h3 className="text-xl font-semibold mb-4">{plan.type} Plan</h3>
            <ul className="mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="mb-2 text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={handleSubscribeClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansSection;
