import { X, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface Job {
  id: string;
  title: string;
  businessName: string;
  location: string;
  imageUrl: string;
  rating: number;
  isVerified: boolean;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventLocation: string;
  eventPeriod: string;
  eventDescription: string;
  nearbyJobs: Job[];
  onJobClick: (jobId: string) => void;
  onViewAllJobs: () => void;
}

export function EventModal({
  isOpen,
  onClose,
  eventName,
  eventLocation,
  eventPeriod,
  eventDescription,
  nearbyJobs,
  onJobClick,
  onViewAllJobs
}: EventModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
      <div className="bg-white w-full md:max-w-2xl md:mx-4 max-h-[85vh] md:max-h-[90vh] rounded-t-3xl md:rounded-3xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between z-10">
          <div className="flex-1">
            <h2 className="font-medium text-gray-900">{eventName}</h2>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {eventLocation}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {eventPeriod}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(85vh-140px)] md:max-h-[calc(90vh-140px)]">
          {/* 活動描述 */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm text-gray-700">{eventDescription}</p>
            </div>
          </div>

          {/* 周邊換宿點 */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                活動周邊換宿點
              </h3>
              <span className="text-sm text-gray-500">{nearbyJobs.length} 家</span>
            </div>

            <div className="space-y-3">
              {nearbyJobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => onJobClick(job.id)}
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 hover:border-blue-300 hover:shadow-md transition-all text-left"
                >
                  <div className="flex gap-3">
                    <img
                      src={job.imageUrl}
                      alt={job.title}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-gray-900 text-sm truncate">
                          {job.title}
                        </h4>
                        {job.isVerified && (
                          <span className="text-blue-600 text-xs flex-shrink-0">✓</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">{job.businessName}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500 text-xs">★</span>
                          <span className="text-xs text-gray-600">{job.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-xs text-gray-500">{job.location}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <Button
            onClick={onViewAllJobs}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            查看 {eventLocation} 所有換宿機會
          </Button>
        </div>
      </div>
    </div>
  );
}