import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyPayment = () => {
  // function to verify payment
  const PaymentVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const reference = searchParams.get("reference");

      if (reference) {
        const verifyPayments = async () => {
          try {
            const verificationResponse = await apiClient.get(
              `/billings?reference=${reference}`
            );

            if (verificationResponse.data.status === "success") {
              navigate("/order-confirmation");
            } else {
              navigate("/payment-failed");
            }
          } catch (error) {
            navigate("/payment-failed");
          }
        };

        verifyPayments();
      }
    }, [location, navigate]);
    // Optional: Show a loading state while verifying
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Verifying your transaction...</p>
      </div>
    );
  };
  return (
    <div>
      <h1>Payment Verifcation Page</h1>
    </div>
  );
};

export default VerifyPayment;
