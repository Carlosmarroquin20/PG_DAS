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
  const [topBuyers, setTopBuyers] = useState(null); // Nuevo estado para compradores frecuentes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch para obtener estadísticas generales
  const fetchStatistics = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/statistics');
      const data = await response.json();

      if (data.success) {
        setStatistics(data.statistics);
      } else {
        setError('Error al obtener las estadísticas');
      }
    } catch (error) {
      setError('Error de conexión al obtener las estadísticas');
    } finally {
      setLoading(false);
    }
  };

  // Fetch para obtener los compradores frecuentes
  const fetchTopBuyers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/topbuyers');
      const data = await response.json();

      if (data.success) {
        setTopBuyers(data.topBuyers); // Guardar los compradores frecuentes
      } else {
        setError('Error al obtener los compradores frecuentes');
      }
    } catch (error) {
      setError('Error de conexión al obtener los compradores frecuentes');
    }
  };

  useEffect(() => {
    fetchStatistics();
    fetchTopBuyers(); // Cargar los compradores frecuentes
  }, []);

  if (loading) return <div className="loading-message">Cargando estadísticas...</div>;
  if (error) return <div className="error-message">{error}</div>;

  // Datos para el gráfico de barras: Pedidos por mes
  const ordersByMonthData = statistics?.ordersByMonth
    ? {
        labels: statistics.ordersByMonth.map(item => `Mes ${item._id}`),
        datasets: [
          {
            label: 'Pedidos por Mes',
            data: statistics.ordersByMonth.map(item => item.count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            barThickness: 50,
          }
        ]
      }
    : null;

  // Datos para el gráfico de pastel: Opción de entrega más usada
  const deliveryOptionsData = {
    labels: ['Delivery', 'Distributor'],
    datasets: [
      {
        label: 'Opciones de Entrega',
        data: [statistics.deliveredOrders, statistics.totalOrders - statistics.deliveredOrders],
        backgroundColor: ['rgba(118, 174, 101, 0.8)', 'rgba(175, 128, 79, 0.8)'],
        hoverOffset: 4,
      }
    ]
  };

  // Datos para el gráfico de barras: Productos más vendidos
  const bestSellingProductsData = statistics?.bestSellingProducts
    ? {
        labels: statistics.bestSellingProducts.map(item => item.productInfo.name),
        datasets: [
          {
            label: 'Cantidad Vendida',
            data: statistics.bestSellingProducts.map(item => item.totalSold),
            backgroundColor: 'rgba(101, 173, 103, 0.8)',
            barThickness: 50,
          }
        ]
      }
    : null;

  // Datos para el gráfico de barras: Compradores más frecuentes
  const topBuyersData = topBuyers
    ? {
        labels: topBuyers.map(buyer => buyer.userInfo.name), // Nombres de los compradores
        datasets: [
          {
            label: 'Número de Compras',
            data: topBuyers.map(buyer => buyer.totalOrders), // Cantidad de compras por cada comprador
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            barThickness: 50,
          }
        ]
      }
    : null;

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
          <p className="stat-value">${statistics.totalIncome}</p>
        </div>
        <div className="statistics-card">
          <p className="stat-title">Opción de Entrega más Usada</p>
          <p className="stat-value">{statistics.mostUsedDeliveryOption}</p>
        </div>
      </div>

      {ordersByMonthData && (
        <>
          <h2>Pedidos por Mes</h2>
          <div className="chart-container">
            <Bar data={ordersByMonthData} options={options} />
          </div>
        </>
      )}

      <h2>Opción de Entrega Usada</h2>
      <div className="chart-container">
        <Pie data={deliveryOptionsData} options={options} />
      </div>

      {bestSellingProductsData && (
        <>
          <h2>Productos Más Vendidos</h2>
          <div className="chart-container">
            <Bar data={bestSellingProductsData} options={options} />
          </div>
        </>
      )}

      {topBuyersData && (
        <>
          <h2>Compradores Más Frecuentes</h2>
          <div className="chart-container">
            <Bar data={topBuyersData} options={options} />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderStatistics;
