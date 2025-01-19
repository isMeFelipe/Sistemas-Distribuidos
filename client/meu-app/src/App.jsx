import { useState } from 'react';
import api from './routes/api'; // Importe a instância personalizada
import './App.css';
import ListAttendance from './components/ListAttendance';
import ServerStatusCheck from './components/ServerStatusCheck';
function App() {
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    try {
      const { data } = await api.get('/server1'); // Requisição usando a instância
      setResponse(data.message);
    } catch (error) {
      console.error('Erro ao fazer requisição:', error.message);
      setResponse('Erro ao obter dados.');
    }
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: 100, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
        <ListAttendance />
        <ServerStatusCheck />
      </div>
    </>
  );
}

export default App;
