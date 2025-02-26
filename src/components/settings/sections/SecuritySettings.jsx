import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import toast from 'react-hot-toast';

export function SecuritySettings() {
  const [settings, setSettings] = useState({
    twoFactor: true,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAttempts: '5'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Configuración de seguridad actualizada correctamente');
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-gray-900 dark:text-white text-lg font-semibold">Configuración de Seguridad</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.twoFactor}
                onChange={(e) => setSettings({ ...settings, twoFactor: e.target.checked })}
                className="checkbox-custom"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Autenticación de Dos Factores</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Añade una capa extra de seguridad a tu cuenta</p>
              </div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tiempo de Sesión (minutos)
              </label>
              <select
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="15">15 minutos</option>
                <option value="30">30 minutos</option>
                <option value="60">1 hora</option>
                <option value="120">2 horas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Caducidad de Contraseña (días)
              </label>
              <select
                value={settings.passwordExpiry}
                onChange={(e) => setSettings({ ...settings, passwordExpiry: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="30">30 días</option>
                <option value="60">60 días</option>
                <option value="90">90 días</option>
                <option value="180">180 días</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Intentos de Inicio de Sesión Fallidos
              </label>
              <select
                value={settings.loginAttempts}
                onChange={(e) => setSettings({ ...settings, loginAttempts: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="3">3 intentos</option>
                <option value="5">5 intentos</option>
                <option value="10">10 intentos</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Actualizar Configuración de Seguridad</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}