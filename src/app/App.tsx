import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { JobListPage } from './components/JobListPage';
import { ReviewsPage } from './components/ReviewsPage';
import { ProfilePage } from './components/ProfilePage';
import { JobDetail } from './components/JobDetail';
import { BottomNavigation } from './components/BottomNavigation';
import { FavoritesPage, FavoriteFolder } from './components/FavoritesPage';
import { FolderSelectionDialog } from './components/FolderSelectionDialog';
import { FilterOptions } from './components/FilterDialog';

// Mock data
const mockJobs = [
  {
    id: '1',
    title: '山中民宿櫃檯服務',
    businessName: '雲境山莊',
    location: '南投縣',
    duration: '2-4週',
    capacity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1594130139005-3f0c0f0e7c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwaG9zdGVsJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc1OTgyNTc2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isVerified: true,
    rating: 4.5,
    reviewCount: 28,
    compatibilityScore: 85,
    description: '協助民宿櫃檯接待、環境維護，體驗山中生活的寧靜美好。提供溫馨住宿環境與在地美食。',
    requirements: [
      '具備基本英文溝通能力',
      '喜愛與人接觸',
      '能適應山區生活',
      '至少停留2週以上'
    ],
    benefits: [
      '免費住宿',
      '提供三餐',
      '週休一日',
      '協助安排當地景點導覽'
    ],
    workHours: '每日8小時，彈性排班',
    accommodation: '雙人房，提供基本設備',
    meals: '提供早、中、晚三餐',
    contact: {
      phone: '049-123-4567',
      email: 'contact@yunching.com'
    }
  },
  {
    id: '2',
    title: '廟宇文化導覽助手',
    businessName: '天后宮文化園區',
    location: '台南市',
    duration: '1-2週',
    capacity: 3,
    imageUrl: 'https://images.unsplash.com/photo-1596534633455-a2e1c12a8e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHRhaXdhbmVzZSUyMHRlbXBsZXxlbnwxfHx8fDE3NTk4MjU3NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isVerified: true,
    rating: 4.2,
    reviewCount: 15,
    compatibilityScore: 78,
    description: '協助廟宇導覽解說、文物整理，深度體驗台灣傳統宗教文化，學習歷史知識。',
    requirements: [
      '對台灣傳統文化有興趣',
      '具備基本導覽能力',
      '尊重宗教信仰',
      '能配合廟宇作息時間'
    ],
    benefits: [
      '文化學習機會',
      '免費住宿',
      '提供素食餐點',
      '參與傳統祭典活動'
    ],
    workHours: '每日6小時，配合廟宇開放時間',
    accommodation: '通鋪式住宿，男女分房',
    meals: '提供素食三餐',
    contact: {
      phone: '06-789-0123',
      email: 'culture@tianhou.org.tw'
    }
  },
  {
    id: '3',
    title: '高山咖啡廳服務員',
    businessName: '雲海咖啡屋',
    location: '花蓮縣',
    duration: '2-4週',
    capacity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1607858413180-acb5d6ce2627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhZmUlMjB0YWl3YW4lMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NTk4MjU3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isVerified: false,
    rating: 3.8,
    reviewCount: 12,
    compatibilityScore: 65,
    description: '在海拔1200公尺的高山咖啡廳工作，享受雲海美景，學習咖啡製作技術。',
    requirements: [
      '具備咖啡製作基礎',
      '能適應高海拔環境',
      '喜愛自然環境',
      '具備服務熱忱'
    ],
    benefits: [
      '學習專業咖啡技術',
      '欣賞絕美山景',
      '提供住宿',
      '咖啡相關產品折扣'
    ],
    workHours: '每日7小時，週休一日',
    accommodation: '小木屋住宿，與其他員工共住',
    meals: '提供早餐，午晚餐自理',
    contact: {
      phone: '03-456-7890',
      email: 'mountain@cloudcafe.com.tw'
    }
  },
  {
    id: '4',
    title: '海濱民宿接待',
    businessName: '藍天海景民宿',
    location: '台東縣',
    duration: '1週內',
    capacity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHZpZXclMjByZXNvcnR8ZW58MXx8fHwxNzU5ODI1NzcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isVerified: true,
    rating: 4.8,
    reviewCount: 35,
    compatibilityScore: 92,
    description: '協助海邊民宿的接待工作，享受無敵海景和悠閒的度假氛圍。',
    requirements: [
      '喜愛海洋環境',
      '具備接待經驗',
      '能游泳者佳',
      '配合假日工作'
    ],
    benefits: [
      '免費住宿',
      '提供三餐',
      '免費水上活動',
      '彈性工作時間'
    ],
    workHours: '每日6小時，輪班制',
    accommodation: '海景雙人房',
    meals: '提供三餐及下午茶',
    contact: {
      phone: '089-123-456',
      email: 'info@bluesky.com.tw'
    }
  },
  {
    id: '5',
    title: '農場體驗助手',
    businessName: '綠田有機農場',
    location: '宜蘭縣',
    duration: '1-2個月',
    capacity: 4,
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmFybSUyMHRhaXdhbnxlbnwxfHx8fDE3NTk4MjU3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isVerified: true,
    rating: 4.3,
    reviewCount: 22,
    compatibilityScore: 75,
    description: '參與有機農場的日常作業，學習永續農業知識，體驗田園生活。',
    requirements: [
      '不怕髒不怕累',
      '對農業有興趣',
      '能早起工作',
      '具備體力勞動能力'
    ],
    benefits: [
      '學習有機農業',
      '免費住宿',
      '提供有機蔬果',
      '參與農產品販售'
    ],
    workHours: '每日5小時，配合農事時間',
    accommodation: '農舍通鋪，男女分房',
    meals: '提供有機素食三餐',
    contact: {
      phone: '03-987-6543',
      email: 'green@organicfarm.tw'
    }
  },
  {
    id: '6',
    title: '城市青旅管理',
    businessName: '台北背包客棧',
    location: '台北市',
    duration: '3個月以上',
    capacity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjByZWNlcHRpb24lMjB0YWlwZWl8ZW58MXx8fHwxNzU5ODI1Nzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isVerified: false,
    rating: 3.5,
    reviewCount: 18,
    compatibilityScore: 55,
    description: '管理台北市中心的背包客棧，接觸來自世界各地的旅客。',
    requirements: [
      '英文流利',
      '具備管理經驗',
      '樂於助人',
      '能處理緊急狀況'
    ],
    benefits: [
      '國際化環境',
      '免費住宿',
      '語言交流機會',
      '城市生活便利'
    ],
    workHours: '每日8小時，三班制',
    accommodation: '員工宿舍單人房',
    meals: '早餐提供，其他自理',
    contact: {
      phone: '02-123-4567',
      email: 'taipei@backpackers.com'
    }
  }
];

const mockReviews = [
  {
    id: '1',
    userName: '旅行愛好者',
    date: '2024年9月',
    workRating: 4,
    accommodationRating: 5,
    trustRating: 5,
    comment: '業者非常親切，住宿環境乾淨舒適，工作內容也與描述相符。山上的空氣很好，是很棒的體驗！'
  },
  {
    id: '2',
    userName: '大學生小雯',
    date: '2024年8月',
    workRating: 4,
    accommodationRating: 4,
    trustRating: 4,
    comment: '整體來說是不錯的經驗，學到很多民宿經營的知識。唯一小缺點是網路訊號比較弱。'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [favoriteJobIds, setFavoriteJobIds] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState<string | undefined>(undefined);
  const [filters, setFilters] = useState<FilterOptions>({
    locations: [],
    durations: [],
    isVerified: null,
    minRating: 0,
    minCompatibility: 0
  });

  // 資料夾狀態管理
  const [favoriteFolders, setFavoriteFolders] = useState<FavoriteFolder[]>([
    {
      id: '1',
      name: '夏季換宿',
      color: '#3b82f6',
      jobIds: []
    }
  ]);

  // 資料夾選擇對話框狀態
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [selectedJobForFolder, setSelectedJobForFolder] = useState<string | null>(null);
  const [shouldOpenCreateFolder, setShouldOpenCreateFolder] = useState(false);

  const handleJobClick = (jobId: string) => {
    setSelectedJob(jobId);
  };

  const handleBackToList = () => {
    setSelectedJob(null);
  };

  const handleApply = () => {
    alert('申請功能需要後端支援，將在連接資料庫後實現');
  };

  const handleReport = () => {
    alert('檢舉功能需要後端支援，將在連接資料庫後實現');
  };

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleToggleFavorite = (jobId: string) => {
    // 如果已經收藏，則取消收藏（從所有資料夾移除）
    if (favoriteJobIds.includes(jobId)) {
      setFavoriteJobIds(prev => prev.filter(id => id !== jobId));
      // 從所有資料夾中移除
      setFavoriteFolders(prev =>
        prev.map(folder => ({
          ...folder,
          jobIds: folder.jobIds.filter(id => id !== jobId)
        }))
      );
    } else {
      // 如果未收藏，打開資料夾選擇對話框
      setFavoriteJobIds(prev => [...prev, jobId]);
      setSelectedJobForFolder(jobId);
      setFolderDialogOpen(true);
    }
  };

  // 在收藏頁面使用的特殊處理函數：總是打開資料夾選擇對話框
  const handleFavoritePageToggle = (jobId: string) => {
    setSelectedJobForFolder(jobId);
    setFolderDialogOpen(true);
  };

  // 從對話框中取消收藏
  const handleRemoveFavoriteFromDialog = (jobId: string) => {
    setFavoriteJobIds(prev => prev.filter(id => id !== jobId));
    // 從所有資料夾中移除
    setFavoriteFolders(prev =>
      prev.map(folder => ({
        ...folder,
        jobIds: folder.jobIds.filter(id => id !== jobId)
      }))
    );
  };

  const handleViewAllJobs = (location?: string) => {
    setLocationFilter(location);
    setActiveTab('search');
  };

  // 資料夾管理函數
  const handleCreateFolder = (name: string, color: string) => {
    const newFolder: FavoriteFolder = {
      id: Date.now().toString(),
      name,
      color,
      jobIds: []
    };
    setFavoriteFolders(prev => [...prev, newFolder]);
  };

  const handleDeleteFolder = (folderId: string) => {
    setFavoriteFolders(prev => prev.filter(folder => folder.id !== folderId));
  };

  const handleRenameFolder = (folderId: string, newName: string) => {
    setFavoriteFolders(prev => 
      prev.map(folder => 
        folder.id === folderId ? { ...folder, name: newName } : folder
      )
    );
  };

  const handleAddJobToFolder = (jobId: string, folderId: string) => {
    setFavoriteFolders(prev =>
      prev.map(folder =>
        folder.id === folderId
          ? { ...folder, jobIds: [...folder.jobIds, jobId] }
          : folder
      )
    );
  };

  const handleRemoveJobFromFolder = (jobId: string, folderId: string) => {
    setFavoriteFolders(prev =>
      prev.map(folder =>
        folder.id === folderId
          ? { ...folder, jobIds: folder.jobIds.filter(id => id !== jobId) }
          : folder
      )
    );
  };

  const handleFolderDialogClose = () => {
    setFolderDialogOpen(false);
    setSelectedJobForFolder(null);
    
    // 如果需要打開新增資料夾對話框
    if (shouldOpenCreateFolder) {
      setShouldOpenCreateFolder(false);
      // 這裡可以觸發 FavoritesPage 的新增資料夾功能
      // 由於我們不在 FavoritesPage 中，所以這個功能在此實現有限
      // 用戶需要在收藏頁面手動新增資料夾
    }
  };

  const favoriteJobs = mockJobs.filter(job => favoriteJobIds.includes(job.id));

  // 如果有選擇職缺，顯示職缺詳情
  if (selectedJob) {
    const job = mockJobs.find(j => j.id === selectedJob);
    if (job) {
      return (
        <JobDetail
          job={job}
          reviews={mockReviews}
          onBack={handleBackToList}
          onApply={handleApply}
          onReport={handleReport}
          isFavorited={favoriteJobIds.includes(job.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }
  }

  // 根據 activeTab 渲染對應的頁面
  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            jobs={mockJobs}
            onJobClick={handleJobClick}
            onViewAllJobs={handleViewAllJobs}
          />
        );
      
      case 'search':
        return (
          <JobListPage
            jobs={mockJobs}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFiltersChange={setFilters}
            isFilterOpen={isFilterOpen}
            onFilterClick={handleFilterClick}
            onFilterClose={() => setIsFilterOpen(false)}
            onJobClick={handleJobClick}
            favoriteJobIds={favoriteJobIds}
            onToggleFavorite={handleToggleFavorite}
            locationFilter={locationFilter}
          />
        );
      
      case 'favorites':
        return (
          <FavoritesPage
            favoriteJobs={favoriteJobs}
            onJobClick={handleJobClick}
            onToggleFavorite={handleFavoritePageToggle}
            folders={favoriteFolders}
            onCreateFolder={handleCreateFolder}
            onDeleteFolder={handleDeleteFolder}
            onRenameFolder={handleRenameFolder}
            onAddJobToFolder={handleAddJobToFolder}
            onRemoveJobFromFolder={handleRemoveJobFromFolder}
          />
        );
      
      case 'reviews':
        return <ReviewsPage />;
      
      case 'profile':
        return <ProfilePage />;
      
      default:
        return (
          <HomePage
            jobs={mockJobs}
            onJobClick={handleJobClick}
            onViewAllJobs={handleViewAllJobs}
          />
        );
    }
  };

  const selectedJobTitle = selectedJobForFolder 
    ? mockJobs.find(j => j.id === selectedJobForFolder)?.title || ''
    : '';

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          // 切換到搜尋頁面時清除地區過濾
          if (tab === 'search' && activeTab !== 'search') {
            setLocationFilter(undefined);
          }
        }}
        favoriteCount={favoriteJobIds.length}
      />

      {/* 資料夾選擇對話框 */}
      {selectedJobForFolder && (
        <FolderSelectionDialog
          isOpen={folderDialogOpen}
          onClose={handleFolderDialogClose}
          jobId={selectedJobForFolder}
          jobTitle={selectedJobTitle}
          folders={favoriteFolders}
          onSelectFolder={handleAddJobToFolder}
          onRemoveFromFolder={handleRemoveJobFromFolder}
          onCreateNewFolder={() => {
            setShouldOpenCreateFolder(true);
            setActiveTab('favorites');
          }}
          onRemoveFavorite={activeTab === 'favorites' ? handleRemoveFavoriteFromDialog : undefined}
        />
      )}
    </div>
  );
}
