import React from 'react';
import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card } from '../ui/Card';
import { useTranslation } from 'react-i18next';

const DetailItem = ({ label, value }) => (
  <div className="space-y-1">
    <dt className="text-sm text-gray-500 dark:text-gray-400">{label}</dt>
    <dd className="text-sm font-medium text-gray-900 dark:text-white">{value}</dd>
  </div>
);

const OrderHistory = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">{t('customerDetails.recentOrders')}</h4>
      <div className="space-y-4">
        {[
          { id: 1, date: '2023-12-20', amount: 350, status: 'completed' },
          { id: 2, date: '2023-12-15', amount: 220, status: 'completed' },
          { id: 3, date: '2023-12-10', amount: 180, status: 'completed' },
        ].map((order) => (
          <div 
            key={order.id}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-dark-hover"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {t('customerDetails.orderNumber', { number: order.id })}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(order.date), 'PPP', { locale: es })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {order.amount.toLocaleString()}€
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 capitalize">
                {t(`customerDetails.orderStatus.${order.status}`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ActivityLog = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">{t('customerDetails.recentActivity')}</h4>
      <div className="space-y-4">
        {[
          { action: t('customerDetails.activity.viewedProduct'), time: t('customerDetails.timeAgo.hours', { hours: 2 }) },
          { action: t('customerDetails.activity.updatedAddress'), time: t('customerDetails.timeAgo.days', { days: 1 }) },
          { action: t('customerDetails.activity.contactedSupport'), time: t('customerDetails.timeAgo.days', { days: 3 }) },
        ].map((activity, index) => (
          <div 
            key={index}
            className="flex items-center justify-between py-2"
          >
            <p className="text-sm text-gray-900 dark:text-white">{activity.action}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export function CustomerDetailsModal({ customer, onClose }) {
  const { t } = useTranslation();
  
  if (!customer) return null;

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl">
          <Card>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                    {customer.name}
                  </Dialog.Title>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <DetailItem 
                  label={t('customerDetails.totalSpent')} 
                  value={`${customer.spent.toLocaleString()}€`} 
                />
                <DetailItem 
                  label={t('customerDetails.status')} 
                  value={t(`customersPage.status.${customer.status}`)} 
                />
                <DetailItem 
                  label={t('customerDetails.lastOrder')} 
                  value={format(new Date(customer.lastOrder), 'PPP', { locale: es })} 
                />
              </div>

              <OrderHistory />
              <ActivityLog />
            </div>
          </Card>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}