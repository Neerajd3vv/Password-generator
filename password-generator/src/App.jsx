import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(7);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  
  //useCallback

  const passwordGenerator = useCallback(() =>{
    let password = ""
    let str = "ABCDEFGHIJKLMPOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    
    if (number) {
      str += "0123456789"
    }
    if (character) {
      str += "@#$%^&*()!"
    }

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      password += str.charAt(char)
      
    }

    setPassword(password)
  } ,[length , number , character, setPassword])

 const copyToClipboard = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,20)
  window.navigator.clipboard.writeText(password)
 } , [password])
  
  //useEffect
  useEffect(()=>{passwordGenerator()} , [length , number , character, passwordGenerator ])
  

  //useRef 
  const  passwordRef = useRef(null)
 

  return (
     <div className='w-90	 max-w-wd  shadow-md rounded-lg px-4 py-3 my-8 mx-20 bg-gray-600 text-white-600 '>
      <h1 className='text-white text-center my-3 text-3xl'>
      Password Generator
      </h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value = {password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button 
         onClick={copyToClipboard}
         className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-green-500'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center  gap-x-1'>
          <input 
          type="range" 
          min={7}
          max={20}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setlength(e.target.value)}}
          />
          <label className='text-white'> Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1 mx-12'> 
        <input
        className='mx-2'
        type='checkbox'
        defaultChecked={number} 
        id="numberInput"
        onChange={() => {
          setNumber((prev) => !prev)
        } }
        />    
         <label className='text-white' htmlFor='numberInput'>Numbers</label>
        <input
        className='mx-2'
        type='checkbox'
        defaultChecked={character} 
        id="numberInput"
        onChange={() => {
          setCharacter((prev) => !prev)
        } }
        />       
        <label className='text-white' htmlFor='numberInput'>Characters</label>
        </div>
      </div>
     </div>
  )
}

export default App
 