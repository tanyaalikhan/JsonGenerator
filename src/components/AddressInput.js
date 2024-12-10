import React from "react";
import InputField from "./InputField";

const AddressInput = ({ address, onChange, index }) => {
  const handleAddressChange = (field, value) => {
    onChange(index, { ...address, [field]: value });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Address {index + 1}</h3>
      <InputField
        label="Street"
        id={`street-${index}`}
        value={address.street}
        onChange={(id, value) => handleAddressChange("street", value)}
      />
      <InputField
        label="City"
        id={`city-${index}`}
        value={address.city}
        onChange={(id, value) => handleAddressChange("city", value)}
      />
      <InputField
        label="Zip"
        id={`zip-${index}`}
        value={address.zip}
        onChange={(id, value) => handleAddressChange("zip", value)}
      />
    </div>
  );
};

export default AddressInput;
