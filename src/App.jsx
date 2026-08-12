import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let pass = ""
    if (numAllowed) {
      str += "1234567890";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+/*-+?:><";
    }

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  }, [password]);

  return (
    <>
      <h1 className="bg-blend-color h-fit w-fit p-4 text-black text-center ml-20 bg-amber-300">Password Generator</h1>
      <br />
      <div className="password-display-wrapper">
        <h2>{password}</h2>
        {password && (
          <button 
            type="button"
            className="copy-btn"
            onClick={copyPasswordToClipboard}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>

      <div className="bg-gray-500 p-4 w-fit h-fit rounded">
        <label className="slider-label">
          <div className="slider-header">
            <span>Length: <strong className="length-badge">{length}</strong></span>
          </div>
          <input 
            type="range" 
            min="6" 
            max="32" 
            value={length} 
            onChange={(e) => setLength(Number(e.target.value))} 
            className="cursor-pointer range-slider"
          />
        </label>

        <label>
          <input 
            type="checkbox" 
            checked={numAllowed} 
            onChange={(e) => setNumAllowed(e.target.checked)} 
          />
          Number Allowed
        </label>

        <label>
          <input 
            type="checkbox" 
            checked={charAllowed} 
            onChange={(e) => setCharAllowed(e.target.checked)} 
          />
          Character Allowed
        </label>
      </div>
    </>
  )
}

export default App

