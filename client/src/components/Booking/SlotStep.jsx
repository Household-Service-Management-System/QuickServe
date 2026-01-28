const SlotStep = ({ slots, selectedSlot, onSelect }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Select Time Slot</h3>

      <div className="flex flex-wrap gap-4">
        {slots.map((slot, i) => (
          <button
            key={i}
            onClick={() => onSelect(slot)}
            className={`px-6 py-3 rounded-xl border font-semibold
              ${
                selectedSlot?.start === slot.start
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 hover:bg-blue-50"
              }`}
          >
            {slot.start} - {slot.end}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlotStep;