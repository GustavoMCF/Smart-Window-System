import React, { useState, useEffect } from 'react';
import api from '../services/api';

const StatusDisplay: React.FC = () => {
  const [estado, setEstado] = useState<string>('Fechado'); // Estado inicial da janela

  useEffect(() => {
    const fetchEstado = async () => {
      try {
        const response = await api.get('/estado');
        const valorEstado = response.data.split('=')[1];
        setEstado(valorEstado); // Atualizando o estado da janela
      } catch (error) {
        console.error('Erro ao obter o estado:', error);
      }
    };

    // Atualiza o estado da janela a cada 3 segundos
    const estadoInterval = setInterval(fetchEstado, 3000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(estadoInterval);
  }, []);

  return (
    <div className="status-display">
      <p>Estado da Janela: {estado}</p> {/* Mostra apenas o estado da janela */}
    </div>
  );
};

export default StatusDisplay;
