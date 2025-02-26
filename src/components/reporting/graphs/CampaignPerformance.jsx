import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

const data = [
  { name: 'Email', sent: 15000, opened: 7500, clicked: 3000 },
  { name: 'Social', impressions: 25000, engagement: 5000, clicks: 2000 },
  { name: 'Display', impressions: 20000, engagement: 4000, clicks: 1500 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-dark-card p-3 border border-gray-100 dark:border-gray-800 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs sm:text-sm">
            <span className="inline-block w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: entry.color }}></span>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function CampaignPerformance() {
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

  const translatedData = data.map(item => ({
    ...item,
    name: t(`reporting.channels.${item.name.toLowerCase()}`, item.name)
  }));

  return (
    <div className="h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={translatedData} 
          margin={{ 
            top: 10, 
            right: isMobile ? 0 : 10, 
            left: isMobile ? -15 : 0, 
            bottom: 0 
          }}
          barSize={isMobile ? 15 : 20}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            className="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
            tick={{ fontSize: isMobile ? 10 : 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            className="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
            tick={{ fontSize: isMobile ? 10 : 12 }}
            width={isMobile ? 30 : 40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="sent" name={t('reporting.metrics.sent', 'Enviados')} fill="#4f46e5" radius={[4, 4, 0, 0]} />
          <Bar dataKey="opened" name={t('reporting.metrics.opened', 'Abiertos')} fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="clicked" name={t('reporting.metrics.clicked', 'Clics')} fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}