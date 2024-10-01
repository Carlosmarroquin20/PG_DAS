import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './OrderStatistics.css';

// Registrar los elementos y escalas de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const OrderStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [topBuyers, setTopBuyers] = useState(null);
  const [dateStats, setDateStats] = useState(null);
  const [stateStats, setStateStats] = useState(null);
  const [deliveryStats, setDeliveryStats] = useState(null); // Nuevo estado para las estadísticas de entrega
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch para obtener estadísticas generales
  const fetchStatistics = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/statistics');
      const data = await response.json();
      if (data.success) {
        setStatistics(data);
        console.log("Estadísticas generales:", data);
      } else {
        setError('Error al obtener las estadísticas generales');
      }
    } catch (error) {
      setError('Error de conexión al obtener las estadísticas generales');
    } finally {
      setLoading(false);
    }
  };

  // Fetch para obtener estadísticas por fecha
  const fetchDateStatistics = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/statistics/date');
      const data = await response.json();
      if (data.success) {
        setDateStats(data);
        console.log("Estadísticas por fecha:", data);
      } else {
        setError('Error al obtener las estadísticas por fecha');
      }
    } catch (error) {
      setError('Error de conexión al obtener las estadísticas por fecha');
    }
  };

  // Fetch para obtener estadísticas por estado
  const fetchStateStatistics = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/statistics/state');
      const data = await response.json();
      if (data.success) {
        setStateStats(data.orderStates);
        console.log("Estadísticas por estado:", data);
      } else {
        setError('Error al obtener las estadísticas por estado');
      }
    } catch (error) {
      setError('Error de conexión al obtener las estadísticas por estado');
    }
  };

  // Fetch para obtener los compradores frecuentes
  const fetchTopBuyers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/topbuyers');
      const data = await response.json();
      if (data.success) {
        setTopBuyers(data.topBuyers);
        console.log("Compradores frecuentes:", data.topBuyers);
      } else {
        setError('Error al obtener los compradores frecuentes');
      }
    } catch (error) {
      setError('Error de conexión al obtener los compradores frecuentes');
    }
  };

  // Fetch para obtener estadísticas de las opciones de entrega
  const fetchDeliveryStatistics = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/statistics/delivery');
      const data = await response.json();
      if (data.success) {
        setDeliveryStats(data.deliveryOptions);
        console.log("Estadísticas de opciones de entrega:", data.deliveryOptions);
      } else {
        setError('Error al obtener las estadísticas de entrega');
      }
    } catch (error) {
      setError('Error de conexión al obtener las estadísticas de entrega');
    }
  };

  useEffect(() => {
    fetchStatistics();
    fetchDateStatistics();
    fetchStateStatistics();
    fetchTopBuyers();
    fetchDeliveryStatistics(); // Nuevo fetch para las opciones de entrega
  }, []);

  if (loading) return <div className="loading-message">Cargando estadísticas...</div>;
  if (error) return <div className="error-message">{error}</div>;

  // Verificación de que las estadísticas no sean null
  if (!statistics || !dateStats || !stateStats || !topBuyers || !deliveryStats) {
    return <div className="error-message">No se encontraron estadísticas.</div>;
  }

  // Datos para el gráfico de pastel: Opción de entrega más usada
  const deliveryOptionsData = {
    labels: deliveryStats.map(option => option._id), // Mapea las opciones de entrega
    datasets: [
      {
        label: 'Opciones de Entrega',
        data: deliveryStats.map(option => option.count), // Mapea los conteos de las opciones
        backgroundColor: ['rgba(118, 174, 101, 0.8)', 'rgba(175, 128, 79, 0.8)'],
        hoverOffset: 4,
      }
    ]
  };

  // Datos para el gráfico de barras: Compradores más frecuentes
  const topBuyersData = topBuyers
    ? {
        labels: topBuyers.map(buyer => buyer.userInfo.name),
        datasets: [
          {
            label: 'Número de Compras',
            data: topBuyers.map(buyer => buyer.totalOrders),
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            barThickness: 50,
          }
        ]
      }
    : null;

  // Datos para el gráfico de barras: Pedidos por estado
  const orderStatesData = stateStats
    ? {
        labels: stateStats.map(state => state._id),
        datasets: [
          {
            label: 'Número de Pedidos',
            data: stateStats.map(state => state.count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            barThickness: 50,
          }
        ]
      }
    : null;

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <div className="statistics-container">
      <h1>Estadísticas de Pedidos</h1>
      <div className="statistics-grid">
        <div className="statistics-card">
          <p className="stat-title">Total de Pedidos</p>
          <p className="stat-value">{statistics.totalOrders}</p>
        </div>
        <div className="statistics-card">
          <p className="stat-title">Pedidos Entregados</p>
          <p className="stat-value">{statistics.deliveredOrders}</p>
        </div>
        <div className="statistics-card">
          <p className="stat-title">Ingresos Totales</p>
          <p className="stat-value">Q{statistics.totalIncome}</p>
        </div>
      </div>

      <h2>Opción de Entrega Usada</h2>
      <div className="chart-container">
        <Pie data={deliveryOptionsData} options={options} />
      </div>

      {topBuyersData && (
        <>
          <h2>Compradores Más Frecuentes</h2>
          <div className="chart-container">
            <Bar data={topBuyersData} options={options} />
          </div>
        </>
      )}

      {orderStatesData && (
        <>
          <h2>Pedidos por Estado</h2>
          <div className="chart-container">
            <Bar data={orderStatesData} options={options} />
          </div>
        </>
      )}

      {dateStats && (
        <div className="statistics-grid">
          <div className="statistics-card">
            <p className="stat-title">Pedidos de Hoy</p>
            <p className="stat-value">{dateStats.ordersToday}</p>
          </div>
          <div className="statistics-card">
            <p className="stat-title">Pedidos del Mes</p>
            <p className="stat-value">{dateStats.ordersThisMonth}</p>
          </div>
          <div className="statistics-card">
            <p className="stat-title">Pedidos del Año</p>
            <p className="stat-value">{dateStats.ordersThisYear}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatistics;
