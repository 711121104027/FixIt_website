import { Award, Trophy, Star, Target, TrendingUp, Gift, Crown, Zap } from 'lucide-react';
import { User } from '../App';

interface RewardsProps {
  user: User;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  requirement?: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  available: boolean;
}

const badges: Badge[] = [
  {
    id: '1',
    name: 'First Reporter',
    description: 'Reported your first issue',
    icon: '🎯',
    earned: true
  },
  {
    id: '2',
    name: 'Community Helper',
    description: 'Helped resolve 3 issues',
    icon: '🤝',
    earned: true
  },
  {
    id: '3',
    name: 'Active Contributor',
    description: 'Report 10 issues',
    icon: '⭐',
    earned: false,
    progress: 8,
    requirement: 10
  },
  {
    id: '4',
    name: 'Volunteer Champion',
    description: 'Complete 20 volunteer hours',
    icon: '💪',
    earned: false,
    progress: 12,
    requirement: 20
  },
  {
    id: '5',
    name: 'Problem Solver',
    description: 'Resolve 10 issues',
    icon: '🔧',
    earned: false,
    progress: 3,
    requirement: 10
  },
  {
    id: '6',
    name: 'Social Butterfly',
    description: 'Comment on 25 issues',
    icon: '🦋',
    earned: false,
    progress: 15,
    requirement: 25
  }
];

const rewards: Reward[] = [
  {
    id: '1',
    title: 'Coffee Shop Gift Card',
    description: '$10 gift card to local coffee shop',
    points: 100,
    available: false
  },
  {
    id: '2',
    title: 'Community Store Discount',
    description: '15% off at participating local businesses',
    points: 150,
    available: false
  },
  {
    id: '3',
    title: 'FixIt T-Shirt',
    description: 'Exclusive community volunteer t-shirt',
    points: 200,
    available: false
  },
  {
    id: '4',
    title: 'VIP Event Access',
    description: 'Priority registration for community events',
    points: 250,
    available: true
  },
  {
    id: '5',
    title: 'Community Recognition',
    description: 'Featured in monthly newsletter',
    points: 300,
    available: false
  },
  {
    id: '6',
    title: 'Premium Supporter Badge',
    description: 'Exclusive profile badge and recognition',
    points: 500,
    available: false
  }
];

const levels = [
  { name: 'Newcomer', min: 0, max: 99, color: 'from-gray-400 to-gray-500' },
  { name: 'Contributor', min: 100, max: 249, color: 'from-blue-400 to-blue-500' },
  { name: 'Champion', min: 250, max: 499, color: 'from-emerald-400 to-emerald-500' },
  { name: 'Leader', min: 500, max: 999, color: 'from-purple-400 to-purple-500' },
  { name: 'Legend', min: 1000, max: Infinity, color: 'from-amber-400 to-amber-500' }
];

export function Rewards({ user }: RewardsProps) {
  const currentLevel = levels.find(level => user.points >= level.min && user.points <= level.max) || levels[0];
  const nextLevel = levels.find(level => level.min > user.points) || currentLevel;
  const progressToNextLevel = currentLevel === nextLevel ? 100 : 
    ((user.points - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards & Recognition</h1>
        <p className="text-gray-600">Your contributions make a difference</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Level */}
          <div className={`bg-gradient-to-br ${currentLevel.color} rounded-2xl p-8 text-white`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Crown size={32} />
                </div>
                <div>
                  <p className="text-white text-opacity-90 text-sm">Current Level</p>
                  <h2 className="text-3xl font-bold">{currentLevel.name}</h2>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{user.points}</div>
                <div className="text-white text-opacity-90 text-sm">points</div>
              </div>
            </div>

            {currentLevel !== nextLevel && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress to {nextLevel.name}</span>
                  <span>{nextLevel.min - user.points} points to go</span>
                </div>
                <div className="h-3 bg-white bg-opacity-20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${progressToNextLevel}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Achievement Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <Target className="text-emerald-600" size={24} />
                <span className="text-2xl font-bold text-gray-900">{user.issuesReported}</span>
              </div>
              <p className="text-gray-600 text-sm">Issues Reported</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <Zap className="text-blue-600" size={24} />
                <span className="text-2xl font-bold text-gray-900">{user.issuesResolved}</span>
              </div>
              <p className="text-gray-600 text-sm">Issues Resolved</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="text-purple-600" size={24} />
                <span className="text-2xl font-bold text-gray-900">{user.volunteerHours}</span>
              </div>
              <p className="text-gray-600 text-sm">Volunteer Hours</p>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Badges</h2>
              <span className="text-sm text-gray-600">
                {badges.filter(b => b.earned).length} of {badges.length} earned
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {badges.map(badge => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    badge.earned
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`text-4xl ${badge.earned ? '' : 'grayscale'}`}>
                      {badge.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{badge.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                      
                      {!badge.earned && badge.progress !== undefined && badge.requirement !== undefined && (
                        <div>
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{badge.progress}/{badge.requirement}</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                              style={{ width: `${(badge.progress / badge.requirement) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {badge.earned && (
                        <div className="flex items-center space-x-1 text-emerald-700 text-sm">
                          <Star size={14} fill="currentColor" />
                          <span>Earned</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Rewards */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Redeem Rewards</h2>
            <div className="space-y-4">
              {rewards.map(reward => (
                <div
                  key={reward.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-start space-x-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Gift className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{reward.title}</h3>
                      <p className="text-sm text-gray-600">{reward.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-bold text-amber-600">{reward.points} pts</div>
                    </div>
                    <button
                      disabled={!reward.available}
                      className={`px-6 py-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        reward.available
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg focus:ring-emerald-500'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      aria-label={reward.available ? `Redeem ${reward.title}` : `Need ${reward.points - user.points} more points`}
                    >
                      {reward.available ? 'Redeem' : 'Locked'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* How to Earn Points */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center space-x-2">
              <Trophy className="text-amber-600" size={20} />
              <span>Earn Points</span>
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-sm">Report an issue</span>
                <span className="font-semibold text-emerald-600">+10 pts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-sm">Resolve an issue</span>
                <span className="font-semibold text-emerald-600">+25 pts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-sm">Volunteer event</span>
                <span className="font-semibold text-emerald-600">+50 pts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-sm">Comment/Update</span>
                <span className="font-semibold text-emerald-600">+5 pts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-sm">Daily check-in</span>
                <span className="font-semibold text-emerald-600">+2 pts</span>
              </div>
            </div>
          </div>

          {/* Monthly Leaderboard */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center space-x-2">
              <Star className="text-amber-600" size={20} />
              <span>Top Contributors</span>
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Sarah Johnson', points: 890, rank: 1 },
                { name: 'Mike Chen', points: 745, rank: 2 },
                { name: 'Emily Rodriguez', points: 680, rank: 3 },
              ].map((contributor) => (
                <div 
                  key={contributor.rank}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      contributor.rank === 1 ? 'bg-amber-400 text-white' :
                      contributor.rank === 2 ? 'bg-gray-300 text-gray-700' :
                      'bg-orange-400 text-white'
                    }`}>
                      {contributor.rank}
                    </div>
                    <span className="font-medium text-gray-900">{contributor.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600">{contributor.points}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Motivational Card */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
            <Award size={32} className="mb-3" />
            <h3 className="font-semibold text-lg mb-2">Keep Going!</h3>
            <p className="text-purple-100 text-sm mb-4">
              You're doing great! Just {nextLevel.min - user.points} more points to reach {nextLevel.name} level.
            </p>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-sm">
              💡 Complete a volunteer event to earn 50 points instantly!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
