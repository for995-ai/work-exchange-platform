import { useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';

export interface FilterOptions {
  locations: string[];
  durations: string[];
  isVerified: boolean | null;
  minRating: number;
  minCompatibility: number;
}

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const LOCATIONS = ['台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市', '基隆市', '新竹市', '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義市', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣', '金門縣', '連江縣'];

const DURATIONS = ['1週內', '1-2週', '2-4週', '1-2個月', '2-3個月', '3個月以上'];

export function FilterDialog({ isOpen, onClose, filters, onFiltersChange }: FilterDialogProps) {
  const [tempFilters, setTempFilters] = useState<FilterOptions>(filters);

  if (!isOpen) return null;

  const handleLocationToggle = (location: string) => {
    setTempFilters(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location]
    }));
  };

  const handleDurationToggle = (duration: string) => {
    setTempFilters(prev => ({
      ...prev,
      durations: prev.durations.includes(duration)
        ? prev.durations.filter(d => d !== duration)
        : [...prev.durations, duration]
    }));
  };

  const handleVerificationChange = (verified: boolean | null) => {
    setTempFilters(prev => ({
      ...prev,
      isVerified: verified
    }));
  };

  const handleRatingChange = (rating: number[]) => {
    setTempFilters(prev => ({
      ...prev,
      minRating: rating[0]
    }));
  };

  const handleCompatibilityChange = (compatibility: number[]) => {
    setTempFilters(prev => ({
      ...prev,
      minCompatibility: compatibility[0]
    }));
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      locations: [],
      durations: [],
      isVerified: null,
      minRating: 0,
      minCompatibility: 0
    };
    setTempFilters(resetFilters);
  };

  const handleApply = () => {
    onFiltersChange(tempFilters);
    onClose();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (tempFilters.locations.length > 0) count++;
    if (tempFilters.durations.length > 0) count++;
    if (tempFilters.isVerified !== null) count++;
    if (tempFilters.minRating > 0) count++;
    if (tempFilters.minCompatibility > 0) count++;
    return count;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full max-h-[85vh] rounded-t-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-medium text-gray-900">篩選條件</h2>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {getActiveFiltersCount()} 個條件
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-gray-500"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              重設
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 max-h-[calc(85vh-140px)] overflow-y-auto">
          {/* 地區 */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">地區</h3>
            <div className="grid grid-cols-3 gap-2">
              {LOCATIONS.map((location) => (
                <button
                  key={location}
                  onClick={() => handleLocationToggle(location)}
                  className={`p-2 text-sm rounded-lg border transition-colors ${
                    tempFilters.locations.includes(location)
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          {/* 工作期間 */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">工作期間</h3>
            <div className="grid grid-cols-2 gap-2">
              {DURATIONS.map((duration) => (
                <button
                  key={duration}
                  onClick={() => handleDurationToggle(duration)}
                  className={`p-3 text-sm rounded-lg border transition-colors ${
                    tempFilters.durations.includes(duration)
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>

          {/* 驗證狀態 */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">業者驗證</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleVerificationChange(null)}
                className={`flex items-center gap-3 w-full p-3 rounded-lg border transition-colors ${
                  tempFilters.isVerified === null
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 ${
                  tempFilters.isVerified === null
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {tempFilters.isVerified === null && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
                <span className="text-sm text-gray-700">不限制</span>
              </button>
              
              <button
                onClick={() => handleVerificationChange(true)}
                className={`flex items-center gap-3 w-full p-3 rounded-lg border transition-colors ${
                  tempFilters.isVerified === true
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 ${
                  tempFilters.isVerified === true
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {tempFilters.isVerified === true && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
                <span className="text-sm text-gray-700">僅顯示已驗證業者</span>
              </button>
              
              <button
                onClick={() => handleVerificationChange(false)}
                className={`flex items-center gap-3 w-full p-3 rounded-lg border transition-colors ${
                  tempFilters.isVerified === false
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 ${
                  tempFilters.isVerified === false
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {tempFilters.isVerified === false && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
                <span className="text-sm text-gray-700">僅顯示未驗證業者</span>
              </button>
            </div>
          </div>

          {/* 最低評分 */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              最低評分：{tempFilters.minRating.toFixed(1)} 星以上
            </h3>
            <div className="px-3">
              <Slider
                value={[tempFilters.minRating]}
                onValueChange={handleRatingChange}
                max={5}
                min={0}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>0星</span>
                <span>5星</span>
              </div>
            </div>
          </div>

          {/* 最低相符度 */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              最低相符度：{tempFilters.minCompatibility}% 以上
            </h3>
            <div className="px-3">
              <Slider
                value={[tempFilters.minCompatibility]}
                onValueChange={handleCompatibilityChange}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              取消
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              套用篩選 ({getActiveFiltersCount()})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}