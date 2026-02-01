import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, TrendingUp, User, MessageSquare, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Issue } from '../App';

interface IssueDetailsProps {
  issue: Issue;
  onBack: () => void;
  onUpvote: (issueId: string) => void;
  onAddUpdate: (issueId: string, message: string) => void;
}

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

const categoryLabels: Record<string, string> = {
  'road-repair': 'Road Repair',
  'trash-pickup': 'Trash Pickup',
  'graffiti-removal': 'Graffiti Removal',
  'streetlight': 'Street Lighting',
  'park-maintenance': 'Park Maintenance',
  'other': 'Other'
};

const priorityConfig = {
  'high': { color: 'bg-red-100 text-red-700' },
  'medium': { color: 'bg-amber-100 text-amber-700' },
  'low': { color: 'bg-blue-100 text-blue-700' }
};

export function IssueDetails({ issue, onBack, onUpvote, onAddUpdate }: IssueDetailsProps) {
  const [newComment, setNewComment] = useState('');
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const StatusIcon = statusConfig[issue.status].icon;
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(issue.reportedAt);

  const handleUpvote = () => {
    if (!hasUpvoted) {
      onUpvote(issue.id);
      setHasUpvoted(true);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddUpdate(issue.id, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg px-2 py-1"
        aria-label="Back to issues"
      >
        <ArrowLeft size={20} />
        <span>Back to Issues</span>
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Issue Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[issue.status].color} flex items-center space-x-1`}>
                <StatusIcon size={16} />
                <span>{statusConfig[issue.status].label}</span>
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                {categoryLabels[issue.category]}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityConfig[issue.priority].color}`}>
                {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)} Priority
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{issue.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-1">
                <User size={16} />
                <span>Reported by {issue.reportedBy}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>{issue.location}</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">{issue.description}</p>

            {/* Upvote Button */}
            <button
              onClick={handleUpvote}
              disabled={hasUpvoted}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                hasUpvoted
                  ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
              aria-label={hasUpvoted ? 'Already upvoted' : 'Upvote this issue'}
              aria-pressed={hasUpvoted}
            >
              <TrendingUp size={20} />
              <span>{issue.upvotes} Upvotes</span>
              {hasUpvoted && <CheckCircle size={16} />}
            </button>
          </div>

          {/* Location Map Placeholder */}
          {issue.latitude && issue.longitude && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-4 flex items-center space-x-2">
                <MapPin size={20} />
                <span>Location</span>
              </h2>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin size={48} className="mx-auto mb-2" />
                  <p>Map integration available</p>
                  <p className="text-sm">Lat: {issue.latitude}, Long: {issue.longitude}</p>
                </div>
              </div>
            </div>
          )}

          {/* Updates Timeline */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-6 flex items-center space-x-2">
              <Clock size={20} />
              <span>Updates & Activity</span>
            </h2>

            <div className="space-y-4">
              {/* Initial Report */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-gray-600" />
                  </div>
                  {issue.updates.length > 0 && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
                </div>
                <div className="flex-1 pb-6">
                  <p className="font-medium text-gray-900">{issue.reportedBy}</p>
                  <p className="text-sm text-gray-500">
                    {new Intl.DateTimeFormat('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    }).format(issue.reportedAt)}
                  </p>
                  <p className="text-gray-700 mt-2">Reported this issue</p>
                </div>
              </div>

              {/* Updates */}
              {issue.updates.map((update, index) => {
                const isLast = index === issue.updates.length - 1;
                const iconColor = update.authorRole === 'admin' ? 'bg-blue-100 text-blue-600' :
                                 update.authorRole === 'volunteer' ? 'bg-emerald-100 text-emerald-600' :
                                 'bg-gray-100 text-gray-600';
                
                return (
                  <div key={update.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                        <User size={20} />
                      </div>
                      {!isLast && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{update.author}</p>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                          {update.authorRole}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Intl.DateTimeFormat('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric'
                        }).format(update.timestamp)}
                      </p>
                      <p className="text-gray-700 mt-2">{update.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add Comment */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center space-x-2">
              <MessageSquare size={20} />
              <span>Add a Comment</span>
            </h2>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share updates, ask questions, or offer to help..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                aria-label="Comment text"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <Send size={20} />
                <span>Post Comment</span>
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500">
                Volunteer to Help
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-300">
                Share Issue
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-300">
                Get Directions
              </button>
            </div>
          </div>

          {/* Issue Stats */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4">Issue Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Views</span>
                <span className="font-semibold">234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Upvotes</span>
                <span className="font-semibold">{issue.upvotes}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Updates</span>
                <span className="font-semibold">{issue.updates.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Followers</span>
                <span className="font-semibold">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
