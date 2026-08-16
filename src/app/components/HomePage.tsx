import { useState } from 'react';
import { Bell } from 'lucide-react';
import { TaiwanMap } from './TaiwanMap';
import { TrustScoreButton } from './TrustScoreButton';
import { SafetyAlertButton } from './SafetyAlertButton';
import { EventModal } from './EventModal';

interface EventMarker {
  id: string;
  name: string;
  location: string;
  x: number;
  y: number;
  icon: 'flame' | 'waves' | 'compass' | 'sparkles';
  color: string;
  jobCount: number;
  period: string;
  description: string;
  nearbyJobIds: string[];
}

interface Job {
  id: string;
  title: string;
  businessName: string;
  location: string;
  duration: string;
  capacity: number;
  imageUrl: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  compatibilityScore: number;
}

interface HomePageProps {
  jobs: Job[];
  onJobClick: (jobId: string) => void;
  onViewAllJobs: (location?: string) => void;
}

// Mock 活動數據
const mockEvents: EventMarker[] = [
  {
    id: '1',
    name: '台東國際熱氣球嘉年華',
    location: '台東縣',
    x: 68,
    y: 72,
    icon: 'flame',
    color: '#f97316',
    jobCount: 5,
    period: '2025年6月-8月',
    description: '每年夏天在台東鹿野高台舉辦的熱氣球盛會，吸引國內外遊客前來體驗熱氣球自由飛行的魅力。活動期間有音樂會、市集等精彩節目。',
    nearbyJobIds: ['4', '5']
  },
  {
    id: '2',
    name: '平溪天燈節',
    location: '新北市',
    x: 58,
    y: 22,
    icon: 'sparkles',
    color: '#8b5cf6',
    jobCount: 3,
    period: '2025年元宵節',
    description: '元宵節期間在平溪舉辦的傳統天燈施放活動，數千盞天燈同時升空，場面壯觀動人，是台灣最具代表性的節慶活動之一。',
    nearbyJobIds: ['1', '6']
  },
  {
    id: '3',
    name: '澎湖花火節',
    location: '澎湖縣',
    x: 18,
    y: 48,
    icon: 'waves',
    color: '#06b6d4',
    jobCount: 4,
    period: '2025年4月-6月',
    description: '在澎湖觀音亭海濱舉辦的煙火盛會，結合音樂與海景，每週施放精彩煙火秀，是夏季到澎湖旅遊的必看活動。',
    nearbyJobIds: ['2', '3']
  },
  {
    id: '4',
    name: '日月潭花火音樂嘉年華',
    location: '南投縣',
    x: 52,
    y: 48,
    icon: 'compass',
    color: '#10b981',
    jobCount: 6,
    period: '2025年10月-11月',
    description: '在美麗的日月潭畔舉辦的音樂與煙火活動，結合在地原住民文化，呈現獨特的山水煙火秀。',
    nearbyJobIds: ['1', '5']
  }
];

const mockAchievements = [
  {
    id: '1',
    icon: 'crown',
    name: '誠信旅人',
    description: '完成5次換宿並獲得好評',
    earned: true
  },
  {
    id: '2',
    icon: 'heart',
    name: '友善房東',
    description: '給予10次有幫助的評價',
    earned: true
  },
  {
    id: '3',
    icon: 'star',
    name: '探險家',
    description: '體驗3個不同縣市的換宿',
    earned: false
  },
  {
    id: '4',
    icon: 'award',
    name: '資深旅人',
    description: '完成20次換宿體驗',
    earned: false
  }
];

const mockSafetyNews = [
  {
    id: '1',
    type: 'success' as const,
    title: '房東評價更新',
    description: '近期誠信旅人標記了 3 篇幫助評價',
    date: '今天'
  },
  {
    id: '2',
    type: 'warning' as const,
    title: '近期遭檢舉之換宿點 ⚠️',
    description: '平台已下架 2 家業者，持續監控中',
    date: '昨天'
  },
  {
    id: '3',
    type: 'info' as const,
    title: '平台安全提醒',
    description: '記得與業者簽訂書面合約，保障雙方權益',
    date: '3天前'
  }
];

export function HomePage({ jobs, onJobClick, onViewAllJobs }: HomePageProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventMarker | null>(null);

  const handleEventClick = (event: EventMarker) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleViewAllJobs = () => {
    if (selectedEvent) {
      onViewAllJobs(selectedEvent.location);
    }
    setSelectedEvent(null);
  };

  const getNearbyJobs = (jobIds: string[]) => {
    return jobs.filter(job => jobIds.includes(job.id));
  };

  return (
    <div className="relative min-h-screen bg-[#d4e9d7] pb-16 overflow-hidden">
      {/* 頂部標題欄 */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-[#d4e9d7]/95 to-transparent backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl text-gray-900">作保庇 宿安心</h1>
            <p className="text-sm text-gray-700">即時觀光地圖 · 節慶換宿連動</p>
          </div>
          <button className="p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm">
            <Bell className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* 台灣地圖 - 全屏背景 */}
      <div className="absolute inset-0 flex items-center justify-center pt-16 pb-16">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[95%] max-w-3xl">
            <TaiwanMap events={mockEvents} onEventClick={handleEventClick} />
          </div>
        </div>
      </div>

      {/* 圖例說明 - 底部 */}
      <div className="absolute bottom-20 left-0 right-0 z-30 px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md max-w-md mx-auto">
          <p className="text-xs text-gray-700 mb-2 text-center">點擊圖標查看節慶活動與周邊換宿</p>
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                🔥
              </div>
              <span className="text-gray-700 text-center">文化節慶</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white">
                🌊
              </div>
              <span className="text-gray-700 text-center">海洋活動</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                🧭
              </div>
              <span className="text-gray-700 text-center">山林探險</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white">
                ✨
              </div>
              <span className="text-gray-700 text-center">特色慶典</span>
            </div>
          </div>
        </div>
      </div>

      {/* 右側懸浮按鈕組 */}
      <div className="fixed top-4 right-4 z-40 flex flex-col gap-3">
        {/* 信任值按鈕 */}
        <TrustScoreButton score={85} achievements={mockAchievements} />
        
        {/* 保庇仔守護站按鈕 */}
        <SafetyAlertButton news={mockSafetyNews} />
      </div>

      {/* 活動詳情彈窗 */}
      {selectedEvent && (
        <EventModal
          isOpen={!!selectedEvent}
          onClose={handleCloseModal}
          eventName={selectedEvent.name}
          eventLocation={selectedEvent.location}
          eventPeriod={selectedEvent.period}
          eventDescription={selectedEvent.description}
          nearbyJobs={getNearbyJobs(selectedEvent.nearbyJobIds)}
          onJobClick={(jobId) => {
            onJobClick(jobId);
            handleCloseModal();
          }}
          onViewAllJobs={handleViewAllJobs}
        />
      )}
    </div>
  );
}
