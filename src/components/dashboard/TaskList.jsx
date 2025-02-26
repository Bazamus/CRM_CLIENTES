import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent } from '../ui/Card';

function Task({ text, checked = false }) {
  return (
    <label className="flex items-center gap-3 py-3 hover:bg-gray-50 dark:hover:bg-dark-hover px-3 -mx-3 rounded-lg transition-colors duration-200 cursor-pointer">
      <input
        type="checkbox"
        defaultChecked={checked}
        className="checkbox-custom"
      />
      <p className="text-gray-700 dark:text-gray-200 text-sm">{text}</p>
    </label>
  );
}

export function TaskList() {
  const { t } = useTranslation();

  const tasks = [
    { id: 1, text: t('dashboard.tasks.welcome'), checked: true },
    { id: 2, text: t('dashboard.tasks.followUp'), checked: false },
    { id: 3, text: t('dashboard.tasks.update'), checked: false }
  ];

  return (
    <Card>
      <CardHeader>
        <h2 className="text-gray-900 dark:text-white text-lg font-semibold">
          {t('dashboard.upcomingTasks')}
        </h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {tasks.map(task => (
            <Task key={task.id} text={task.text} checked={task.checked} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}