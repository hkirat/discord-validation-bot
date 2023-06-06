import {useState} from 'react';
import './App.css'
import axios from "axios";

const BACKEND_URL = "http://localhost:3000";
function App() {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [copyStatus, setCopyStatus] = useState('Copy')

  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = () => {
    axios.get(`${BACKEND_URL}/secret?email=harkirat@gmail.com`).then((res) => {
        setMessage(res.data.message)
        navigator.clipboard.writeText(res.data.message);
    }).catch(e => {
        alert("error while updating");
    });
  }

  const copy = () => {
    navigator.clipboard.writeText(message)
      .then(() => {
        setCopyStatus('Done✨');
      })
      .catch(e => {
        alert("error occured while copying");
      })
  }

  return (
    <div>
      <div className='form'>
        <h5>100xdevs Discord Email verification</h5>
        <input type="text" onChange={handleChange} value={input} placeholder='Email' />
        <button onClick={handleSubmit}>Submit</button>
        <div className='message'>
            <p>{message}</p>
            {message !== '' &&  <button onClick={copy}>{copyStatus}</button>}
        </div>
      </div>
    </div>
  );
}

export default App
