import React from "react";

const InputField = ({ label, id, value, onChange, type = "text" }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label>
        {label}:
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(id, e.target.value)} // Pass the ID and value back
          style={{ marginLeft: "10px" }}
        />
      </label>
    </div>
  );
};

export default InputField;
