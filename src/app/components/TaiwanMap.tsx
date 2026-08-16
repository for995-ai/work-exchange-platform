import { Flame, Waves, Compass, Sparkles, MapPin } from 'lucide-react';
import taiwanMapImg from 'figma:asset/03cd59368181db73e5299de56727b15840bd0386.png';

interface EventMarker {
  id: string;
  name: string;
  location: string;
  x: number;
  y: number;
  icon: 'flame' | 'waves' | 'compass' | 'sparkles';
  color: string;
  jobCount: number;
}

interface TaiwanMapProps {
  events: EventMarker[];
  onEventClick: (event: EventMarker) => void;
}

export function TaiwanMap({ events, onEventClick }: TaiwanMapProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'flame':
        return <Flame className="w-4 h-4" />;
      case 'waves':
        return <Waves className="w-4 h-4" />;
      case 'compass':
        return <Compass className="w-4 h-4" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative w-full mx-auto">
      {/* 台灣地圖背景圖片 */}
      <img
        src={taiwanMapImg}
        alt="Taiwan Map"
        className="w-full h-auto"
      />

      {/* 節慶活動標記 */}
      {events.map((event) => (
        <button
          key={event.id}
          onClick={() => onEventClick(event)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: `${event.x}%`, top: `${event.y}%` }}
        >
          {/* 脈動動畫圓圈 */}
          <div className="absolute inset-0 -m-3">
            <div
              className="w-12 h-12 rounded-full animate-ping opacity-75"
              style={{ backgroundColor: event.color + '40' }}
            />
          </div>
          
          {/* 主要圖標 */}
          <div
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transform transition-all group-hover:scale-110"
            style={{ backgroundColor: event.color }}
          >
            {getIcon(event.icon)}
            
            {/* 職缺數量徽章 */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-sm">
              {event.jobCount}
            </div>
          </div>
          
          {/* Hover 提示 */}
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg">
              {event.name}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}