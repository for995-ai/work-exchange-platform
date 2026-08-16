import { SearchHeader } from './SearchHeader';
import { JobCard } from './JobCard';
import { FilterDialog, FilterOptions } from './FilterDialog';

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

interface JobListPageProps {
  jobs: Job[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isFilterOpen: boolean;
  onFilterClick: () => void;
  onFilterClose: () => void;
  onJobClick: (jobId: string) => void;
  favoriteJobIds: string[];
  onToggleFavorite: (jobId: string) => void;
  locationFilter?: string;
}

export function JobListPage({
  jobs,
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  isFilterOpen,
  onFilterClick,
  onFilterClose,
  onJobClick,
  favoriteJobIds,
  onToggleFavorite,
  locationFilter
}: JobListPageProps) {
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.locations.length > 0) count++;
    if (filters.durations.length > 0) count++;
    if (filters.isVerified !== null) count++;
    if (filters.minRating > 0) count++;
    if (filters.minCompatibility > 0) count++;
    return count;
  };

  const filteredJobs = jobs.filter(job => {
    // 文字搜尋
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    // 地區篩選
    const matchesLocation = filters.locations.length === 0 || 
      filters.locations.some(location => job.location.includes(location));

    // 額外的地區過濾（從首頁來的）
    const matchesLocationFilter = !locationFilter || 
      job.location.includes(locationFilter);

    // 工作期間篩選
    const matchesDuration = filters.durations.length === 0 || 
      filters.durations.includes(job.duration);

    // 驗證狀態篩選
    const matchesVerification = filters.isVerified === null || 
      job.isVerified === filters.isVerified;

    // 評分篩選
    const matchesRating = job.rating >= filters.minRating;

    // 相符度篩選
    const matchesCompatibility = job.compatibilityScore >= filters.minCompatibility;

    return matchesSearch && matchesLocation && matchesDuration && 
           matchesVerification && matchesRating && matchesCompatibility &&
           matchesLocationFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onFilterClick={onFilterClick}
        activeFiltersCount={getActiveFiltersCount()}
      />
      
      <FilterDialog
        isOpen={isFilterOpen}
        onClose={onFilterClose}
        filters={filters}
        onFiltersChange={onFiltersChange}
      />
      
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              {locationFilter ? `${locationFilter}換宿職缺` : '推薦職缺'}
            </h2>
            {locationFilter && (
              <p className="text-sm text-gray-500 mt-0.5">探索當地換宿機會</p>
            )}
          </div>
          <span className="text-sm text-gray-500">{filteredJobs.length} 個職缺</span>
        </div>
        
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              {...job}
              onClick={onJobClick}
              isFavorited={favoriteJobIds.includes(job.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
        
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">沒有找到符合條件的職缺</p>
            <p className="text-gray-400 text-sm mt-1">試試調整搜尋條件</p>
          </div>
        )}
      </div>
    </div>
  );
}