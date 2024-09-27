import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatusDisplay from './components/StatusDisplay';
import Controls from './components/Controls';
import Notifications from './components/Notifications';
import api from './services/api';
import './styles.css'; // Importa o arquivo de estilos

const App: React.FC = () => {
  const [modoAutomatico, setModoAutomatico] = useState<boolean>(true); // Controla o modo manual/automático
  const [evento, setEvento] = useState<string>(''); // Controla os eventos recebidos

  // useEffect para buscar o modo automático e eventos periodicamente
  useEffect(() => {
    const fetchModo = async () => {
      try {
        const response = await api.get('/modo');
        const modoAtivo = response.data.includes('automatico=1');
        setModoAutomatico(modoAtivo); // Atualiza o estado do modo automático
      } catch (error) {
        console.error('Erro ao obter o modo:', error);
      }
    };

    const fetchEvento = async () => {
      try {
        const response = await api.get('/evento');
        const valorEvento = response.data.split('=')[1];
        if (valorEvento) {
          setEvento(valorEvento);
          setTimeout(() => {
            setEvento('');
          }, 5000);
        }
      } catch (error) {
        console.error('Erro ao obter o evento:', error);
      }
    };

    const modoInterval = setInterval(() => {
      fetchModo();
      fetchEvento();
    }, 2000); // Atualiza a cada 2 segundos

    return () => clearInterval(modoInterval); // Limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <div className="App">
      <Header /> {/* Componente do cabeçalho */}
      <StatusDisplay /> {/* Exibe o status da janela */}
      <Controls modoAutomatico={modoAutomatico} /> {/* Controles de abrir/fechar */}
      <Notifications evento={evento} modoAutomatico={modoAutomatico} /> {/* Notificações de eventos */}
    </div>
  );
};

export default App;
