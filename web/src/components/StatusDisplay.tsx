import React, { useState, useEffect } from 'react';
import api from '../services/api';

const StatusDisplay: React.FC = () => {
  const [estado, setEstado] = useState<string>('Fechado'); // Estado inicial da janela

  // Função para buscar o estado da janela no backend
  const fetchEstado = async () => {
    try {
      const response = await api.get('/estado'); // Certifique-se de que a rota é correta
      const novoEstado = response.data.split('=')[1];
      if (estado !== novoEstado) {
        setEstado(novoEstado); // Apenas atualiza o estado se for diferente
      }
    } catch (error) {
      console.error('Erro ao obter o estado:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEstado();
    }, 3000);

    return () => clearInterval(interval);
  }, [estado]);

  return (
    <div className="status-display">
      <p>Estado da Janela: {estado}</p> {/* Mostra apenas o estado da janela */}
    </div>
  );
};

export default StatusDisplay;
