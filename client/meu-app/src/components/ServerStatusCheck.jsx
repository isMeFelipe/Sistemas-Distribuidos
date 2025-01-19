import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ServerStatusCheck() {
    const [serverStatus1, setServerStatus1] = useState('Ativo');
    const [serverStatus2, setServerStatus2] = useState('Ativo');

    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                const response1 = await axios.get('http://localhost:8000/api/status');
                if (response1.status === 200) {
                    setServerStatus1('Ativo');
                } else {
                    setServerStatus1('Inativo');
                }


            } catch (error) {
                setServerStatus1('Inativo');
            }

            try {
                const response2 = await axios.get('http://localhost:8001/api/status');
                if (response2.status === 200) {
                    setServerStatus2('Ativo');
                } else {
                    setServerStatus2('Inativo');
                }
            } catch (error) {
                console.log(error);
                setServerStatus2('Inativo');
            }
        };

        checkServerStatus();
        const intervalId = setInterval(checkServerStatus, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="server-status-check" style={{ marginTop: 0, backgroundColor: '#f0f0f0', padding: 10, borderRadius: 10 }}>
            <h1 style={{ fontSize: 20 }}>Status dos Servidores</h1>

            <div className="server-status-card" style={{ gridRow: 2 }}>
                <h2 style={{ fontSize: 15, textAlign: 'start' }}>Servidor 1 <span>{serverStatus1 === 'Ativo' ? '✔️' : '❌'} </span></h2>
            </div>

            <div className="server-status-card">
                <h2 style={{ fontSize: 15, textAlign: 'start' }}>Servidor 2 <span>{serverStatus2 === 'Ativo' ? '✔️' : '❌'}</span></h2>                        
            </div>
        </div>
    );
}

export default ServerStatusCheck;
