"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const LandingPage = () => {
  /*const [showInfoModal, setShowInfoModal] = useState(false);*/
  /*const [showVerifyModal, setShowVerifyModal] = useState(false);*/
  const [ticketCount, setTicketCount] = useState(5);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const ticketPrice = 10;
  const totalPrice = ticketCount * ticketPrice;
  const totalTickets = 9999;
  const soldTickets = 400;
  const progress = totalTickets > 0 ? (Number(soldTickets) / Number(totalTickets)) * 100 : 0;
  const intervalRef = useRef<NodeJS.Timeout | null>(null); 

  useEffect(() => {
    const targetDate = new Date("2025-03-30T00:00:00");
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };
    
    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
  
    return () => clearInterval(intervalId);
  }, []);
  
  const handlePurchase = () => {
    alert("Redirigiendo a la pasarela de pago...");
  };

  // Función que actualiza la cantidad de boletos y respeta los límites
  const updateTicketCount = (increment: number) => {
    setTicketCount((prev) => Math.max(5, Math.min(500, prev + increment)));
  };

  // Inicia el conteo continuo mientras el botón está presionado
  const startCounting = (increment: number) => {
    if (intervalRef.current) return; // Evita intervalos duplicados
    intervalRef.current = setInterval(() => updateTicketCount(increment), 200);
  };

  // Detiene el conteo cuando se suelta el botón
  const stopCounting = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 relative">
      <h1 className="text-4xl font-bold w-full text-left mb-4">🎉 Efaat</h1>
      <div className="text-center">
        <h2 className="text-2xl font-semibold">¡Gana un increíble premio!</h2>
        <p className="text-gray-600 mt-2">Compra tus boletos y participa en este sorteo exclusivo.</p>
      </div>
      <div className="bg-black text-white px-6 py-3 rounded-lg text-center mt-4">
        ⏳ Sorteo en: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
      <Image src="/premio.jpg" alt="Premio del sorteo" className="w-full max-w-xs sm:max-w-md lg:max-w-lg mt-6 rounded-lg shadow-lg" />
      <button onClick={() => /*setShowInfoModal*/(true)} className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
        ℹ️ Información del sorteo
      </button>
      <div className="w-full max-w-md bg-gray-200 rounded-full h-6 mt-4 overflow-hidden">
            <div className="bg-green-500 h-full transition-all duration-700 ease-in-out" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-gray-700 mt-2">{soldTickets} de {totalTickets} boletos vendidos</p>
      <button onClick={() => /*setShowVerifyModal*/(true)} className="mt-4 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800">
        🔍 Verificar mis boletos
      </button>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[5, 40, 100].map((num) => (
          <div key={num} onClick={() => setTicketCount(num)} className="text-center border p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-200">
            <h3 className="text-xl font-semibold">X{num}</h3>
            <Image src={`/x${num}.jpg`} alt={`X${num}`} className="w-full h-20 object-cover mt-2" />
            <p className="text-gray-700">${num * ticketPrice}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4">
      <button
        onMouseDown={() => startCounting(-1)}
        onMouseUp={stopCounting}
        onMouseLeave={stopCounting}
      >
        ➖
      </button>
        <p className="px-6 py-2 bg-white border">{ticketCount} boletos</p>
        <button
        onMouseDown={() => startCounting(1)}
        onMouseUp={stopCounting}
        onMouseLeave={stopCounting}
      >
        ➕
      </button> 
      </div>
      <p className="text-xl font-semibold mt-4">Total: ${totalPrice}</p>
      <button 
        onClick={handlePurchase} 
        className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
        🛒 Comprar Ahora
      </button>

      <footer className="mt-10 text-center text-gray-600">
        <p>📧 ventas@inversionesefaat.com | 📞 3014123951</p>
        <div className="flex justify-center mt-2 space-x-4">
          <a href="#" className="text-blue-500">📘 Facebook</a>
          <a href="#" className="text-pink-500">📷 Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
