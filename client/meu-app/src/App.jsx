import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [response, setResponse] = useState(''); // Inicializa como string vazia

  function handleClick() {
    axios.get('http://127.0.0.1:8000/api/server1')
      .then((response) => {
        setResponse(response.data.message);
      })
      .catch((error) => {
        axios.get('http://127.0.0.1:8001/api/server2')
          .then((response) => {
            setResponse(response.data.message);
          }).catch((error) => {
            console.error('Erro na requisição:', error);
          });
      });
  }

  return (
    <>
      <div>
        <h1>Home Page</h1>
        <p>Conteúdo da página Home.</p>

        <button onClick={handleClick}>
          Fazer Requisição
        </button>

        {/* Renderiza o conteúdo de response */}
        {response && <h2>{response}</h2>}
      </div>
    </>
  );
}

export default App;
