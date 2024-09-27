import React, { useEffect } from 'react';

interface NotificationsProps {
  eventos: string[];
  removerEvento: (evento: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ eventos, removerEvento }) => {
  // Função para aplicar o estilo correto com base no tipo de evento
  const getColorClass = (evento: string) => {
    if (evento.toLowerCase().includes('chuva')) {  // Mudamos para verificar "chuva"
      return 'notification rain';
    } else if (evento.toLowerCase().includes('luminosidade')) {
      return 'notification light';
    }
    return 'notification'; // Classe padrão
  };

  // Remover eventos automaticamente após 10 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      eventos.forEach(evento => removerEvento(evento));
    }, 10000);

    return () => clearTimeout(timer);
  }, [eventos, removerEvento]);

  return (
    <div className="notifications">
      {eventos.length > 0 ? (
        eventos.map((evento, index) => (
          <div className={getColorClass(evento)} key={index}>
            <p>{evento}</p>
          </div>
        ))
      ) : (
        <div className="no-notification">
          <p>Sem eventos no momento</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
