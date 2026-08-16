import { User, Shield, Bell, HelpCircle, Settings, LogOut, ChevronRight } from 'lucide-react';

export function ProfilePage() {
  const menuItems = [
    {
      icon: Shield,
      label: '身分驗證',
      description: '提升信任值',
      badge: '+20',
      badgeColor: 'bg-green-100 text-green-700'
    },
    {
      icon: Bell,
      label: '通知設定',
      description: '管理提醒偏好'
    },
    {
      icon: HelpCircle,
      label: '幫助中心',
      description: '常見問題與客服'
    },
    {
      icon: Settings,
      label: '設定',
      description: '帳號與隱私'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 pb-12">
        <h1 className="text-xl text-white mb-6">個人資料</h1>
        
        {/* 用戶資訊卡片 */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">旅行愛好者</p>
              <p className="text-sm text-gray-600">user@example.com</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">85</p>
              <p className="text-xs text-gray-600">信任值</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">3</p>
              <p className="text-xs text-gray-600">完成換宿</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">2</p>
              <p className="text-xs text-gray-600">獲得徽章</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6">
        {/* 功能選單 */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden mb-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className={`w-full flex items-center gap-4 p-4 hover:bg-blue-50 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
                {item.badge && (
                  <span className={`${item.badgeColor} px-2 py-1 rounded-full text-xs font-medium`}>
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </button>
            );
          })}
        </div>

        {/* 登出按鈕 */}
        <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-red-200 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">登出</span>
        </button>

        {/* 版本資訊 */}
        <p className="text-center text-xs text-gray-400 mt-6">
          作保庇 宿安心 v1.0.0
        </p>
      </div>
    </div>
  );
}