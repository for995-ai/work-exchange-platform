import { MapPin, Clock, Users, ChevronRight, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VerifiedBadge } from './VerifiedBadge';
import { StarRating } from './StarRating';
import { CompatibilityScore } from './CompatibilityScore';

interface JobCardProps {
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
  onClick: (id: string) => void;
  isFavorited: boolean;
  onToggleFavorite: (jobId: string) => void;
}

export function JobCard({
  id,
  title,
  businessName,
  location,
  duration,
  capacity,
  imageUrl,
  isVerified,
  rating,
  reviewCount,
  compatibilityScore,
  description,
  onClick,
  isFavorited,
  onToggleFavorite
}: JobCardProps) {
  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(id)}
    >
      <div className="relative">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-3 left-3">
          <VerifiedBadge isVerified={isVerified} size="sm" />
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(id);
            }}
            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
          </button>
          <CompatibilityScore score={compatibilityScore} size="sm" />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
            <p className="text-blue-600 font-medium">{businessName}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{capacity}人</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <StarRating rating={rating} size="sm" showValue={false} />
          <span className="text-sm text-gray-500">
            {reviewCount} 則評價
          </span>
        </div>
      </div>
    </div>
  );
}