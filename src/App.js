import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [number, setNumberAllowed] = useState(false);
  const [char, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPKRSTUVWZYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "0123456789";
    }
    if (char) {
      str += "!@#$%&*";
    }

    for (let i = 1; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charIndex);
      // passwordGenerator = passwordGenerator+ "";
    }
    setPassword(pass);
  }, [length, number, char]);
  const copyPasswordToClip = useCallback(()=>{
    // console.log('copied!');
    passwordRef.current.select();
    // passwordRef.current?.setSelectionRange(0, (password.length - 2));
    window.navigator.clipboard.writeText(password);
    // alert('copied!');
  },[password])
  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);

  return (
    <div className="App">
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg my-8 px-8 py-4 text-white bg-dark">
        <h1 className="text-2xl mb-2">Passwod Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-black"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button className="outline-none bg-blue-500 p-2 px-4 shrink-0" onClick={copyPasswordToClip}>
            Copy
          </button>
        </div>
        <div className="flex gap-x-2 flex-wrap">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              name="range"
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="range" className="text-md">
              Length : {length}
            </label>
          </div>
          <div className="flex gap-x-2">
            <input
              type="checkbox"
              defaultChecked={number}
              className="numberInput cursor-pointer"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="text-md cursor-pointer">
              Number
            </label>
          </div>
          <div className="flex gap-x-2">
            <input
              type="checkbox"
              defaultChecked={char}
              className="charInput cursor-pointer"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput" className="text-md cursor-pointer">
              Character
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
