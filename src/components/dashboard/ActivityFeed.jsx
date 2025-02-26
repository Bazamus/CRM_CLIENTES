import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { NotionLogo, ShoppingCart, Bell, Eye } from '../Icons';

const ActivityItem = ({ icon: Icon, title, time }) => (
  <>
    <div className="flex flex-col items-center gap-1">
      <div className="activity-line h-2" />
      <div className="p-2 rounded-full bg-gray-50 dark:bg-dark-hover text-gray-700 dark:text-gray-300">
        <Icon />
      </div>
      <div className="activity-line grow" />
    </div>
    <div className="flex flex-1 flex-col py-3">
      <p className="text-gray-900 dark:text-white text-sm font-medium">{title}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{time}</p>
    </div>
  </>
);

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-gray-900 dark:text-white text-lg font-semibold">Actividad reciente</h2>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="grid grid-cols-[40px_1fr] gap-x-2 min-w-[300px]">
          <ActivityItem icon={NotionLogo} title="David García ha creado una cuenta" time="hace 5 minutos" />
          <ActivityItem icon={ShoppingCart} title="Roberto Martínez ha comprado un artículo de 100€" time="hace 1 hora" />
          <ActivityItem icon={ShoppingCart} title="Carlos Moreno ha añadido un artículo al carrito" time="hace 2 horas" />
          <ActivityItem icon={Bell} title="Carmen Rodríguez se ha suscrito al boletín" time="hace 3 horas" />
          <ActivityItem icon={Eye} title="David García ha visto un producto" time="hace 4 horas" />
        </div>
      </CardContent>
    </Card>
  );
}