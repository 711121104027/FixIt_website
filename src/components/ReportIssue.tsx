import { useState } from 'react';
import { Camera, MapPin, X, Upload, AlertCircle } from 'lucide-react';
import { Issue } from '../App';

interface ReportIssueProps {
  onSubmit: (issue: Omit<Issue, 'id' | 'reportedAt' | 'updates' | 'upvotes'>) => void;
  onCancel: () => void;
}

const categories = [
  { id: 'road-repair', label: 'Road Repair', icon: '🚧' },
  { id: 'trash-pickup', label: 'Trash Pickup', icon: '🗑️' },
  { id: 'graffiti-removal', label: 'Graffiti Removal', icon: '🎨' },
  { id: 'streetlight', label: 'Street Lighting', icon: '💡' },
  { id: 'park-maintenance', label: 'Park Maintenance', icon: '🌳' },
  { id: 'other', label: 'Other', icon: '📝' }
];

export function ReportIssue({ onSubmit, onCancel }: ReportIssueProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'road-repair',
    priority: 'medium' as 'low' | 'medium' | 'high',
    location: '',
    imageUrl: ''
  });
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...formData,
      status: 'reported',
      reportedBy: 'Current User',
      latitude: useCurrentLocation ? 40.7128 : undefined,
      longitude: useCurrentLocation ? -74.0060 : undefined
    });
  };

  const handleGetLocation = () => {
    setUseCurrentLocation(true);
    // Simulate getting location
    setFormData({ ...formData, location: 'Current Location (Auto-detected)' });
    setErrors({ ...errors, location: '' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Report an Issue</h1>
            <p className="text-gray-600 mt-1">Help improve our community</p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Cancel and return to dashboard"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block font-medium text-gray-900 mb-2">
              Issue Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                setErrors({ ...errors, title: '' });
              }}
              placeholder="e.g., Large pothole on Main Street"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <p id="title-error" className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle size={16} />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-900 mb-3">
              Category *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    formData.category === cat.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  aria-pressed={formData.category === cat.id}
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="font-medium text-sm">{cat.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-medium text-gray-900 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                setErrors({ ...errors, description: '' });
              }}
              placeholder="Describe the issue in detail..."
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? 'description-error' : undefined}
            />
            {errors.description && (
              <p id="description-error" className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle size={16} />
                <span>{errors.description}</span>
              </p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block font-medium text-gray-900 mb-3">
              Priority Level *
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, priority: 'low' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.priority === 'low'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                aria-pressed={formData.priority === 'low'}
              >
                <div className="font-medium">Low</div>
                <div className="text-xs text-gray-600">Can wait</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, priority: 'medium' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.priority === 'medium'
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                aria-pressed={formData.priority === 'medium'}
              >
                <div className="font-medium">Medium</div>
                <div className="text-xs text-gray-600">Important</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, priority: 'high' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.priority === 'high'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                aria-pressed={formData.priority === 'high'}
              >
                <div className="font-medium">High</div>
                <div className="text-xs text-gray-600">Urgent</div>
              </button>
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block font-medium text-gray-900 mb-2">
              Location *
            </label>
            <div className="flex gap-2">
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                  setUseCurrentLocation(false);
                  setErrors({ ...errors, location: '' });
                }}
                placeholder="Enter address or intersection"
                className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.location}
                aria-describedby={errors.location ? 'location-error' : undefined}
              />
              <button
                type="button"
                onClick={handleGetLocation}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Use current location"
              >
                <MapPin size={20} />
                <span className="hidden sm:inline">Use Current</span>
              </button>
            </div>
            {errors.location && (
              <p id="location-error" className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle size={16} />
                <span>{errors.location}</span>
              </p>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block font-medium text-gray-900 mb-2">
              Photo (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // In a real app, upload the file
                    setFormData({ ...formData, imageUrl: URL.createObjectURL(file) });
                  }
                }}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                {formData.imageUrl ? (
                  <>
                    <img src={formData.imageUrl} alt="Preview" className="max-h-48 rounded-lg mb-2" />
                    <span className="text-sm text-emerald-600 font-medium">Change Photo</span>
                  </>
                ) : (
                  <>
                    <Camera className="text-gray-400" size={32} />
                    <span className="text-gray-600">Click to upload a photo</span>
                    <span className="text-sm text-gray-500">PNG, JPG up to 10MB</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Submit Report
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
