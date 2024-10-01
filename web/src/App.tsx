import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Header from './components/Header';
import StatusDisplay from './components/StatusDisplay';
import WindowControl from './components/WindowControl'; 
import EventControl from './components/EventControl'; 
import api from './services/api';
import PopupNotification from './components/PopupNotification'; // Importar PopupNotification

// Lazy loading do componente Notifications
const Notifications = React.lazy(() => import('./components/Notifications'));

const App: React.FC = () => {
  const [eventos, setEventos] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(true);  // Forçar pop-up a aparecer
  const [eventoAtual, setEventoAtual] = useState<string>('Chuva detectada, potência alta'); // Evento de teste
  const [estadoJanela, setEstadoJanela] = useState<string>('Aberto');  // Estado de teste


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

  const handleConfirm = () => {
    console.log('Confirmar clique!');
    setShowPopup(false);
  };

  const handleCancel = () => {
    console.log('Cancelar clique!');
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    console.log('Fechar pop-up');
    setShowPopup(false);
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
      <Suspense fallback={<div>Carregando notificações...</div>}>
        <Notifications eventos={eventos} removerEvento={removerEvento} />
      </Suspense>
      {/* Forçar o pop-up a aparecer */}
      
      {showPopup && (
        <PopupNotification
          evento={eventoAtual}
          estadoJanela={estadoJanela}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default App;
