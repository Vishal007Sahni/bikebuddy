import React, { useState } from "react";

export default function CarbonCalculator() {
  const [formData, setFormData] = useState({
    vehicleType: "Bike",
    model: "",
    vehicleAge: "",
    fuelType: "Petrol",
    mileage: "",
    distance: "",
    passengers: 1,
  });

  const [result, setResult] = useState(null);

  const fuelEmissionFactors = {
    Petrol: 2.3,
    Diesel: 2.7,
    CNG: 2.0,
    Electric: 0.0,
  };

  const avgPublicTransportEmissionPerKm = 1;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fuelType, mileage, distance, passengers } = formData;

    const emissionFactor = fuelEmissionFactors[fuelType];
    const effectiveMileage = parseFloat(mileage);
    const tripDistance = parseFloat(distance);
    const totalPassengers = parseInt(passengers);

    const totalFuelUsed = tripDistance / effectiveMileage;
    const totalEmission = totalFuelUsed * emissionFactor;
    const emissionPerPerson = totalEmission / totalPassengers;

    setResult({
      totalEmission: totalEmission.toFixed(2),
      emissionPerPerson: emissionPerPerson.toFixed(2),
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Carbon Footprint Calculator</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Bike">Bike</option>
          <option value="Car">Car</option>
          <option value="Scooter">Scooter</option>
        </select>

        <input
          type="text"
          name="model"
          placeholder="Vehicle Model"
          value={formData.model}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="vehicleAge"
          placeholder="Vehicle Age (Years)"
          value={formData.vehicleAge}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="CNG">CNG</option>
          <option value="Electric">Electric</option>
        </select>

        <input
          type="number"
          name="mileage"
          placeholder="Mileage (km/l)"
          value={formData.mileage}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="distance"
          placeholder="Trip Distance (km)"
          value={formData.distance}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="passengers"
          placeholder="Total Passengers"
          value={formData.passengers}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Calculate Emissions
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p>
            <strong>Total Emission:</strong> {result.totalEmission} g CO₂
          </p>
          <p>
            <strong>Emission Per Person:</strong> {result.emissionPerPerson} g
            CO₂
          </p>
        </div>
      )}
    </div>
  );
}
