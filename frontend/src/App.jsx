import {useState} from 'react';
import './App.css'
import axios from "axios";

const BACKEND_URL = "http://localhost:3000";
function App() {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => setInput(e.target.value);
  const handleSubmit = () => {
    // whatever you wanna do
    console.log(input);
    axios.get(`${BACKEND_URL}/secret?email=harkirat@gmail.com`).then((res) => {
        setMessage(res.data.message)
        navigator.clipboard.writeText(res.data.message);
    }).catch(e => {
        alert("error while updating");
    });
  }

  return (
    <div>
      <div className='form'>
        <h5>100xdevs Discord Email verification</h5>
        <input type="text" onChange={handleChange} value={input} placeholder='Email' />
        <button onClick={handleSubmit}>Submit</button>
          <div>
              <p>{message}</p>
          </div>
      </div>
    </div>
  );
}

export default App
