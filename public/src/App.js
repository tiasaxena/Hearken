import React, { useState } from 'react';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import './App.css';

const App = () => {
  const [ name, setName ] = useState("");
  const [ url, setUrl ] = useState("");
  const [ sent, setSent ] = useState(false);

  const sendUrl = async (event) => {
    event.preventDefault();
    setSent(true);

    try{
      // making  a post request using axios
      await axios.post('https://localhost:4000/get_text', {
        url, 
        name
      })
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      
      { !sent ? 
        <div className='container'>
        <h1 className='mt-[2.4rem]'>Welcome to Hearken Web App!</h1>
        <form onSubmit={sendUrl}
        className='flex flex-col w-[40%] m-auto'>
          <input className='my-[1.5rem] border px-[1.2rem] rounded-[1.89rem] py-[0.4rem]'
          type="text"
          placeholder='Enter the filename'
          onChange={(event) => setName(event.target.value)}
          value={name}
          required
          />
          <input 
          type="link" 
          className='my-[2rem] border px-[1.2rem] rounded-[1.89rem] py-[0.4rem]'
          placeholder='Enter the url'
          onChange={(event) => setUrl(event.target.value)}
          value={url}
          required
          />
          <button type='submit' className='btn btn-md btn-success w-[40%] m-auto'>Generate Audio File</button>
      </form> 
        </div> : 
      <h1 className='mt-[2.49rem] text-[#198754]'>Audio File Downloaded!</h1>}
    </div>
  );
}

export default App;
