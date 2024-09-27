import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatusDisplay from './components/StatusDisplay';
import Controls from './components/Controls';
import Notifications from './components/Notifications';
import api from './services/api';

const App: React.FC = () => {
  const [modoAutomatico, setModoAutomatico] = useState<boolean>(true);
  const [evento, setEvento] = useState<string>('');

  useEffect(() => {
    // Função para buscar o estado do modo automático
    const fetchModo = async () => {
      try {
        const response = await api.get('/modo');
        const modoAtivo = response.data.includes('automatico=1');
        setModoAutomatico(modoAtivo);  // Atualizando o estado de 'modoAutomatico'
      } catch (error) {
        console.error('Erro ao obter o modo:', error);
      }
    };

    // Função para buscar eventos
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

    // Atualizar modo automático a cada 2 segundos
    const modoInterval = setInterval(() => {
      fetchModo();
      fetchEvento();
    }, 2000);

    // Limpar o intervalo ao desmontar o componente
    return () => clearInterval(modoInterval);
  }, []);  // O array vazio faz com que esse efeito seja executado apenas uma vez na montagem

  return (
    <div className="App">
      <Header />
      <StatusDisplay />
      <Controls modoAutomatico={modoAutomatico} /> {/* Passando modoAutomatico */}
      <Notifications evento={evento} modoAutomatico={modoAutomatico} />
    </div>
  );
};

export default App;
