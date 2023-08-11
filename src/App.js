import { useState } from "react";
import "./App.css";
import { Slider } from "@mui/material";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./characters";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { COPY_SUCCESS } from "./Message";
import { message } from "antd";
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordlength] = useState(20);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [strength, setStrength] = useState('Weak')


  const handlePasswordGenerate = (e) => {
    if(!upperCase && !lowerCase && !number && !symbol){
      notify('You MUST select at least one option', true)
    }
    let characterList = "";
    if (lowerCase) {
      characterList = characterList + lowerCaseLetters;
    }
    if (upperCase) {
      characterList = characterList + upperCaseLetters;
    }
    if (number) {
      characterList = characterList + numbers;
    }
    if (symbol) {
      characterList = characterList + specialCharacters;
    }
    setPassword(createPassword(characterList));
  };
  const createPassword = (characterList) => {
  
    let password = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };
  const copyToClipBoard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
  };
  const handleCopyPassword = (e) => {
    if(password === ''){
      notify('Generate a password first', true)
    } else {
      copyToClipBoard();
    notify(COPY_SUCCESS)
    }
  
    
  };
  const notify = (message, hasError = false) =>{
    if(hasError){
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
    }
  
  }
  console.log(passwordLength);
  return (
    <div className="flex justify-center items-center mt-[200px]">
    
      <div className="bg-gray-800 flex flex-col w-[300px] justify-center items-center rounded-xl ">
        <div className="">
          <h2 className="p-2 m-2 text-2xl font-light text-gray-300">
            Password Generator
          </h2>
        </div>
        <div className="bg-gray-700 rounded-lg flex flex-row justify-between items-center m-1  p-2 w-[250px]">
          <h3 className="text-white w-50 p-1">{password}</h3>
          <button  onClick={handleCopyPassword}>
            <i className="far fa-clipboard rounded bg-gray-600 text-white p-2 hover:bg-gray-500"></i>
          </button>
        </div>
        <div>
          <div className="flex justify-between">
            <h3 className="text-gray-300 font-[600] p-1">Password Length</h3>
            <h3 className="text-white font-[600] p-1">{passwordLength}</h3>
          </div>

          <Slider
            defaultValue={passwordLength}
            onChange={(e) => setPasswordlength(e.target.value)}
            max={20}
            min={1}
            sx={{
              width: 250,
              color: "",
              "& .MuiSlider-thumb": {
                borderRadius: "5px",
              },
            }}
          />
        </div>
        <div className=" flex flex-col items-start ml-[-35px]">
          <div className=" flex flex-row-reverse justify-start relative gap-1 p-1 w-30">
            <h3 className="text-gray-400 text-sm font-[400] p-1">
              Include uppercase letters
            </h3>
            <input
              checked={upperCase}
              onChange={(e) => setUpperCase(e.target.checked)}
              type="checkbox"
              id="uppercase-letters"
              name="include-uppercase"
            />
          </div>
          <div className=" flex flex-row-reverse justify-start relative gap-1 p-1 w-30">
            <h3 className="text-gray-400 text-sm font-[400] p-1">
              Include lowercase letters
            </h3>
            <input
              checked={lowerCase}
              onChange={(e) => setLowerCase(e.target.checked)}
              type="checkbox"
              id="lowercase-letters"
              name="include-lowercase"
            />
          </div>
          <div className=" flex flex-row-reverse justify-start relative gap-1 p-1 w-30">
            <h3 className="text-gray-400 text-sm font-[400] p-1">
              Include numbers
            </h3>
            <input
              onChange={(e) => setNumber(e.target.checked)}
              checked={number}
              type="checkbox"
              id="numbers"
              name="include-number"
            />
          </div>
          <div className=" flex flex-row-reverse justify-start relative gap-1 p-1 w-30">
            <h3 className="text-gray-400 text-sm font-[400] p-1">
              Include symbols
            </h3>
            <input
              onChange={(e) => setSymbol(e.target.checked)}
              checked={symbol}
              type="checkbox"
              id="symbols"
              name="include-symbols"
            />
          </div>
        </div>
        <div className="flex justify-between w-60 ml-[-20px] p-2">
          
          <div className="flex flex-col gap-1">
          <LinearProgress
              variant="determinate"
              value={(password.length * 100) / passwordLength}
              sx={{
                width: 250,
                bgcolor: 'background.level3',
                color: 'hsl(var(--hue) 80% 40%)',
                borderRadius: '5px',
              }}
            />
            <Typography
            
              variant="body2"
              sx={{ alignSelf: 'flex-start', color: 'white' }}
            >
              {passwordLength < 3 && 'Very weak'}
              {passwordLength >= 3 && passwordLength < 6 && 'Weak'}
              {passwordLength >= 6 && passwordLength < 10 && 'Strong'}
              {passwordLength >= 10 && 'Very strong'}
            </Typography>
       
          </div>
        </div>
        <button
          onClick={handlePasswordGenerate}
          className="text-white m-5 p-2 bg-slate-600 rounded-lg w-[250px] hover:bg-gray-500"
        >
          Generate Password
        </button>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      </div>
    </div>
  );
}

export default App;
