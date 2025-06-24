
import React from 'react';
import { Settings, BookOpen, Award, Bell, HelpCircle, LogOut, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Profil = () => {
  const stats = [
    { label: 'Formations complétées', value: 3 },
    { label: 'Heures d\'apprentissage', value: 47 },
    { label: 'Exercices validés', value: 28 },
    { label: 'Badges obtenus', value: 5 }
  ];

  const menuItems = [
    { icon: Settings, label: 'Paramètres', action: () => {} },
    { icon: BookOpen, label: 'Mes formations', action: () => {} },
    { icon: Award, label: 'Badges et récompenses', action: () => {} },
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: HelpCircle, label: 'Aide et support', action: () => {} }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pt-16 md:pb-0">
      {/* Profile Header */}
      <div className="bg-white shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">JD</span>
              </div>
              <button className="absolute bottom-0 right-0 bg-edu-primary text-white p-1 rounded-full">
                <Edit size={12} />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
              <p className="text-gray-600">john.doe@email.com</p>
              <p className="text-sm text-edu-primary mt-1">Étudiant actif depuis mars 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-edu-primary mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm border mb-6">
          <h3 className="font-semibold mb-3">Progression actuelle</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Formation React</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-edu-primary h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Design Thinking</span>
                <span>30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-edu-secondary h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-lg shadow-sm border divide-y divide-gray-100">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors"
              >
                <Icon size={20} className="text-gray-500 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut size={16} className="mr-2" />
            Se déconnecter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profil;
