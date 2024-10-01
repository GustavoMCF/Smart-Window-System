import React from 'react';

interface PopupNotificationProps {
  evento: string;
  estadoJanela: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const PopupNotification: React.FC<PopupNotificationProps> = ({ evento, estadoJanela, onConfirm, onCancel, onClose }) => {
  const isJanelaFechada = estadoJanela === 'Fechado';

  return (
    <div className="popup-overlay">
      <div className="popup">
        {isJanelaFechada ? (
          <>
            <p>{`Evento: ${evento}. Tudo certo com sua casa, a janela já está fechada.`}</p>
            <button className="ok-button" onClick={onClose}>OK</button>
          </>
        ) : (
          <>
            <p>{`Evento: ${evento}. Deseja fechar a janela?`}</p>
            <button className="confirm-button" onClick={onConfirm}>Sim</button>
            <button className="cancel-button" onClick={onCancel}>Não</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PopupNotification;
