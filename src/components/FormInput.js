import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const FormWithTwoDynamicInputs = () => {
  const [selectedTown, setSelectedTown] = useState("");
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [fields1, setFields1] = useState([]);
  const [fields2, setFields2] = useState([]);
  const [generatedJSON, setGeneratedJSON] = useState(null);
  const [fileName, setFileName] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const townLimits = {
    "Santa Clara": { number1: 100, number2: 50 },
    Sunnyvale: { number1: 200, number2: 75 },
  };

  const limits = selectedTown ? townLimits[selectedTown] : {};

  const handleNumber1Change = (e) => {
    const value = e.target.value;

    if (!isNaN(value) && (!limits.number1 || value <= limits.number1)) {
      setNumber1(value);

      const num = parseInt(value, 10) || 0;
      const newFields1 = Array.from({ length: num }, (_, i) => fields1[i] || "");
      setFields1(newFields1);
    }
  };

  const handleNumber2Change = (e) => {
    const value = e.target.value;

    if (!isNaN(value) && (!limits.number2 || value <= limits.number2)) {
      setNumber2(value);

      const num = parseInt(value, 10) || 0;
      const newFields2 = Array.from({ length: num }, (_, i) => fields2[i] || "");
      setFields2(newFields2);
    }
  };

  const handleField1Change = (index, value) => {
    setFields1((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = value;
      return updatedFields;
    });
  };

  const handleField2Change = (index, value) => {
    setFields2((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = value;
      return updatedFields;
    });
  };

  const handleGenerateJSON = (e) => {
    e.preventDefault();

    const json = {
      town: selectedTown,
      heads: fields1.map((field, index) => ({
        hid: index,
        value: field,
      })),
      windows: fields2.map((field, index) => ({
        wid: index,
        value: field,
      })),
    };
    setGeneratedJSON(json);
  };

  const handleDownloadJSON = () => {
    if (generatedJSON) {
      const blob = new Blob([JSON.stringify(generatedJSON, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "sample.json";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <form onSubmit={handleGenerateJSON}>
        <label style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ marginRight: "10px" }}>Select Town:</span>
          <select
            value={selectedTown}
            onChange={(e) => {
              setSelectedTown(e.target.value);
              setNumber1("");
              setNumber2("");
              setFields1([]);
              setFields2([]);
              setGeneratedJSON(null);
            }}
            style={{ marginLeft: "10px" }}
          >
            <option value="">-- Select Town --</option>
            <option value="Santa Clara">Santa Clara</option>
            <option value="Sunnyvale">Sunnyvale</option>
          </select>
        </label>
        <label style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ marginRight: "10px" }}>Enter Number 1:</span>
          <input
            type="text"
            value={number1}
            onChange={handleNumber1Change}
            disabled={!selectedTown}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <label style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ marginRight: "10px" }}>Enter Number 2:</span>
          <input
            type="text"
            value={number2}
            onChange={handleNumber2Change}
            disabled={!selectedTown}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <Box sx={{ borderBottom: 1, borderColor: "divider", marginTop: "20px" }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="fields tabs">
            <Tab label="Fields 1" {...a11yProps(0)} />
            <Tab label="Fields 2" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          {fields1.map((field, index) => (
            <label key={`field1-${index}`} style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px" }}>Field 1-{index + 1}:</span>
              <input
                type="text"
                value={field}
                onChange={(e) => handleField1Change(index, e.target.value)}
                style={{ marginLeft: "10px" }}
              />
            </label>
          ))}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {fields2.map((field, index) => (
            <label key={`field2-${index}`} style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px" }}>Field 2-{index + 1}:</span>
              <input
                type="text"
                value={field}
                onChange={(e) => handleField2Change(index, e.target.value)}
                style={{ marginLeft: "10px" }}
              />
            </label>
          ))}
        </TabPanel>
        <div style={{ display: "flex", marginTop: "20px" }}>
          <button type="submit" style={{ marginRight: "10px" }}>
            Generate JSON
          </button>
          <button
            type="button"
            onClick={handleDownloadJSON}
            disabled={!generatedJSON}
            style={{ marginRight: "10px" }}
          >
            Download JSON
          </button>
          <label>
            <span style={{ marginRight: "10px" }}>File Name:</span>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name"
            />
          </label>
        </div>
      </form>
      {generatedJSON && (
        <div style={{ marginTop: "20px" }}>
          <h3>Generated JSON:</h3>
          <pre>{JSON.stringify(generatedJSON, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FormWithTwoDynamicInputs;
