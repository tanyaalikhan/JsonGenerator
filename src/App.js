import React, { useState } from "react";
import FormInput from "./components/FormInput";
import JSONOutput from "./components/JSONOutput";
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from '@mui/material/Alert';



function App() {
  const [json, setJson] = useState(null);

  const handleGenerateJSON = (output) => {
    setJson(output);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>MVP Tool UI</h1>
      <Alert severity="info">This tool is used to generate blah blah blah.</Alert>
      <FormInput onGenerateJSON={handleGenerateJSON} />
      {json && <JSONOutput data={json} />}
    </div>
    
  );
}

export default App;
