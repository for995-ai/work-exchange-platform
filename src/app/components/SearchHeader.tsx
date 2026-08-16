import { Search, Filter, Bell } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterClick: () => void;
  activeFiltersCount?: number;
}

export function SearchHeader({ searchQuery, onSearchChange, onFilterClick, activeFiltersCount = 0 }: SearchHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-white p-4 pb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-medium text-gray-900">作保庇 宿安心</h1>
          <p className="text-sm text-gray-600">找到安心的換宿機會</p>
        </div>
        <button className="p-2 bg-white rounded-full shadow-sm border border-blue-100">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="搜尋職缺、地點或業者..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white border-blue-200 focus:border-blue-400"
          />
        </div>
        <button 
          onClick={onFilterClick}
          className={`p-3 bg-white rounded-lg border transition-colors relative ${
            activeFiltersCount > 0 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-blue-200 hover:bg-blue-50'
          }`}
        >
          <Filter className={`w-5 h-5 ${
            activeFiltersCount > 0 ? 'text-blue-600' : 'text-gray-600'
          }`} />
          {activeFiltersCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500"
            >
              {activeFiltersCount > 9 ? '9+' : activeFiltersCount}
            </Badge>
          )}
        </button>
      </div>
    </div>
  );
}