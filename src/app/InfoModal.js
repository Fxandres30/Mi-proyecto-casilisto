// /InfoModal.tsx
import React from "react";

const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold">Información del Sorteo</h2>
        <p className="mt-2 text-gray-600">Detalles importantes sobre el sorteo aquí.</p>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
