import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Header from "./Header";
// import ReactDatePicker from "react-datepicker";
// import NumberFormat from "react-number-format";
import ReactSelect from "react-select";
import options from "./constants/reactSelectOptions";
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Switch,
  RadioGroup,
  FormControlLabel,
  ThemeProvider,
  Radio,
  createMuiTheme,
  Slider
} from "@material-ui/core";
// import MuiAutoComplete from "./MuiAutoComplete";
// import "react-datepicker/dist/react-datepicker.css";
import MultiSelect from "react-multi-select-component";

import "./styles.css";
import ButtonsResult from "./ButtonsResult";
import DonwShift from "./DonwShift";


const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const defaultValues = {
  Native: "",
  TextField: "",
  Select: "",
  ReactSelect: { value: "pe", label: "PE" },
  Checkbox: false,
  switch: false,
  RadioGroup: "",
  numberFormat: 123456789,
  downShift: "apple"
};

const devices = [
  { label: "iPhone7", value: "iphone7" },
  { label: "iPhone8", value: "iphone8" },
  { label: "iPhone8+", value: "iphone8+" },
  { label: "iPhoneX", value: "iphoneX" },
  { label: "iPhoneXR", value: "iphoneXR" },
  { label: "iPhoneXM", value: "iphoneXM" },
  { label: "iPhone11", value: "iphone11" },
];

function App() {
  const { register, handleSubmit, errors, reset, control } = useForm({ defaultValues });
  const [data, setData] = useState(null);

  const submitForm = (data) => {
    setData(data)
    console.log(data)
    data.job_type = data.job_type.value
    fetch('/insert_job', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      document.getElementById("f_error").style.display = "block"
    })
    .catch((error) => {
      console.error('Error:', error);
      let el;
      el = document.getElementById("f_error");
      el.className = "error";
      el.innerText = error
      el.style.display = "block"
    });
      }

  const [selected, setSelected] = useState([]);
  
  return (
    <ThemeProvider theme={theme}>
      <div className="infoboxheader">

      <h1 className="apple">Bidera</h1>
      </div>
      <form onSubmit={handleSubmit(data => submitForm(data))} className="form">
        <Header />
        <div className="container">
        <section className="checkboxes">
          <label>Job Type</label>
          <Controller
            as={ReactSelect}
            options={options}
            name="job_type"
            isClearable
            control={control}
          />
        </section>
        <section>
          <label>Test Repo:</label>
          <input name="test_repo" className="input" ref={register({ required: {value: true, message: "Test Repo is required" }})}/>
          {errors.test_repo && (<div className="error">{errors.test_repo.message}</div>)}
        </section>
        <section>
            <label>Profile ID</label>
            <Controller as={TextField} name="profile_id" control={control} rules={{required: {value: true, message: "Profile ID is required" } }}/>
            {errors.profile_id && (
          <div className="error">{errors.profile_id.message}</div>)}
        </section>
        <section className="checkboxes">
          <label>Select Devices</label>
          <Controller as={MultiSelect} options={devices} name="devices"control={control}/>
        </section>
        </div>

        <ButtonsResult {...{ data, reset, defaultValues }} />
        <p id="f_error" className="success" style={{display:"none"}}>Job Submitted Successfully</p>
      </form>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
