import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2023-12-01', revenue: 1200, expenses: 800 },
  { date: '2023-12-02', revenue: 1500, expenses: 900 },
  { date: '2023-12-03', revenue: 1800, expenses: 1000 },
  { date: '2023-12-04', revenue: 1600, expenses: 850 },
  { date: '2023-12-05', revenue: 2000, expenses: 1100 },
  { date: '2023-12-06', revenue: 2200, expenses: 1300 },
  { date: '2023-12-07', revenue: 2400, expenses: 1400 },
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }) => {
  const { t } = useTranslation();
  
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-dark-card p-3 border border-gray-100 dark:border-gray-800 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        <div className="mt-1 space-y-1">
          <p className="text-xs sm:text-sm">
            <span className="inline-block w-3 h-3 rounded-sm bg-primary mr-2"></span>
            {t('reporting.metrics.revenue')}: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-xs sm:text-sm">
            <span className="inline-block w-3 h-3 rounded-sm bg-red-500 mr-2"></span>
            {t('reporting.metrics.expenses')}: {formatCurrency(payload[1].value)}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function RevenueOverview() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Reducir los datos para móvil para mostrar menos puntos
  const mobileData = isMobile ? 
    data.filter((_, index) => index % 2 === 0 || index === data.length - 1) : 
    data;

  return (
    <div className="h-[400px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={mobileData} 
          margin={{ 
            top: 10, 
            right: isMobile ? 0 : 10, 
            left: isMobile ? -15 : 0, 
            bottom: 0 
          }}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#6b7280', fontSize: isMobile ? 10 : 12 }}
            tickFormatter={(value) => new Date(value).toLocaleDateString('es-ES', { 
              day: '2-digit', 
              month: isMobile ? 'numeric' : '2-digit' 
            })}
            height={isMobile ? 30 : 40}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: isMobile ? 10 : 12 }}
            tickFormatter={(value) => isMobile ? 
              formatCurrency(value).replace('.00 €', ' €') : 
              formatCurrency(value)
            }
            width={isMobile ? 40 : 60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#4f46e5"
            fillOpacity={1}
            fill="url(#revenueGradient)"
            strokeWidth={isMobile ? 1.5 : 2}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            fillOpacity={1}
            fill="url(#expensesGradient)"
            strokeWidth={isMobile ? 1.5 : 2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}