import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const SubscriptionPage = () => {
  const [subscriptionPeriod, setSubscriptionPeriod] = useState("");
  const navigate = useNavigate();

  // Subscription options
  const subscriptionOptions = [
    { value: 1, label: "1 Minute", price: 5 },
    { value: 5, label: "5 Days", price: 50 },
    { value: 10, label: "10 Days", price: 100 },
  ];

  const handleSubscription = () => {
    if (!subscriptionPeriod) {
      alert("Please select a subscription period.");
      return;
    }
    // Navigate to payment page with subscription period
    navigate("/payment", { state: { subscriptionPeriod } });
  };
  // console.log(subscriptionPeriod);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <Helmet>
        <title>Subscriptions</title>
      </Helmet>
      {/* Banner */}
      <div className="banner bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-lg mb-6 shadow-lg">
        <h1 className="text-4xl font-bold">Upgrade to Premium</h1>
        <p className="text-lg mt-2">
          Unlock exclusive features with our premium subscription!
        </p>
      </div>

      {/* Subscription Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Choose Subscription Plan</h2>

        {/* Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="subscription-period"
            className="block mb-2 text-lg font-medium"
          >
            Select Period:
          </label>
          <select
            id="subscription-period"
            value={subscriptionPeriod}
            onChange={(e) => setSubscriptionPeriod(e.target.value)}
            className="p-2 rounded border w-full"
          >
            <option value="" disabled>
              -- Select Subscription Period --
            </option>
            {subscriptionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} - ${option.price}
              </option>
            ))}
          </select>
        </div>

        {/* Subscription Button */}
        <button
          onClick={handleSubscription}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all w-full"
        >
          Take Subscription
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPage;
