import { useState } from "react";
import "./App.css";
import { LC, NC, SC, UC } from "./data/PassChar";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  let [passwordLength, setPasswordLength] = useState(10);
  let [includeUppercase, setIncludeUppercase] = useState(false);
  let [includeLowercase, setIncludeLowercase] = useState(false);
  let [includeNumbers, setIncludeNumbers] = useState(false);
  let [includeSymbols, setIncludeSymbols] = useState(false);
  let [fpass, setFpass] = useState("");

  let createPassword = () => {
    let finalPassword = "";
    let charSet = "";
    if (passwordLength < 10 || passwordLength > 20) {
      toast.warn("Password length should be between 10 and 20");
    } else {
      if (
        includeUppercase ||
        includeLowercase ||
        includeNumbers ||
        includeSymbols
      ) {
        if (includeUppercase) charSet += UC;
        if (includeLowercase) charSet += LC;
        if (includeNumbers) charSet += NC;
        if (includeSymbols) charSet += SC;
        for (let i = 0; i < passwordLength; i++) {
          finalPassword += charSet.charAt(
            Math.floor(Math.random() * charSet.length)
          );
        }
        setFpass(finalPassword);
        toast.info("Password generated!");
      } else {
        toast.error("Please select at least one option");
      }
    }
  };

  let copyPass = () => {
    navigator.clipboard.writeText(fpass);
    if(fpass.length === 0){
      toast.error("Please generate a password first");
    } else {
      toast.success("Password copied to clipboard");
    }
  }
  return (
    <>
      <div className="passwordBox">
        <ToastContainer />
        <h2>Password Generator</h2>
        <div className="passwordContent">
          <input type="text" placeholder="" readOnly value={fpass} />
          <button className="copyBtn" onClick={copyPass}>Copy</button>
        </div>
        <div className="passLength">
          <label htmlFor="passwordLength">Password Length</label>
          <input
            type="number"
            id="passwordLength"
            value={passwordLength}
            onChange={(evt) => setPasswordLength(evt.target.value)}
            max={20}
            min={10}
          />
        </div>
        <div className="passLength">
          <label htmlFor="ucChcek">Include Uppercase Letters</label>
          <input
            type="checkbox"
            id="ucCheck"
            name="ucChcek"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
        </div>
        <div className="passLength">
          <label htmlFor="lcChcek">Include Lowercase Letters</label>
          <input
            type="checkbox"
            id="lcChcek"
            name="lcChcek"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
        </div>
        <div className="passLength">
          <label htmlFor="numCheck">Include Numbers</label>
          <input
            type="checkbox"
            id="numCheck"
            name="numCheck"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
        </div>
        <div className="passLength">
          <label htmlFor="symbCheck">Include Symbols</label>
          <input
            type="checkbox"
            id="symbCheck"
            name="symbCheck"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
        </div>
        <button className="generateBtn" onClick={createPassword}>
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App;
