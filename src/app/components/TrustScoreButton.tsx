import { useState } from 'react';
import { TrendingUp, Crown, Heart, Star, Award, X } from 'lucide-react';
import { Progress } from './ui/progress';

interface Achievement {
  id: string;
  icon: string;
  name: string;
  description: string;
  earned: boolean;
}

interface TrustScoreButtonProps {
  score: number;
  achievements: Achievement[];
}

export function TrustScoreButton({ score, achievements }: TrustScoreButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getAchievementIcon = (icon: string) => {
    switch (icon) {
      case 'crown':
        return <Crown className="w-5 h-5" />;
      case 'heart':
        return <Heart className="w-5 h-5" />;
      case 'star':
        return <Star className="w-5 h-5" />;
      case 'award':
        return <Award className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  const getScoreLevel = (score: number) => {
    if (score >= 90) return { level: '鑽石旅人', color: 'from-blue-500 to-purple-600' };
    if (score >= 70) return { level: '黃金旅人', color: 'from-yellow-400 to-yellow-600' };
    if (score >= 50) return { level: '白銀旅人', color: 'from-gray-300 to-gray-500' };
    return { level: '青銅旅人', color: 'from-orange-400 to-orange-600' };
  };

  const scoreInfo = getScoreLevel(score);
  const earnedAchievements = achievements.filter(a => a.earned);

  return (
    <>
      {/* 懸浮按鈕 */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-3 flex items-center gap-2 hover:shadow-xl transition-all border border-blue-200"
      >
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${scoreInfo.color} flex items-center justify-center`}>
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div className="text-left pr-1">
          <p className="text-xs text-gray-600">信任值</p>
          <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {score}
          </p>
        </div>
      </button>

      {/* 詳細面板 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
          <div className="bg-white w-full md:max-w-md md:mx-4 max-h-[85vh] md:max-h-[90vh] rounded-t-3xl md:rounded-3xl overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 p-5 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center`}>
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">我的信任值</p>
                    <p className="text-white">{scoreInfo.level}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-5xl text-white mb-1">{score}</p>
                <p className="text-sm text-blue-100">/ 100</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto max-h-[calc(85vh-200px)] md:max-h-[calc(90vh-200px)]">
              {/* 進度條 */}
              <div className="mb-6">
                <Progress value={score} className="h-3 mb-2" />
                <p className="text-xs text-center text-gray-500">
                  再 {100 - score} 分達到下一等級
                </p>
              </div>

              {/* 成就徽章 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">我的徽章</h3>
                  <p className="text-sm text-gray-500">{earnedAchievements.length}/{achievements.length}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`${
                        achievement.earned
                          ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200'
                          : 'bg-gray-100 border-2 border-gray-200 opacity-50'
                      } rounded-xl p-4 transition-all`}
                    >
                      <div className={`${achievement.earned ? 'text-blue-600' : 'text-gray-400'} mb-2`}>
                        {getAchievementIcon(achievement.icon)}
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">{achievement.name}</p>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 任務規則 */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200">
                <h3 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                  🎯 提升信任值任務
                </h3>
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">完成換宿並評論</p>
                      <p className="text-xs text-gray-500">撰寫詳細的換宿體驗</p>
                    </div>
                    <div className="text-green-600 font-bold">+10</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">評論被標記有幫助</p>
                      <p className="text-xs text-gray-500">提供有價值的資訊</p>
                    </div>
                    <div className="text-green-600 font-bold">+5</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">驗證身分</p>
                      <p className="text-xs text-gray-500">完成手機或Email驗證</p>
                    </div>
                    <div className="text-green-600 font-bold">+20</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
