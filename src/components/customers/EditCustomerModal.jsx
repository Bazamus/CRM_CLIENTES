import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';

export function EditCustomerModal({ customer, isOpen, onClose, onUpdate }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    address: '',
    city: '',
    country: 'España',
    status: 'active',
    type: 'regular',
    source: 'direct',
    notes: ''
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        ...customer,
        // Aseguramos que todos los campos existan aunque no estén en el cliente original
        phone: customer.phone || '',
        company: customer.company || '',
        position: customer.position || '',
        address: customer.address || '',
        city: customer.city || '',
        country: customer.country || 'España',
        type: customer.type || 'regular',
        source: customer.source || 'direct',
        notes: customer.notes || ''
      });
    }
  }, [customer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...customer,
      ...formData
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!customer) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <Card className="bg-white dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('customersPage.editCustomer')}
                </Dialog.Title>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Información Personal */}
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      {t('customerForm.sections.personal')}
                    </h3>
                  </div>
                  
                  <div>
                    <Input
                      label={t('customerForm.fields.name')}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('customerForm.placeholders.name')}
                    />
                  </div>

                  <div>
                    <Input
                      label={t('customerForm.fields.email')}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t('customerForm.placeholders.email')}
                    />
                  </div>

                  <div>
                    <Input
                      label={t('customerForm.fields.phone')}
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('customerForm.placeholders.phone')}
                    />
                  </div>

                  <div>
                    <Select
                      label={t('customerForm.fields.type')}
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      options={[
                        { value: 'regular', label: t('customerForm.types.regular') },
                        { value: 'premium', label: t('customerForm.types.premium') },
                        { value: 'vip', label: t('customerForm.types.vip') }
                      ]}
                    />
                  </div>

                  {/* Información Profesional */}
                  <div className="col-span-2 mt-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      {t('customerForm.sections.professional')}
                    </h3>
                  </div>

                  <div>
                    <Input
                      label={t('customerForm.fields.company')}
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t('customerForm.placeholders.company')}
                    />
                  </div>

                  <div>
                    <Input
                      label={t('customerForm.fields.position')}
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder={t('customerForm.placeholders.position')}
                    />
                  </div>

                  {/* Dirección */}
                  <div className="col-span-2 mt-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      {t('customerForm.sections.address')}
                    </h3>
                  </div>

                  <div className="col-span-2">
                    <Input
                      label={t('customerForm.fields.address')}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder={t('customerForm.placeholders.address')}
                    />
                  </div>

                  <div>
                    <Input
                      label={t('customerForm.fields.city')}
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder={t('customerForm.placeholders.city')}
                    />
                  </div>

                  <div>
                    <Input
                      label={t('customerForm.fields.country')}
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder={t('customerForm.placeholders.country')}
                    />
                  </div>

                  {/* Información Adicional */}
                  <div className="col-span-2 mt-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      {t('customerForm.sections.additional')}
                    </h3>
                  </div>

                  <div>
                    <Select
                      label={t('customerForm.fields.status')}
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      options={[
                        { value: 'active', label: t('customersPage.status.active') },
                        { value: 'inactive', label: t('customersPage.status.inactive') }
                      ]}
                    />
                  </div>

                  <div>
                    <Select
                      label={t('customerForm.fields.source')}
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      options={[
                        { value: 'direct', label: t('customerForm.sources.direct') },
                        { value: 'referral', label: t('customerForm.sources.referral') },
                        { value: 'web', label: t('customerForm.sources.web') }
                      ]}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('customerForm.fields.notes')}
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-1 focus:ring-primary focus:border-primary bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder={t('customerForm.placeholders.notes')}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 p-6 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 sticky bottom-0">
                <Button 
                  variant="secondary" 
                  onClick={onClose}
                  type="button"
                >
                  {t('common.cancel')}
                </Button>
                <Button 
                  type="submit"
                >
                  {t('common.save')}
                </Button>
              </div>
            </form>
          </Card>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
