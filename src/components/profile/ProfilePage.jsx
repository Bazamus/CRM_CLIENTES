import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

const initialProfile = {
  name: 'Carmen Rodríguez',
  email: 'carmen@ejemplo.es',
  avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  role: 'Admin',
  timezone: 'Europe/Madrid',
  notifications: {
    email: true,
    push: true,
    updates: false
  }
};

export function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    toast.success('Perfil actualizado correctamente');
  };

  return (
    <main className="flex-1 min-w-0 overflow-auto">
      <div className="max-w-[1440px] mx-auto animate-fade-in">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <h1 className="text-gray-900 dark:text-white text-2xl md:text-3xl font-bold">Tu Perfil</h1>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Profile Overview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-gray-900 dark:text-white text-lg font-semibold">Información del Perfil</h2>
                  <Button 
                    variant={isEditing ? 'secondary' : 'primary'}
                    onClick={() => {
                      if (isEditing) {
                        setFormData(profile);
                      }
                      setIsEditing(!isEditing);
                    }}
                    className="w-full sm:w-auto"
                  >
                    {isEditing ? 'Cancelar' : 'Editar Perfil'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Foto de Perfil
                      </label>
                      <div className="flex items-center gap-4">
                        <img
                          src={formData.avatar}
                          alt={formData.name}
                          className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                        />
                        <div>
                          <Button variant="secondary" size="sm" className="mb-2">
                            Cambiar foto
                          </Button>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            JPG, GIF o PNG. Máximo 1MB
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Dirección de Correo Electrónico
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Zona Horaria
                      </label>
                      <select
                        value={formData.timezone}
                        onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="Europe/Madrid">Hora de Madrid (CET)</option>
                        <option value="America/New_York">Hora del Este (ET)</option>
                        <option value="America/Chicago">Hora Central (CT)</option>
                        <option value="America/Denver">Hora de la Montaña (MT)</option>
                        <option value="America/Los_Angeles">Hora del Pacífico (PT)</option>
                      </select>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit">Guardar Cambios</Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                      />
                      <div className="text-center sm:text-left">
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
                          {profile.name}
                        </h3>
                        <p className="text-md text-gray-500 dark:text-gray-400 mb-1">{profile.role}</p>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Activo
                        </div>
                      </div>
                    </div>

                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Correo Electrónico</dt>
                        <dd className="text-lg font-medium text-gray-900 dark:text-white">{profile.email}</dd>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Zona Horaria</dt>
                        <dd className="text-lg font-medium text-gray-900 dark:text-white">{profile.timezone}</dd>
                      </div>
                    </dl>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <h2 className="text-gray-900 dark:text-white text-lg font-semibold">Preferencias de Notificación</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.notifications.email}
                        onChange={(e) => setProfile({
                          ...profile,
                          notifications: {
                            ...profile.notifications,
                            email: e.target.checked
                          }
                        })}
                        className="mt-1 checkbox-custom"
                      />
                      <div>
                        <span className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Notificaciones por Email</span>
                        <span className="block text-xs text-gray-500 dark:text-gray-400">Recibir actualizaciones y alertas por correo electrónico</span>
                      </div>
                    </label>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.notifications.push}
                        onChange={(e) => setProfile({
                          ...profile,
                          notifications: {
                            ...profile.notifications,
                            push: e.target.checked
                          }
                        })}
                        className="mt-1 checkbox-custom"
                      />
                      <div>
                        <span className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Notificaciones Push</span>
                        <span className="block text-xs text-gray-500 dark:text-gray-400">Recibir notificaciones en tiempo real en el navegador</span>
                      </div>
                    </label>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.notifications.updates}
                        onChange={(e) => setProfile({
                          ...profile,
                          notifications: {
                            ...profile.notifications,
                            updates: e.target.checked
                          }
                        })}
                        className="mt-1 checkbox-custom"
                      />
                      <div>
                        <span className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Actualizaciones del Producto</span>
                        <span className="block text-xs text-gray-500 dark:text-gray-400">Recibir información sobre nuevas funciones y mejoras</span>
                      </div>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}