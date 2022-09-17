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
      await axios.post('https://localhost:3000/get_text', {
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
        <form action='/' method='POST' onSubmit={sendUrl}>
        <h1>Welcome to Hearken Web App!</h1>
        <input 
        type="text"
        placeholder='Enter the filename'
        onChange={(event) => setName(event.target.value)}
        value={name} />
        <input 
        type="link" 
        placeholder='Enter the url'
        onChange={(event) => setUrl(event.target.value)}
        value={url} />
        <button type='submit'>Generate Audio File</button>
      </form> : 
      <h1>Audio File Downloaded!</h1>}
    </div>
  );
}

export default App;
