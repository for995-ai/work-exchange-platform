import { Avatar, AvatarFallback } from './ui/avatar';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  id: string;
  userName: string;
  date: string;
  workRating: number;
  accommodationRating: number;
  trustRating: number;
  comment: string;
  isAnonymous?: boolean;
}

export function ReviewCard({
  userName,
  date,
  workRating,
  accommodationRating,
  trustRating,
  comment,
  isAnonymous = true
}: ReviewCardProps) {
  const overallRating = (workRating + accommodationRating + trustRating) / 3;
  
  return (
    <div className="bg-white rounded-xl border border-blue-100 p-4">
      <div className="flex items-start gap-3 mb-3">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-blue-100 text-blue-600">
            {isAnonymous ? '匿' : userName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-gray-900">
              {isAnonymous ? '匿名換宿者' : userName}
            </p>
            <span className="text-xs text-gray-500">{date}</span>
          </div>
          <StarRating rating={overallRating} size="sm" />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-3 text-xs">
        <div className="text-center">
          <p className="text-gray-500 mb-1">工作相符度</p>
          <StarRating rating={workRating} size="sm" showValue={false} />
        </div>
        <div className="text-center">
          <p className="text-gray-500 mb-1">食宿品質</p>
          <StarRating rating={accommodationRating} size="sm" showValue={false} />
        </div>
        <div className="text-center">
          <p className="text-gray-500 mb-1">業者信譽</p>
          <StarRating rating={trustRating} size="sm" showValue={false} />
        </div>
      </div>
      
      <p className="text-gray-700 text-sm leading-relaxed">{comment}</p>
    </div>
  );
}