const steps = [
  "Select Provider",
  "Select Date",
  "Select Slot",
  "Confirm Booking",
];

const BookingStepper = ({ currentStep }) => {
  return (
    <div className="flex justify-between mb-12">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 text-center">
          <div
            className={`mx-auto w-10 h-10 flex items-center justify-center rounded-full font-bold
              ${
                currentStep >= index
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
          >
            {index + 1}
          </div>
          <p
            className={`mt-2 text-sm ${
              currentStep >= index
                ? "text-blue-600 font-semibold"
                : "text-gray-400"
            }`}
          >
            {step}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BookingStepper;