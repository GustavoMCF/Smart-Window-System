import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatusDisplay from './components/StatusDisplay';
import Controls from './components/Controls';
import Notifications from './components/Notifications';
import api from './services/api';
import './styles.css';

const App: React.FC = () => {
  const [modoAutomatico, setModoAutomatico] = useState<boolean>(true);
  const [eventos, setEventos] = useState<string[]>([]);

  useEffect(() => {
    const fetchModo = async () => {
      try {
        const response = await api.get('/modo');
        const modoAtivo = response.data.includes('automatico=1');
        setModoAutomatico(modoAtivo);
      } catch (error) {
        console.error('Erro ao obter o modo:', error);
      }
    };

    const fetchEventos = async () => {
      try {
        const response = await api.get('/eventos');
        const eventosArray = response.data.eventos || [];
        setEventos(eventosArray);
      } catch (error) {
        console.error('Erro ao obter os eventos:', error);
      }
    };

    const interval = setInterval(() => {
      fetchModo();
      fetchEventos();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Função para remover eventos após 5 segundos
  const removerEvento = (evento: string) => {
    setEventos(prevEventos => prevEventos.filter(e => e !== evento));
  };

  return (
    <div className="App">
      <Header />
      <StatusDisplay />
      <Controls modoAutomatico={modoAutomatico} />
      <Notifications eventos={eventos} removerEvento={removerEvento} /> {/* Passa a função de remoção */}
    </div>
  );
};

export default App;
