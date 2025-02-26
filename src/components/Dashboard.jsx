import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent } from './ui/Card';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export default function Dashboard() {
  const { t } = useTranslation();

  // Datos de ejemplo para las tarjetas de estadísticas
  const stats = {
    totalRevenue: 1500,
    revenueChange: '+5%',
    activeClients: 20,
    clientsChange: '+15%',
    newClients: 5,
    newClientsChange: '+10%'
  };

  // Datos para el gráfico de ingresos
  const revenueData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    values: [800, 1200, 1000, 1500, 1300, 1800, 2200, 2000, 2400, 2300, 2800, 3200]
  };

  // Datos para el gráfico de actividad
  const activityData = {
    days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    meetings: [3, 5, 4, 6, 5, 7, 4],
    calls: [7, 8, 6, 9, 8, 10, 6]
  };

  // Datos para la lista de acceso rápido
  const quickAccessUsers = [
    { id: 1, name: 'Ana García', amount: '200 €', lastSeen: 'hace 2 días' },
    { id: 2, name: 'Roberto Martínez', amount: '100 €', lastSeen: 'hace 5 días' },
    { id: 3, name: 'Carlos Moreno', amount: '50 €', lastSeen: 'hace 7 días' },
    { id: 4, name: 'Daniel Jiménez', amount: '300 €', lastSeen: 'hace 10 días' }
  ];

  // Datos para la actividad reciente
  const recentActivity = [
    { id: 1, user: 'Daniel Jiménez', action: 'creó una cuenta', time: 'Hace 5 minutos' },
    { id: 2, user: 'Roberto Martínez', action: 'compró un artículo', time: 'Hace 1 hora' },
    { id: 3, user: 'Carlos Moreno', action: 'agregó un artículo al carrito', time: 'Hace 2 horas' },
    { id: 4, user: 'Ana García', action: 'se suscribió al boletín', time: 'Hace 3 horas' }
  ];

  // Configuración del gráfico de ingresos
  const revenueChartData = {
    labels: revenueData.labels,
    datasets: [
      {
        fill: true,
        label: t('dashboard.metrics.revenue'),
        data: revenueData.values,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4
      }
    ]
  };

  // Configuración del gráfico de actividad
  const activityChartData = {
    labels: activityData.days,
    datasets: [
      {
        label: t('dashboard.metrics.meetings'),
        data: activityData.meetings,
        backgroundColor: 'rgb(99, 102, 241)',
        borderRadius: 4
      },
      {
        label: t('dashboard.metrics.calls'),
        data: activityData.calls,
        backgroundColor: 'rgb(34, 197, 94)',
        borderRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#6b7280',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgb(17, 24, 39)',
        padding: 12,
        bodyFont: { size: 14 },
        callbacks: {
          label: function(context) {
            return formatCurrency(context.parsed.y);
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#6b7280',
          font: { size: 12 }
        }
      },
      y: {
        grid: {
          color: 'rgba(107, 114, 128, 0.1)'
        },
        ticks: {
          color: '#6b7280',
          font: { size: 12 },
          callback: function(value) {
            return formatCurrency(value);
          }
        }
      }
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t('dashboard.title')}
        </h1>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t('dashboard.stats.totalRevenue')}
              </h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(stats.totalRevenue)}
                </span>
                <span className="ml-2 text-sm font-medium text-green-600">
                  {stats.revenueChange}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t('dashboard.stats.activeClients')}
              </h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats.activeClients}
                </span>
                <span className="ml-2 text-sm font-medium text-green-600">
                  {stats.clientsChange}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t('dashboard.stats.newClients')}
              </h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats.newClients}
                </span>
                <span className="ml-2 text-sm font-medium text-green-600">
                  {stats.newClientsChange}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de ingresos */}
          <Card className="lg:col-span-2 bg-white dark:bg-gray-800">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('dashboard.cards.revenue')}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Line data={revenueChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Lista de acceso rápido */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('dashboard.quickAccess.title')}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quickAccessUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.lastSeen}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.amount}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gráfico de actividad */}
          <Card className="lg:col-span-2 bg-white dark:bg-gray-800">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('dashboard.cards.activity')}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Bar data={activityChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Actividad reciente */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('dashboard.recentActivity.title')}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}