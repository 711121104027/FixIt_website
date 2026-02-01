import { useState } from 'react';
import { MapPin, Filter, Search, Plus, TrendingUp, AlertCircle } from 'lucide-react';
import { Issue } from '../App';
import { IssueCard } from './IssueCard';

interface DashboardProps {
  issues: Issue[];
  onViewIssue: (issue: Issue) => void;
  onReportNew: () => void;
}

const categories = [
  { id: 'all', label: 'All Issues' },
  { id: 'road-repair', label: 'Road Repair' },
  { id: 'trash-pickup', label: 'Trash Pickup' },
  { id: 'graffiti-removal', label: 'Graffiti Removal' },
  { id: 'streetlight', label: 'Street Lighting' },
  { id: 'park-maintenance', label: 'Park Maintenance' },
  { id: 'other', label: 'Other' }
];

const statuses = [
  { id: 'all', label: 'All Status' },
  { id: 'reported', label: 'Reported' },
  { id: 'acknowledged', label: 'Acknowledged' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'resolved', label: 'Resolved' }
];

const priorities = [
  { id: 'all', label: 'All Priorities' },
  { id: 'high', label: 'High' },
  { id: 'medium', label: 'Medium' },
  { id: 'low', label: 'Low' }
];

export function Dashboard({ issues, onViewIssue, onReportNew }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || issue.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const stats = {
    total: issues.length,
    active: issues.filter(i => i.status !== 'resolved').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
    high: issues.filter(i => i.priority === 'high' && i.status !== 'resolved').length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Issues</h1>
          <p className="text-gray-600 mt-1">Track and resolve maintenance problems</p>
        </div>
        <button
          onClick={onReportNew}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          aria-label="Report new issue"
        >
          <Plus size={20} />
          <span>Report Issue</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Issues</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <MapPin className="text-gray-400" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.active}</p>
            </div>
            <TrendingUp className="text-blue-400" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Resolved</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.resolved}</p>
            </div>
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">High Priority</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.high}</p>
            </div>
            <AlertCircle className="text-red-400" size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter size={20} className="text-gray-400" />
          <h2 className="font-semibold text-gray-900">Filters</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="search"
                type="text"
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                aria-label="Search issues"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              aria-label="Filter by category"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              aria-label="Filter by status"
            >
              {statuses.map(status => (
                <option key={status.id} value={status.id}>{status.label}</option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              id="priority"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              aria-label="Filter by priority"
            >
              {priorities.map(priority => (
                <option key={priority.id} value={priority.id}>{priority.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Issues Grid */}
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <MapPin className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No issues found</h3>
            <p className="text-gray-600">Try adjusting your filters or report a new issue</p>
          </div>
        ) : (
          filteredIssues.map(issue => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onClick={() => onViewIssue(issue)}
            />
          ))
        )}
      </div>
    </div>
  );
}
