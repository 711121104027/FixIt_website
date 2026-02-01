import { BookOpen, Video, FileText, Download, ExternalLink, Search } from 'lucide-react';
import { useState } from 'react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide' | 'template';
  category: string;
  readTime?: string;
  duration?: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Best Practices for Reporting Issues',
    description: 'Learn how to write effective issue reports that get resolved quickly',
    type: 'article',
    category: 'reporting',
    readTime: '5 min'
  },
  {
    id: '2',
    title: 'Community Cleanup Safety Guidelines',
    description: 'Essential safety tips for organizing and participating in cleanup events',
    type: 'guide',
    category: 'safety',
    readTime: '8 min'
  },
  {
    id: '3',
    title: 'How to Take Effective Photos of Issues',
    description: 'Photography tips to clearly document maintenance problems',
    type: 'video',
    category: 'reporting',
    duration: '4 min'
  },
  {
    id: '4',
    title: 'Graffiti Removal Techniques',
    description: 'Safe and effective methods for removing graffiti from different surfaces',
    type: 'guide',
    category: 'maintenance',
    readTime: '10 min'
  },
  {
    id: '5',
    title: 'Organizing a Volunteer Event Template',
    description: 'Downloadable template for planning and running successful volunteer events',
    type: 'template',
    category: 'volunteering',
    readTime: '2 min'
  },
  {
    id: '6',
    title: 'Understanding Issue Priority Levels',
    description: 'Guide to correctly assessing and setting priority levels for maintenance issues',
    type: 'article',
    category: 'reporting',
    readTime: '6 min'
  },
  {
    id: '7',
    title: 'Composting for Community Gardens',
    description: 'Learn sustainable waste management practices for public spaces',
    type: 'video',
    category: 'sustainability',
    duration: '12 min'
  },
  {
    id: '8',
    title: 'Engaging Your Neighbors',
    description: 'Strategies for building community participation and engagement',
    type: 'guide',
    category: 'engagement',
    readTime: '7 min'
  }
];

const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'reporting', label: 'Reporting' },
  { id: 'safety', label: 'Safety' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'volunteering', label: 'Volunteering' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'engagement', label: 'Engagement' }
];

const typeIcons = {
  article: FileText,
  video: Video,
  guide: BookOpen,
  template: Download
};

const typeColors = {
  article: 'bg-blue-100 text-blue-700',
  video: 'bg-purple-100 text-purple-700',
  guide: 'bg-emerald-100 text-emerald-700',
  template: 'bg-amber-100 text-amber-700'
};

export function Resources() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resources & Learning</h1>
        <p className="text-gray-600">Educational materials to help you make a bigger impact</p>
      </div>

      {/* Featured Section */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 md:p-12 mb-8 text-white">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen size={24} />
            <span className="font-semibold">Featured Guide</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Community Maintenance 101</h2>
          <p className="text-emerald-100 mb-6 text-lg">
            A comprehensive guide to understanding, reporting, and resolving maintenance issues 
            in your neighborhood. Perfect for new community members!
          </p>
          <button className="bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600">
            <span>Read Guide</span>
            <ExternalLink size={20} />
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              aria-label="Search resources"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            aria-label="Filter by category"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => {
          const Icon = typeIcons[resource.type];
          return (
            <article
              key={resource.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 cursor-pointer border border-gray-100 hover:border-emerald-200"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Handle resource click
                }
              }}
              aria-label={`View ${resource.title}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${typeColors[resource.type]}`}>
                  <Icon size={24} />
                </div>
                <span className="text-sm text-gray-500">
                  {resource.readTime || resource.duration}
                </span>
              </div>
              
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {resource.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                  {resource.category}
                </span>
                <ExternalLink size={16} className="text-gray-400" />
              </div>
            </article>
          );
        })}
      </div>

      {/* Help Center */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <BookOpen className="text-blue-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">FAQ & Help Center</h3>
          <p className="text-gray-600 mb-4">
            Find answers to common questions about using FixIt and participating in community maintenance.
          </p>
          <button className="text-emerald-700 font-semibold hover:text-emerald-800 flex items-center space-x-1 focus:outline-none focus:underline">
            <span>Browse FAQs</span>
            <ExternalLink size={16} />
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <Video className="text-emerald-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Video Tutorials</h3>
          <p className="text-gray-600 mb-4">
            Watch step-by-step video guides on everything from reporting issues to organizing events.
          </p>
          <button className="text-emerald-700 font-semibold hover:text-emerald-800 flex items-center space-x-1 focus:outline-none focus:underline">
            <span>Watch Tutorials</span>
            <ExternalLink size={16} />
          </button>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-white rounded-xl shadow-sm p-8 mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Best Practices</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Effective Issue Reporting</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Include clear photos from multiple angles</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Provide specific location details and landmarks</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Describe the issue's impact on the community</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Use appropriate category and priority settings</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Volunteer Safety</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Always wear appropriate protective equipment</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Work in groups, never alone in isolated areas</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Follow proper lifting techniques and take breaks</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Report hazardous materials to authorities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
