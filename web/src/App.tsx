import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Header from './components/Header';
import StatusDisplay from './components/StatusDisplay';
import WindowControl from './components/WindowControl'; 
import EventControl from './components/EventControl'; 
import api from './services/api';

// Lazy loading do componente Notifications
const Notifications = React.lazy(() => import('./components/Notifications'));

const App: React.FC = () => {
  const [eventos, setEventos] = useState<string[]>([]);

  // Função para buscar eventos (usando useCallback para evitar recriação a cada render)
  const fetchEventos = useCallback(async () => {
    try {
      const response = await api.get('/eventos');
      const eventosArray = response.data.eventos || [];
      setEventos(eventosArray);
    } catch (error) {
      console.error('Erro ao obter os eventos:', error);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchEventos, 2000);
    return () => clearInterval(interval);
  }, [fetchEventos]);

  // Função para remover eventos (usando useCallback para evitar recriação a cada render)
  const removerEvento = useCallback((evento: string) => {
    setEventos(prevEventos => prevEventos.filter(e => e !== evento));
  }, []);

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
      <Suspense fallback={<div>Carregando notificações...</div>}>
        <Notifications eventos={eventos} removerEvento={removerEvento} />
      </Suspense>
    </div>
  );
};

export default App;
