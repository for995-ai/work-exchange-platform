import { useState } from 'react';
import { Shield, AlertTriangle, Download, TrendingUp, CheckCircle, X } from 'lucide-react';

interface SafetyNews {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
  date: string;
}

interface SafetyAlertButtonProps {
  news: SafetyNews[];
}

export function SafetyAlertButton({ news }: SafetyAlertButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      {/* 懸浮按鈕 */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-3 hover:shadow-xl transition-all border border-blue-200 flex items-center gap-2"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-md">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div className="text-left pr-1">
          <p className="text-xs text-gray-600">保庇仔</p>
          <p className="text-xs font-medium text-gray-900">守護站</p>
        </div>
      </button>

      {/* 詳細面板 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
          <div className="bg-white w-full md:max-w-md md:mx-4 max-h-[85vh] md:max-h-[90vh] rounded-t-3xl md:rounded-3xl overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-400 to-purple-500 p-5 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white">保庇仔守護站</h3>
                    <p className="text-sm text-blue-100">讓你安心換宿</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto max-h-[calc(85vh-140px)] md:max-h-[calc(90vh-140px)]">
              {/* 出發前檢查清單 */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-5 border-2 border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <Download className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">
                      📋 出發前檢查清單
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      確認合約、保險、交通安排
                    </p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      🔗 一鍵下載清單
                    </button>
                  </div>
                </div>
              </div>

              {/* 安全快報標題 */}
              <h4 className="font-medium text-gray-900 mb-3">📰 安全快報</h4>

              {/* 安全快報列表 */}
              <div className="space-y-3 mb-5">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className={`${getNewsStyle(item.type)} rounded-xl p-4 border-2 transition-all`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNewsIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-medium text-gray-900">
                            {item.title}
                          </p>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {item.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 平台保護聲明 */}
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  🛡️ 作保庇平台持續監控
                </p>
                <p className="text-xs text-gray-500">
                  主動保護使用者權益，打造安全換宿環境
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
