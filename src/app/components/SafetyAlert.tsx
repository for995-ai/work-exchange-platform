import { Shield, AlertTriangle, Download, TrendingUp, CheckCircle } from 'lucide-react';

interface SafetyNews {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
  date: string;
}

interface SafetyAlertProps {
  news: SafetyNews[];
}

export function SafetyAlert({ news }: SafetyAlertProps) {
  const getNewsIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNewsStyle = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
      {/* 標題與吉祥物 */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">保庇仔守護站</h3>
          <p className="text-xs text-gray-500">讓你安心換宿</p>
        </div>
      </div>

      {/* 出發前檢查清單 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4 border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
            <Download className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">
              出發前檢查清單
            </p>
            <p className="text-xs text-gray-600 mb-2">
              確認合約、保險、交通安排
            </p>
            <button className="text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
              🔗 一鍵下載清單
            </button>
          </div>
        </div>
      </div>

      {/* 安全快報列表 */}
      <div className="space-y-3">
        {news.map((item) => (
          <div
            key={item.id}
            className={`${getNewsStyle(item.type)} rounded-lg p-3 border transition-all hover:shadow-sm`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getNewsIcon(item.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-gray-900">
                    {item.title}
                  </p>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {item.date}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 平台保護聲明 */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-center text-gray-500">
          🛡️ 作保庇平台持續監控，主動保護使用者權益
        </p>
      </div>
    </div>
  );
}