import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { Bell } from '../Icons';

const notifications = [
  {
    id: 1,
    title: 'Nuevo pedido recibido',
    description: 'Carmen Rodríguez ha realizado un nuevo pedido',
    time: 'hace 5 minutos',
    unread: true,
  },
  {
    id: 2,
    title: 'Campaña completada',
    description: 'La campaña de ofertas de verano ha finalizado',
    time: 'hace 1 hora',
    unread: true,
  },
  {
    id: 3,
    title: 'Nueva reseña',
    description: 'Roberto Martínez ha dejado una reseña de 5 estrellas',
    time: 'hace 2 horas',
    unread: false,
  },
];

export function NotificationsMenu() {
  const [unreadCount, setUnreadCount] = useState(2);

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors">
        <Bell />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-1 w-80 bg-white dark:bg-dark-card rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 focus:outline-none">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notificaciones</h3>
            {unreadCount > 0 && (
              <button
                onClick={() => setUnreadCount(0)}
                className="text-xs text-primary hover:text-primary-light"
              >
                Marcar todas como leídas
              </button>
            )}
          </div>
        </div>

        <div className="max-h-96 overflow-auto">
          {notifications.map((notification) => (
            <Menu.Item key={notification.id}>
              {({ active }) => (
                <button
                  className={`flex gap-4 w-full p-4 text-left ${
                    active ? 'bg-gray-50 dark:bg-dark-hover' : ''
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary">
                      <Bell />
                    </div>
                    {notification.unread && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}