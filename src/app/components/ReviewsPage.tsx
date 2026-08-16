import { MessageSquare, Star, TrendingUp } from 'lucide-react';

export function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-blue-50 to-white p-4 pb-6">
        <h1 className="text-xl font-medium text-gray-900">我的評價</h1>
        <p className="text-sm text-gray-600">管理與查看評價紀錄</p>
      </div>

      <div className="px-4 py-6">
        {/* 評價統計 */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 text-center">
            <MessageSquare className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-xs text-gray-600">已發表</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 text-center">
            <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">4.8</p>
            <p className="text-xs text-gray-600">平均評分</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 text-center">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-xs text-gray-600">獲得讚同</p>
          </div>
        </div>

        {/* 待評價提醒 */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
          <p className="text-sm font-medium text-blue-900 mb-2">
            💰 完成評價獲得禮券
          </p>
          <p className="text-xs text-blue-700 mb-3">
            您有 1 次換宿體驗待評價，完成後可獲得便利商店禮券！
          </p>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            立即評價
          </button>
        </div>

        {/* 評價列表 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 text-center">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-2">評價功能開發中</p>
          <p className="text-sm text-gray-400">
            完成換宿後即可在此撰寫評價
          </p>
        </div>
      </div>
    </div>
  );
}