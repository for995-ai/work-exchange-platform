interface CompatibilityScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export function CompatibilityScore({ score, size = 'md' }: CompatibilityScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-700 border-green-200';
    if (score >= 60) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return '高度相符';
    if (score >= 60) return '部分相符';
    return '需留意';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  return (
    <div className={`inline-flex items-center gap-2 rounded-lg border ${getScoreColor(score)} ${sizeClasses[size]}`}>
      <div className="flex items-center gap-1">
        <span>相符度</span>
        <span className="font-medium">{score}%</span>
      </div>
      <span className="text-xs opacity-80">
        {getScoreText(score)}
      </span>
    </div>
  );
}