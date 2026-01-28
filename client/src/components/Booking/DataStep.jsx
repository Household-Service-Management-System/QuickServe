const DateStep = ({ selectedDate, onChange }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Select Date</h3>
      <input
        type="date"
        min={new Date().toISOString().split("T")[0]}
        value={selectedDate}
        onChange={(e) => onChange(e.target.value)}
        className="border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default DateStep;