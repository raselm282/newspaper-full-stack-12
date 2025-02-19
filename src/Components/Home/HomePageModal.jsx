import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePageModal = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000); // Show modal after 10 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  const handleSubscriptionClick = () => {
    navigate("/subscription"); // Navigate to subscription page
  };

  return (
    <div>
      

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Subscribe Now!</h2>
            <p className="text-gray-600 mb-6">
              Don't miss out on our exclusive content. Subscribe today!
            </p>
            <button
              onClick={handleSubscriptionClick}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-400 transition"
            >
              Go to Subscription Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageModal;
