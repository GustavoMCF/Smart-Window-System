import { useState, useEffect } from 'react';
import Header from './components/Header';
import StatusDisplay from './components/StatusDisplay';
import Controls from './components/Controls';
import Notifications from './components/Notifications';
import api from './services/api';
import './styles.css';

const App: React.FC = () => {
  const [modoAutomatico, setModoAutomatico] = useState<boolean>(true);
  const [evento, setEvento] = useState<string>('');

  useEffect(() => {
    const fetchModo = async () => {
      try {
        const response = await api.get('/modo');
        setModoAutomatico(response.data === 'automatico=1');
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

    fetchModo();
    fetchEvento();
  }, []);

  return (
    <div className="App">
      <Header />
      <StatusDisplay />
      <Controls modoAutomatico={modoAutomatico} />
      <Notifications evento={evento} modoAutomatico={modoAutomatico} />
    </div>
  );
};

export default App;