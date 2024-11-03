import { useEffect, useState } from 'react' 
import './App.css'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

const App =  () => {
  const [count, setCount] = useState(0)
  const [response, setResponse] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get('/');
        setResponse(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts


  return (
    <>
      <h1>{response}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
