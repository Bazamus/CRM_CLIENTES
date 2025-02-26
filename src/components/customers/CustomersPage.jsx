import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { CustomerFilters } from './CustomerFilters';
import { CustomerTable } from './CustomerTable';
import { AddCustomerModal } from './AddCustomerModal';
import { EditCustomerModal } from './EditCustomerModal';
import { useTranslation } from 'react-i18next';

const initialCustomers = [
  {
    id: 1,
    name: 'Ana García Martínez',
    email: 'ana.garcia@ejemplo.com',
    status: 'active',
    spent: 1200,
    lastOrder: '2023-12-20',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Roberto Fernández López',
    email: 'roberto.fernandez@ejemplo.com',
    status: 'inactive',
    spent: 800,
    lastOrder: '2023-12-15',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Carmen Rodríguez Sánchez',
    email: 'carmen.rodriguez@ejemplo.com',
    status: 'active',
    spent: 2500,
    lastOrder: '2023-12-18',
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
  },
  {
    id: 4,
    name: 'Diego Moreno Ruiz',
    email: 'diego.moreno@ejemplo.com',
    status: 'active',
    spent: 3200,
    lastOrder: '2023-12-19',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg'
  },
  {
    id: 5,
    name: 'Laura Jiménez Torres',
    email: 'laura.jimenez@ejemplo.com',
    status: 'active',
    spent: 1800,
    lastOrder: '2023-12-21',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
  },
  {
    id: 6,
    name: 'Miguel Ángel Pérez Navarro',
    email: 'miguel.perez@ejemplo.com',
    status: 'inactive',
    spent: 950,
    lastOrder: '2023-12-14',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
  }
];

export function CustomersPage() {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState(initialCustomers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    search: ''
  });

  const handleAddCustomer = (customer) => {
    setCustomers([...customers, customer]);
  };

  const handleEditCustomer = (updatedCustomer) => {
    setCustomers(customers.map(customer => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    ));
    setEditingCustomer(null);
  };

  const filteredCustomers = customers.filter(customer => {
    if (filters.status !== 'all' && customer.status !== filters.status) return false;
    if (filters.search && !customer.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <main className="flex-1 min-w-0 overflow-auto">
      <div className="max-w-[1440px] mx-auto animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h1 className="text-gray-900 dark:text-white text-2xl md:text-3xl font-bold">
            {t('customersPage.title')}
          </h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            {t('customersPage.addCustomer')}
          </Button>
        </div>

        <div className="p-4">
          <Card>
            <CardHeader>
              <CustomerFilters
                filters={filters}
                onChange={setFilters}
              />
            </CardHeader>
            <CardContent>
              <CustomerTable 
                customers={filteredCustomers} 
                onEdit={setEditingCustomer}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCustomer}
      />

      <EditCustomerModal
        customer={editingCustomer}
        isOpen={!!editingCustomer}
        onClose={() => setEditingCustomer(null)}
        onUpdate={handleEditCustomer}
      />
    </main>
  );
}