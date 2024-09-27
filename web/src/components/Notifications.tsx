import React from 'react';
import api from '../services/api';

interface NotificationsProps {
  evento: string;
  modoAutomatico: boolean;
}

const Notifications: React.FC<NotificationsProps> = ({ evento, modoAutomatico }) => {
  const handleAprovar = async () => {
    try {
      await api.get('/fechar');
    } catch (error) {
      console.error('Erro ao aprovar:', error);
    }
  };

  if (modoAutomatico || !evento) {
    return null;
  }

  return (
    <div className="notifications">
      <div className="notification">
        <p>{evento}</p>
        <button onClick={handleAprovar}>Aprovar</button>
      </div>
    </div>
  );
};

export default Notifications;