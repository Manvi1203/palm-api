import { useState} from 'react';
function App() {
  const [serverData, setServerData] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  function handleSubmit(){
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'prompt': userPrompt
      })
    })
    .then(res => res.json())
    .then(data=> {
      console.log(data)
      setServerData(data)
    })
  }
  return (
    <main>
      <h1>My Prompter</h1>
      <article>
        {serverData}
      </article>
      <div>
        <textarea onChange={(e)=>setUserPrompt(e.target.value)}></textarea>
        <button onClick={handleSubmit}>Go</button>
      </div>
    </main>
  )
}

export default App
