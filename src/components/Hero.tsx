import { MapPin, Users, Award, ArrowRight } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Together, We{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Fix Our Community
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Report maintenance issues, track progress in real-time, and collaborate with neighbors 
            to create cleaner, safer, and more beautiful neighborhoods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Get started with FixIt"
            >
              <span>Get Started</span>
              <ArrowRight size={20} />
            </button>
            <button
              onClick={onGetStarted}
              className="border-2 border-emerald-600 text-emerald-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              View Issues
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-emerald-600" size={32} />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">847</div>
            <div className="text-gray-600">Issues Resolved</div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-teal-600" size={32} />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">1,240</div>
            <div className="text-gray-600">Active Members</div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-cyan-600" size={32} />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">3,450</div>
            <div className="text-gray-600">Volunteer Hours</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How FixIt Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-700 font-bold text-xl">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Report an Issue</h3>
              <p className="text-gray-600 text-sm">
                Snap a photo, add location, and describe the problem in seconds
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-700 font-bold text-xl">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
              <p className="text-gray-600 text-sm">
                Get real-time updates from acknowledgment to resolution
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-700 font-bold text-xl">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Collaborate</h3>
              <p className="text-gray-600 text-sm">
                Communicate with authorities and volunteers to find solutions
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-700 font-bold text-xl">
                4
              </div>
              <h3 className="font-semibold text-lg mb-2">Earn Rewards</h3>
              <p className="text-gray-600 text-sm">
                Gain points, badges, and recognition for community contributions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
