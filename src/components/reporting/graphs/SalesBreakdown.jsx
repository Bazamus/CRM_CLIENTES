import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'electronics', value: 35000 },
  { name: 'homeAndGarden', value: 20000 },
  { name: 'sports', value: 12000 },
  { name: 'clothing', value: 25000 },
  { name: 'books', value: 15000 },
  { name: 'beauty', value: 10000 }
];

const COLORS = ['#4f46e5', '#10b981', '#6366f1', '#22c55e', '#ef4444', '#f43f5e'];

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const CustomTooltip = ({ active, payload }) => {
  const { t } = useTranslation();
  
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-dark-card p-3 border border-gray-100 dark:border-gray-800 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {t(`reporting.categories.${payload[0].name}`)}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export function SalesBreakdown() {
  const { t } = useTranslation();

  const translatedData = data.map(item => ({
    ...item,
    name: item.name,
    displayName: t(`reporting.categories.${item.name}`)
  }));

  // Determinar si estamos en un dispositivo móvil
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

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={translatedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={isMobile ? 100 : 160}
            fill="#8884d8"
            dataKey="value"
          >
            {translatedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout={isMobile ? "horizontal" : "vertical"}
            align={isMobile ? "center" : "right"}
            verticalAlign={isMobile ? "bottom" : "middle"}
            wrapperStyle={isMobile ? { paddingTop: '20px' } : {}}
            formatter={(value, entry) => (
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {t(`reporting.categories.${value}`)} ({formatCurrency(entry.payload.value)})
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}