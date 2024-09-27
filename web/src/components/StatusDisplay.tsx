import { useState, useEffect } from 'react';
import api from '../services/api';

const StatusDisplay: React.FC = () => {
  const [estado, setEstado] = useState<string>('Fechado');
  const [evento, setEvento] = useState<string>('');

  useEffect(() => {
    const fetchEstado = async () => {
      try {
        const response = await api.get('/estado');
        const valorEstado = response.data.split('=')[1];
        setEstado(valorEstado);
      } catch (error) {
        console.error('Erro ao obter o estado:', error);
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

    const estadoInterval = setInterval(fetchEstado, 3000);
    const eventoInterval = setInterval(fetchEvento, 5000);

    fetchEstado();
    fetchEvento();

    return () => {
      clearInterval(estadoInterval);
      clearInterval(eventoInterval);
    };
  }, []);

  return (
    <div className="status-display">
      <p>Estado: {estado}</p>
      {evento && <p>Evento: {evento}</p>}
    </div>
  );
};

export default StatusDisplay;