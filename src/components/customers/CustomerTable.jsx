import React from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { CustomerDetailsModal } from './CustomerDetailsModal';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function CustomerTable({ customers, onEdit }) {
  const { t } = useTranslation();
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('customersPage.table.name')}</TableHead>
              <TableHead>{t('customersPage.table.status')}</TableHead>
              <TableHead>{t('customersPage.table.email')}</TableHead>
              <TableHead>{t('customersPage.table.lastContact')}</TableHead>
              <TableHead>{t('customersPage.table.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                      <img 
                        src={customer.avatar} 
                        alt={customer.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=random`;
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {customer.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {customer.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={customer.status === 'active' ? 'success' : 'secondary'}>
                    {t(`customersPage.status.${customer.status}`)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {customer.spent.toLocaleString()}€
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(customer.lastOrder), 'PP')}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(customer)}>
                      {t('common.edit')}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(customer)}>
                      {t('common.view')}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CustomerDetailsModal
        customer={selectedCustomer}
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </>
  );
}