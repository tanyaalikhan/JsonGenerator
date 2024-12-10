import React, { useState } from "react";

const JSONOutput = ({ data }) => {
  const [filename, setFilename] = useState("generated"); // Default filename

  const downloadJSON = () => {
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.json`; // Use the user-provided filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2>Generated JSON:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div style={{ marginTop: "10px" }}>
        <label>
          Enter Filename:
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
          <span>.json</span>
        </label>
      </div>
      <button onClick={downloadJSON} style={{ marginTop: "10px" }}>
        Download JSON
      </button>
    </div>
  );
};

export default JSONOutput;
