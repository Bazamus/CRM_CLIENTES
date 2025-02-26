import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { RevenueOverview } from './graphs/RevenueOverview';
import { CustomerMetrics } from './graphs/CustomerMetrics';
import { CampaignPerformance } from './graphs/CampaignPerformance';
import { SalesBreakdown } from './graphs/SalesBreakdown';
import { DateRangePicker } from './DateRangePicker';

export function ReportingPage() {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState('7d');

  return (
    <main className="flex-1 min-w-0 overflow-auto">
      <div className="max-w-[1440px] mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-4 p-4">
          <h1 className="text-gray-900 dark:text-white text-2xl md:text-3xl font-bold">{t('reporting.title')}</h1>
          <DateRangePicker value={dateRange} onChange={setDateRange} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {/* Resumen de Ingresos */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <h2 className="text-gray-900 dark:text-white text-lg font-semibold">{t('reporting.revenueOverview')}</h2>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <RevenueOverview dateRange={dateRange} />
            </CardContent>
          </Card>

          {/* Métricas de Clientes */}
          <Card>
            <CardHeader>
              <h2 className="text-gray-900 dark:text-white text-lg font-semibold">{t('reporting.customerMetrics')}</h2>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <CustomerMetrics dateRange={dateRange} />
            </CardContent>
          </Card>

          {/* Rendimiento de Campañas */}
          <Card>
            <CardHeader>
              <h2 className="text-gray-900 dark:text-white text-lg font-semibold">{t('reporting.campaignPerformance')}</h2>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <CampaignPerformance dateRange={dateRange} />
            </CardContent>
          </Card>

          {/* Desglose de Ventas */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <h2 className="text-gray-900 dark:text-white text-lg font-semibold">{t('reporting.salesBreakdown')}</h2>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <SalesBreakdown dateRange={dateRange} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}