import { useState } from 'react';
import { Heart, Folder, Plus, MoreVertical, Edit2, Trash2, FolderOpen } from 'lucide-react';
import { JobCard } from './JobCard';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

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
  description: string;
}

export interface FavoriteFolder {
  id: string;
  name: string;
  color: string;
  jobIds: string[];
}

interface FavoritesPageProps {
  favoriteJobs: Job[];
  onJobClick: (jobId: string) => void;
  onToggleFavorite: (jobId: string) => void;
  folders: FavoriteFolder[];
  onCreateFolder: (name: string, color: string) => void;
  onDeleteFolder: (folderId: string) => void;
  onRenameFolder: (folderId: string, newName: string) => void;
  onAddJobToFolder: (jobId: string, folderId: string) => void;
  onRemoveJobFromFolder: (jobId: string, folderId: string) => void;
}

const folderColors = [
  { name: '藍色', value: '#3b82f6', bg: 'bg-blue-500', light: 'bg-blue-50' },
  { name: '紫色', value: '#8b5cf6', bg: 'bg-purple-500', light: 'bg-purple-50' },
  { name: '綠色', value: '#10b981', bg: 'bg-green-500', light: 'bg-green-50' },
  { name: '橙色', value: '#f97316', bg: 'bg-orange-500', light: 'bg-orange-50' },
  { name: '粉色', value: '#ec4899', bg: 'bg-pink-500', light: 'bg-pink-50' },
  { name: '青色', value: '#06b6d4', bg: 'bg-cyan-500', light: 'bg-cyan-50' },
];

export function FavoritesPage({ 
  favoriteJobs, 
  onJobClick, 
  onToggleFavorite,
  folders,
  onCreateFolder,
  onDeleteFolder,
  onRenameFolder,
  onAddJobToFolder,
  onRemoveJobFromFolder
}: FavoritesPageProps) {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedColor, setSelectedColor] = useState(folderColors[0].value);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim(), selectedColor);
      setNewFolderName('');
      setSelectedColor(folderColors[0].value);
      setIsCreatingFolder(false);
    }
  };

  const handleRenameFolder = (folderId: string) => {
    if (editingName.trim()) {
      onRenameFolder(folderId, editingName.trim());
      setEditingFolderId(null);
      setEditingName('');
    }
  };

  const getColorClasses = (color: string) => {
    const colorObj = folderColors.find(c => c.value === color);
    return colorObj || folderColors[0];
  };

  // 獲取未分類的職缺（不在任何資料夾中的）
  const uncategorizedJobs = favoriteJobs.filter(job => 
    !folders.some(folder => folder.jobIds.includes(job.id))
  );

  // 獲取當前顯示的職缺
  const displayJobs = selectedFolderId === null 
    ? favoriteJobs  // 顯示全部收藏
    : favoriteJobs.filter(job => {
        const folder = folders.find(f => f.id === selectedFolderId);
        return folder?.jobIds.includes(job.id);
      });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-full">
              <Heart className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-xl font-medium text-gray-900">我的收藏</h1>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsCreatingFolder(true)}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            新增資料夾
          </Button>
        </div>

        {/* 資料夾列表 */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {/* 全部收藏 */}
          <button
            onClick={() => setSelectedFolderId(null)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedFolderId === null
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-400'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm">全部收藏</span>
            <span className="text-xs bg-white/70 px-2 py-0.5 rounded-full">
              {favoriteJobs.length}
            </span>
          </button>

          {/* 資料夾 */}
          {folders.map((folder) => {
            const colorClasses = getColorClasses(folder.color);
            return (
              <div key={folder.id} className="relative group">
                <button
                  onClick={() => setSelectedFolderId(selectedFolderId === folder.id ? null : folder.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedFolderId === folder.id
                      ? `${colorClasses.light} border-2`
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  style={selectedFolderId === folder.id ? { borderColor: folder.color } : {}}
                >
                  <Folder className="w-4 h-4" style={{ color: folder.color }} />
                  <span className="text-sm">{folder.name}</span>
                  <span className="text-xs bg-white/70 px-2 py-0.5 rounded-full">
                    {folder.jobIds.length}
                  </span>
                </button>

                {/* 資料夾選單 */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-3 h-3 text-gray-600" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingFolderId(folder.id);
                        setEditingName(folder.name);
                      }}
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      重新命名
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDeleteFolder(folder.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      刪除資料夾
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {favoriteJobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="p-4 bg-blue-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Heart className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">還沒有收藏任何職缺</h3>
            <p className="text-gray-500 text-sm">點擊職缺卡片上的愛心圖示來收���您感興趣的換宿機會</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {selectedFolderId === null 
                  ? `全部收藏 ${displayJobs.length} 個職缺`
                  : `${folders.find(f => f.id === selectedFolderId)?.name} - ${displayJobs.length} 個職缺`
                }
              </p>
            </div>

            <div className="space-y-4">
              {displayJobs.map((job) => (
                <JobCard
                  key={job.id}
                  {...job}
                  onClick={onJobClick}
                  isFavorited={true}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>

            {displayJobs.length === 0 && (
              <div className="text-center py-12">
                <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">此資料夾沒有職缺</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* 新增資料夾對話框 */}
      {isCreatingFolder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">新增資料夾</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">資料夾名稱</label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="例如：夏季換宿、海邊民宿..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">選擇顏色</label>
                <div className="grid grid-cols-6 gap-2">
                  {folderColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-10 h-10 rounded-lg ${color.bg} flex items-center justify-center transition-transform ${
                        selectedColor === color.value ? 'ring-2 ring-offset-2 scale-110' : ''
                      }`}
                      style={{ ringColor: color.value }}
                    >
                      {selectedColor === color.value && (
                        <span className="text-white">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreatingFolder(false);
                  setNewFolderName('');
                  setSelectedColor(folderColors[0].value);
                }}
                className="flex-1"
              >
                取消
              </Button>
              <Button
                onClick={handleCreateFolder}
                disabled={!newFolderName.trim()}
                className="flex-1"
              >
                建立
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 重新命名資料夾對話框 */}
      {editingFolderId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">重新命名資料夾</h3>
            
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingFolderId(null);
                  setEditingName('');
                }}
                className="flex-1"
              >
                取消
              </Button>
              <Button
                onClick={() => handleRenameFolder(editingFolderId)}
                disabled={!editingName.trim()}
                className="flex-1"
              >
                確定
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
