import { Folder, Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { FavoriteFolder } from './FavoritesPage';

interface FolderSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
  folders: FavoriteFolder[];
  onSelectFolder: (jobId: string, folderId: string) => void;
  onRemoveFromFolder: (jobId: string, folderId: string) => void;
  onCreateNewFolder: () => void;
  onRemoveFavorite?: (jobId: string) => void;
}

const folderColors = [
  { value: '#3b82f6', bg: 'bg-blue-500', light: 'bg-blue-50' },
  { value: '#8b5cf6', bg: 'bg-purple-500', light: 'bg-purple-50' },
  { value: '#10b981', bg: 'bg-green-500', light: 'bg-green-50' },
  { value: '#f97316', bg: 'bg-orange-500', light: 'bg-orange-50' },
  { value: '#ec4899', bg: 'bg-pink-500', light: 'bg-pink-50' },
  { value: '#06b6d4', bg: 'bg-cyan-500', light: 'bg-cyan-50' },
];

export function FolderSelectionDialog({
  isOpen,
  onClose,
  jobId,
  jobTitle,
  folders,
  onSelectFolder,
  onRemoveFromFolder,
  onCreateNewFolder,
  onRemoveFavorite
}: FolderSelectionDialogProps) {
  if (!isOpen) return null;

  const getColorClasses = (color: string) => {
    const colorObj = folderColors.find(c => c.value === color);
    return colorObj || folderColors[0];
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
      <div className="bg-white w-full md:max-w-md md:mx-4 max-h-[80vh] rounded-t-3xl md:rounded-3xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 p-5 z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-8">
              <h3 className="text-white font-medium mb-1">加入收藏資料夾</h3>
              <p className="text-sm text-blue-100 line-clamp-1">{jobTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[calc(80vh-140px)]">
          {/* 未分類選項 */}
          <div className="mb-4">
            <button
              onClick={() => {
                // 如果職缺在任何資料夾中，先移除
                folders.forEach(folder => {
                  if (folder.jobIds.includes(jobId)) {
                    onRemoveFromFolder(jobId, folder.id);
                  }
                });
                onClose();
              }}
              className="w-full bg-gray-100 hover:bg-gray-200 rounded-xl p-4 flex items-center gap-3 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center">
                <Folder className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900">未分類</p>
                <p className="text-xs text-gray-600">不加入任何資料夾</p>
              </div>
            </button>
          </div>

          {/* 取消收藏選項 (僅在提供 onRemoveFavorite 時顯示) */}
          {onRemoveFavorite && (
            <div className="mb-4">
              <button
                onClick={() => {
                  onRemoveFavorite(jobId);
                  onClose();
                }}
                className="w-full bg-red-50 hover:bg-red-100 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3 transition-colors"
              >
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-red-900">取消收藏</p>
                  <p className="text-xs text-red-600">從收藏中完全移除</p>
                </div>
              </button>
            </div>
          )}

          {/* 資料夾列表 */}
          <div className="space-y-3 mb-4">
            {folders.map((folder) => {
              const isInFolder = folder.jobIds.includes(jobId);
              const colorClasses = getColorClasses(folder.color);

              return (
                <button
                  key={folder.id}
                  onClick={() => {
                    if (isInFolder) {
                      onRemoveFromFolder(jobId, folder.id);
                    } else {
                      onSelectFolder(jobId, folder.id);
                    }
                  }}
                  className={`w-full rounded-xl p-4 flex items-center gap-3 transition-all ${
                    isInFolder
                      ? `${colorClasses.light} border-2`
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                  style={isInFolder ? { borderColor: folder.color } : {}}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: folder.color + '20' }}
                  >
                    <Folder className="w-5 h-5" style={{ color: folder.color }} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">{folder.name}</p>
                    <p className="text-xs text-gray-600">{folder.jobIds.length} 個職缺</p>
                  </div>
                  {isInFolder && (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* 新增資料夾按鈕 */}
          <button
            onClick={() => {
              onCreateNewFolder();
              onClose();
            }}
            className="w-full bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 border-dashed rounded-xl p-4 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-600">新增資料夾</span>
          </button>

          {folders.length === 0 && (
            <p className="text-center text-sm text-gray-500 mt-4">
              尚未建立資料夾，點擊上方按鈕新增
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            完成
          </Button>
        </div>
      </div>
    </div>
  );
}
