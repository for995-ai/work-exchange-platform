import { Home, Search, Heart, MessageSquare, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  favoriteCount?: number;
}

export function BottomNavigation({ activeTab, onTabChange, favoriteCount = 0 }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', label: '首頁', icon: Home },
    { id: 'search', label: '搜尋', icon: Search },
    { id: 'favorites', label: '收藏', icon: Heart },
    { id: 'reviews', label: '評價', icon: MessageSquare },
    { id: 'profile', label: '個人', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 px-4 py-2">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors relative ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {tab.id === 'favorites' && favoriteCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center min-w-4">
                    {favoriteCount > 99 ? '99+' : favoriteCount}
                  </div>
                )}
              </div>
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}