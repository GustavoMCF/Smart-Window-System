import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatusDisplay from './components/StatusDisplay';
import WindowControl from './components/WindowControl'; 
import EventControl from './components/EventControl'; 
import Notifications from './components/Notifications';
import api from './services/api'; // Importa a configuração do Axios

const App: React.FC = () => {
  const [eventos, setEventos] = useState<string[]>([]);

  // Função para buscar eventos
  const fetchEventos = async () => {
    try {
      const response = await api.get('/eventos'); // Certifique-se que está chamando a URL correta
      const eventosArray = response.data.eventos || [];
      setEventos(eventosArray);
    } catch (error) {
      console.error('Erro ao obter os eventos:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEventos();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const removerEvento = (evento: string) => {
    setEventos(prevEventos => prevEventos.filter(e => e !== evento));
  };

  return (
    <div className="App">
      <Header />
      <div className="control-container">
        <div className="card">
          <WindowControl />
        </div>
        <div className="card">
          <EventControl />
        </div>
      </div>
      <StatusDisplay />
      <Notifications eventos={eventos} removerEvento={removerEvento} />
    </div>
  );
};

export default App;
