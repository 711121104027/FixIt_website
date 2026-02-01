import { MapPin, Calendar, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Issue } from '../App';

interface IssueCardProps {
  issue: Issue;
  onClick: () => void;
}

const categoryLabels: Record<string, string> = {
  'road-repair': 'Road Repair',
  'trash-pickup': 'Trash Pickup',
  'graffiti-removal': 'Graffiti Removal',
  'streetlight': 'Street Lighting',
  'park-maintenance': 'Park Maintenance',
  'other': 'Other'
};

const statusConfig = {
  'reported': {
    label: 'Reported',
    color: 'bg-gray-100 text-gray-700',
    icon: AlertCircle
  },
  'acknowledged': {
    label: 'Acknowledged',
    color: 'bg-blue-100 text-blue-700',
    icon: Clock
  },
  'in-progress': {
    label: 'In Progress',
    color: 'bg-amber-100 text-amber-700',
    icon: TrendingUp
  },
  'resolved': {
    label: 'Resolved',
    color: 'bg-emerald-100 text-emerald-700',
    icon: CheckCircle
  }
};

const priorityConfig = {
  'high': { color: 'border-l-red-500', badge: 'bg-red-100 text-red-700' },
  'medium': { color: 'border-l-amber-500', badge: 'bg-amber-100 text-amber-700' },
  'low': { color: 'border-l-blue-500', badge: 'bg-blue-100 text-blue-700' }
};

export function IssueCard({ issue, onClick }: IssueCardProps) {
  const StatusIcon = statusConfig[issue.status].icon;
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  }).format(issue.reportedAt);

  return (
    <article
      onClick={onClick}
      className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4 ${priorityConfig[issue.priority].color}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${issue.title}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Title and Category */}
          <div className="flex flex-wrap items-start gap-2 mb-2">
            <h3 className="font-semibold text-lg text-gray-900 flex-1 min-w-0">
              {issue.title}
            </h3>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 whitespace-nowrap">
              {categoryLabels[issue.category]}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-2">{issue.description}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <MapPin size={16} />
              <span>{issue.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp size={16} />
              <span>{issue.upvotes} upvotes</span>
            </div>
          </div>
        </div>

        {/* Status and Priority */}
        <div className="flex lg:flex-col gap-2 lg:items-end">
          <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${statusConfig[issue.status].color} flex items-center space-x-1.5 whitespace-nowrap`}>
            <StatusIcon size={16} />
            <span>{statusConfig[issue.status].label}</span>
          </span>
          <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${priorityConfig[issue.priority].badge} whitespace-nowrap`}>
            {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)} Priority
          </span>
        </div>
      </div>

      {/* Updates indicator */}
      {issue.updates.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{issue.updates.length}</span> update{issue.updates.length !== 1 ? 's' : ''} · 
            Latest: {issue.updates[issue.updates.length - 1].message.substring(0, 60)}
            {issue.updates[issue.updates.length - 1].message.length > 60 ? '...' : ''}
          </p>
        </div>
      )}
    </article>
  );
}
