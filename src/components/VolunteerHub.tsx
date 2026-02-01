import { useState } from 'react';
import { Users, Calendar, MapPin, Clock, Award, Heart, CheckCircle } from 'lucide-react';
import { User } from '../App';

interface VolunteerHubProps {
  user: User;
  setUser: (user: User) => void;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  volunteers: number;
  spotsLeft: number;
  category: string;
  points: number;
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Community Park Cleanup',
    description: 'Join us for a morning of cleaning and beautifying Riverside Park',
    date: new Date(2026, 1, 5, 9, 0),
    location: 'Riverside Park',
    volunteers: 12,
    spotsLeft: 8,
    category: 'park-maintenance',
    points: 25
  },
  {
    id: '2',
    title: 'Graffiti Removal Project',
    description: 'Help remove graffiti from public buildings downtown',
    date: new Date(2026, 1, 8, 10, 0),
    location: 'Downtown Area',
    volunteers: 6,
    spotsLeft: 4,
    category: 'graffiti-removal',
    points: 30
  },
  {
    id: '3',
    title: 'Neighborhood Street Sweep',
    description: 'Litter pickup and street cleaning in residential areas',
    date: new Date(2026, 1, 12, 14, 0),
    location: 'Oak Street District',
    volunteers: 15,
    spotsLeft: 10,
    category: 'trash-pickup',
    points: 20
  }
];

export function VolunteerHub({ user, setUser }: VolunteerHubProps) {
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set());

  const handleRegister = (eventId: string, points: number) => {
    if (!registeredEvents.has(eventId)) {
      setRegisteredEvents(new Set(registeredEvents).add(eventId));
      setUser({
        ...user,
        points: user.points + 5, // Points for signing up
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Hub</h1>
        <p className="text-gray-600">Make a difference in your community</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Impact Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
              <Users size={24} className="mb-3 opacity-80" />
              <div className="text-3xl font-bold mb-1">1,240</div>
              <div className="text-emerald-100">Active Volunteers</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
              <Clock size={24} className="mb-3 opacity-80" />
              <div className="text-3xl font-bold mb-1">3,450</div>
              <div className="text-blue-100">Hours Contributed</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
              <Heart size={24} className="mb-3 opacity-80" />
              <div className="text-3xl font-bold mb-1">847</div>
              <div className="text-purple-100">Issues Resolved</div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map(event => {
                const isRegistered = registeredEvents.has(event.id);
                const eventDate = new Intl.DateTimeFormat('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                }).format(event.date);

                return (
                  <article
                    key={event.id}
                    className="border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar size={16} />
                            <span>{eventDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin size={16} />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users size={16} />
                            <span>{event.volunteers} volunteers signed up</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award size={16} className="text-amber-600" />
                            <span className="text-amber-600 font-medium">{event.points} points</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start lg:items-end space-y-2">
                        {event.spotsLeft <= 3 && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                            Only {event.spotsLeft} spots left
                          </span>
                        )}
                        <button
                          onClick={() => handleRegister(event.id, event.points)}
                          disabled={isRegistered}
                          className={`px-6 py-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            isRegistered
                              ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed focus:ring-emerald-500'
                              : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg focus:ring-emerald-500'
                          } flex items-center space-x-2`}
                          aria-label={isRegistered ? 'Already registered' : `Register for ${event.title}`}
                        >
                          {isRegistered && <CheckCircle size={20} />}
                          <span>{isRegistered ? 'Registered' : 'Register'}</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* How to Get Involved */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Get Involved</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Join Events</h3>
                  <p className="text-sm text-gray-600">
                    Sign up for organized cleanup and maintenance events in your area
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Start a Team</h3>
                  <p className="text-sm text-gray-600">
                    Create your own volunteer group and organize community projects
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Adopt a Spot</h3>
                  <p className="text-sm text-gray-600">
                    Take responsibility for maintaining a specific area regularly
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="text-amber-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Earn Recognition</h3>
                  <p className="text-sm text-gray-600">
                    Gain points, badges, and community recognition for your efforts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Your Impact */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4">Your Impact</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Volunteer Hours</span>
                  <span className="font-semibold text-emerald-600">{user.volunteerHours} hrs</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
                    style={{ width: `${Math.min((user.volunteerHours / 20) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Goal: 20 hours</p>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Events Attended</span>
                  <span className="font-semibold text-blue-600">{registeredEvents.size}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Issues Helped Resolve</span>
                  <span className="font-semibold text-purple-600">{user.issuesResolved}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4">Top Volunteers</h2>
            <div className="space-y-3">
              {[
                { name: 'Sarah Johnson', hours: 45, rank: 1 },
                { name: 'Mike Chen', hours: 38, rank: 2 },
                { name: 'Emily Rodriguez', hours: 32, rank: 3 },
                { name: user.name, hours: user.volunteerHours, rank: 8 },
              ].map((volunteer, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    volunteer.name === user.name ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      volunteer.rank === 1 ? 'bg-amber-400 text-white' :
                      volunteer.rank === 2 ? 'bg-gray-300 text-gray-700' :
                      volunteer.rank === 3 ? 'bg-orange-400 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {volunteer.rank}
                    </div>
                    <div>
                      <p className={`font-medium ${volunteer.name === user.name ? 'text-emerald-700' : 'text-gray-900'}`}>
                        {volunteer.name}
                      </p>
                      <p className="text-xs text-gray-500">{volunteer.hours} hours</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
            <h3 className="font-semibold text-lg mb-2">Organize Your Own Event</h3>
            <p className="text-emerald-100 text-sm mb-4">
              Have an idea for a community project? Start organizing now!
            </p>
            <button className="w-full bg-white text-emerald-700 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600">
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
