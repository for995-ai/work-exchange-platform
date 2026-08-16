import { ArrowLeft, MapPin, Clock, Users, Phone, Mail, Flag, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VerifiedBadge } from './VerifiedBadge';
import { StarRating } from './StarRating';
import { CompatibilityScore } from './CompatibilityScore';
import { ReviewCard } from './ReviewCard';
import { Button } from './ui/button';

interface JobDetailProps {
  job: {
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
    requirements: string[];
    benefits: string[];
    workHours: string;
    accommodation: string;
    meals: string;
    contact: {
      phone: string;
      email: string;
    };
  };
  reviews: Array<{
    id: string;
    userName: string;
    date: string;
    workRating: number;
    accommodationRating: number;
    trustRating: number;
    comment: string;
  }>;
  onBack: () => void;
  onApply: () => void;
  onReport: () => void;
  isFavorited: boolean;
  onToggleFavorite: (jobId: string) => void;
}

export function JobDetail({ job, reviews, onBack, onApply, onReport, isFavorited, onToggleFavorite }: JobDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative">
        <ImageWithFallback
          src={job.imageUrl}
          alt={job.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4">
          <button 
            onClick={onBack}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={() => onToggleFavorite(job.id)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm"
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
          </button>
          <button 
            onClick={onReport}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm"
          >
            <Flag className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-xl font-medium text-gray-900 mb-2">{job.title}</h1>
              <p className="text-blue-600 font-medium mb-3">{job.businessName}</p>
              <div className="flex items-center gap-3">
                <VerifiedBadge isVerified={job.isVerified} />
                <CompatibilityScore score={job.compatibilityScore} />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{job.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{job.capacity}人</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <StarRating rating={job.rating} />
            <span className="text-sm text-gray-500">{job.reviewCount} 則評價</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
          <h2 className="font-medium text-gray-900 mb-3">工作描述</h2>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
          <h2 className="font-medium text-gray-900 mb-3">申請條件</h2>
          <ul className="space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
          <h2 className="font-medium text-gray-900 mb-3">提供項目</h2>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <p className="text-sm text-gray-500 mb-1">工作時間</p>
              <p className="text-gray-700">{job.workHours}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">住宿安排</p>
              <p className="text-gray-700">{job.accommodation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">餐食提供</p>
              <p className="text-gray-700">{job.meals}</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
          <h2 className="font-medium text-gray-900 mb-3">聯絡方式</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{job.contact.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{job.contact.email}</span>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
          <h2 className="font-medium text-gray-900 mb-4">換宿評價</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 p-4">
        <Button 
          onClick={onApply}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
        >
          立即申請換宿
        </Button>
      </div>
    </div>
  );
}