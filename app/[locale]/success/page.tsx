function page() {
  const handleContactSupport = () => {
    console.log();
  };
  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold mb-4 text-green-500">
          Booking Confirmed!
        </h2>
        <p className="text-lg mb-4">
          Thank you for booking with us. We have received your request and will
          process it shortly.
        </p>
        <p className="text-lg mb-4">
          A summary of your booking has been sent to your email. Please check
          your inbox for the details.
        </p>
        <p className="text-lg mb-4">
          If you need any further assistance, feel free to contact us.
        </p>
        <button
          // onClick={handleContactSupport}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}

export default page;
