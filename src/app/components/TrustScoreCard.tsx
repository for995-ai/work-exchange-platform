import { Crown, Heart, Star, Award, TrendingUp } from 'lucide-react';
import { Progress } from './ui/progress';

interface Achievement {
  id: string;
  icon: string;
  name: string;
  description: string;
  earned: boolean;
}

interface TrustScoreCardProps {
  score: number;
  achievements: Achievement[];
}

export function TrustScoreCard({ score, achievements }: TrustScoreCardProps) {
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
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
      {/* 信任值標題 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${scoreInfo.color} flex items-center justify-center`}>
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">我的信任值</p>
            <p className="text-xs text-gray-500">{scoreInfo.level}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {score}
          </p>
          <p className="text-xs text-gray-500">/ 100</p>
        </div>
      </div>

      {/* 進度條 */}
      <Progress value={score} className="h-2 mb-4" />

      {/* 成就徽章 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700">我的徽章</p>
          <p className="text-xs text-gray-500">{earnedAchievements.length}/{achievements.length}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative group ${
                achievement.earned
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200'
                  : 'bg-gray-100 border-2 border-gray-200 opacity-50'
              } rounded-lg p-2 flex items-center gap-2 transition-all hover:scale-105`}
            >
              <div className={achievement.earned ? 'text-blue-600' : 'text-gray-400'}>
                {getAchievementIcon(achievement.icon)}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                  <p className="font-medium">{achievement.name}</p>
                  <p className="text-gray-300">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 任務提示 */}
      <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
        <p className="text-xs font-medium text-blue-900 mb-2">🎯 提升信任值任務</p>
        <div className="space-y-1 text-xs text-blue-700">
          <p>🔹 完成一次換宿並評論 → +10</p>
          <p>🔹 被其他人標記「評論有幫助」 → +5</p>
          <p>🔹 驗證身分 → +20</p>
        </div>
      </div>
    </div>
  );
}