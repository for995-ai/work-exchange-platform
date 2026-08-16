import { Shield, Check } from 'lucide-react';

interface VerifiedBadgeProps {
  isVerified: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function VerifiedBadge({ isVerified, size = 'md' }: VerifiedBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  if (!isVerified) {
    return (
      <div className={`inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 ${sizeClasses[size]}`}>
        <Shield className="w-3 h-3" />
        <span>未驗證</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 ${sizeClasses[size]}`}>
      <Check className="w-3 h-3" />
      <span>政府認證</span>
    </div>
  );
}