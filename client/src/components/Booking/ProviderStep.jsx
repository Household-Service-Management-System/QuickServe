const ProviderStep = ({ providers, selectedProvider, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {providers.map((provider) => (
        <div
          key={provider.providerId}
          onClick={() => onSelect(provider.providerId)}
          className={`cursor-pointer bg-white rounded-2xl p-6 shadow transition
            ${
              selectedProvider === provider.providerId
                ? "ring-2 ring-blue-600"
                : "hover:shadow-xl"
            }`}
        >
          <div className="flex items-center gap-5">
            <img
              src={provider.profileImage}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">
                {provider.fullName}
              </h3>
              <p className="text-sm text-gray-500">{provider.city}</p>
              <p className="text-sm mt-1">⭐ 4.7 • 300+ jobs</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProviderStep;