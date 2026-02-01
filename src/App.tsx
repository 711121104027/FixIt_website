import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { ReportIssue } from './components/ReportIssue';
import { IssueDetails } from './components/IssueDetails';
import { VolunteerHub } from './components/VolunteerHub';
import { Resources } from './components/Resources';
import { Rewards } from './components/Rewards';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'reported' | 'acknowledged' | 'in-progress' | 'resolved';
  location: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  reportedBy: string;
  reportedAt: Date;
  updates: IssueUpdate[];
  upvotes: number;
}

export interface IssueUpdate {
  id: string;
  message: string;
  timestamp: Date;
  author: string;
  authorRole: 'admin' | 'volunteer' | 'user';
}

export interface User {
  id: string;
  name: string;
  points: number;
  issuesReported: number;
  issuesResolved: number;
  volunteerHours: number;
  badges: string[];
}

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'report' | 'issue' | 'volunteer' | 'resources' | 'rewards'>('home');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Community Member',
    points: 250,
    issuesReported: 8,
    issuesResolved: 3,
    volunteerHours: 12,
    badges: ['First Reporter', 'Community Helper']
  });

  // Load issues from localStorage on mount
  useEffect(() => {
    const savedIssues = localStorage.getItem('fixit-issues');
    if (savedIssues) {
      const parsed = JSON.parse(savedIssues);
      setIssues(parsed.map((issue: any) => ({
        ...issue,
        reportedAt: new Date(issue.reportedAt),
        updates: issue.updates.map((update: any) => ({
          ...update,
          timestamp: new Date(update.timestamp)
        }))
      })));
    } else {
      // Initialize with mock data
      const mockIssues: Issue[] = [
        {
          id: '1',
          title: 'Large pothole on Main Street',
          description: 'Dangerous pothole near intersection causing traffic issues',
          category: 'road-repair',
          priority: 'high',
          status: 'in-progress',
          location: 'Main St & 5th Ave',
          latitude: 40.7128,
          longitude: -74.0060,
          reportedBy: 'Sarah Johnson',
          reportedAt: new Date(2026, 0, 28),
          updates: [
            {
              id: '1',
              message: 'Issue acknowledged by city maintenance department',
              timestamp: new Date(2026, 0, 29),
              author: 'City Admin',
              authorRole: 'admin'
            },
            {
              id: '2',
              message: 'Crew dispatched to assess the damage',
              timestamp: new Date(2026, 0, 30),
              author: 'City Admin',
              authorRole: 'admin'
            }
          ],
          upvotes: 24
        },
        {
          id: '2',
          title: 'Overflowing trash bin at Park Avenue',
          description: 'Public trash bin has not been emptied for over a week',
          category: 'trash-pickup',
          priority: 'medium',
          status: 'acknowledged',
          location: 'Park Ave Community Center',
          latitude: 40.7589,
          longitude: -73.9851,
          reportedBy: 'Mike Chen',
          reportedAt: new Date(2026, 0, 30),
          updates: [
            {
              id: '3',
              message: 'Report received and assigned to sanitation team',
              timestamp: new Date(2026, 0, 31),
              author: 'Sanitation Dept',
              authorRole: 'admin'
            }
          ],
          upvotes: 15
        },
        {
          id: '3',
          title: 'Graffiti on community center wall',
          description: 'Vandalism on the north wall of the community center',
          category: 'graffiti-removal',
          priority: 'medium',
          status: 'resolved',
          location: 'Downtown Community Center',
          latitude: 40.7580,
          longitude: -73.9855,
          reportedBy: 'Emily Rodriguez',
          reportedAt: new Date(2026, 0, 25),
          updates: [
            {
              id: '4',
              message: 'Volunteer cleanup team organized',
              timestamp: new Date(2026, 0, 26),
              author: 'Volunteer Coordinator',
              authorRole: 'volunteer'
            },
            {
              id: '5',
              message: 'Graffiti successfully removed. Thank you volunteers!',
              timestamp: new Date(2026, 0, 27),
              author: 'Volunteer Coordinator',
              authorRole: 'volunteer'
            }
          ],
          upvotes: 32
        }
      ];
      setIssues(mockIssues);
      localStorage.setItem('fixit-issues', JSON.stringify(mockIssues));
    }
  }, []);

  // Save issues to localStorage whenever they change
  useEffect(() => {
    if (issues.length > 0) {
      localStorage.setItem('fixit-issues', JSON.stringify(issues));
    }
  }, [issues]);

  const handleReportIssue = (newIssue: Omit<Issue, 'id' | 'reportedAt' | 'updates' | 'upvotes'>) => {
    const issue: Issue = {
      ...newIssue,
      id: Date.now().toString(),
      reportedAt: new Date(),
      updates: [],
      upvotes: 0
    };
    setIssues([issue, ...issues]);
    setUser({
      ...user,
      issuesReported: user.issuesReported + 1,
      points: user.points + 10
    });
    setCurrentView('dashboard');
  };

  const handleViewIssue = (issue: Issue) => {
    setSelectedIssue(issue);
    setCurrentView('issue');
  };

  const handleUpvoteIssue = (issueId: string) => {
    setIssues(issues.map(issue => 
      issue.id === issueId 
        ? { ...issue, upvotes: issue.upvotes + 1 }
        : issue
    ));
    if (selectedIssue?.id === issueId) {
      setSelectedIssue({ ...selectedIssue, upvotes: selectedIssue.upvotes + 1 });
    }
  };

  const handleAddUpdate = (issueId: string, message: string) => {
    const update: IssueUpdate = {
      id: Date.now().toString(),
      message,
      timestamp: new Date(),
      author: user.name,
      authorRole: 'user'
    };
    
    setIssues(issues.map(issue => 
      issue.id === issueId 
        ? { ...issue, updates: [...issue.updates, update] }
        : issue
    ));
    
    if (selectedIssue?.id === issueId) {
      setSelectedIssue({ ...selectedIssue, updates: [...selectedIssue.updates, update] });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentView={currentView} 
        onNavigate={setCurrentView}
        user={user}
      />
      
      <main>
        {currentView === 'home' && (
          <Hero onGetStarted={() => setCurrentView('dashboard')} />
        )}
        
        {currentView === 'dashboard' && (
          <Dashboard 
            issues={issues} 
            onViewIssue={handleViewIssue}
            onReportNew={() => setCurrentView('report')}
          />
        )}
        
        {currentView === 'report' && (
          <ReportIssue 
            onSubmit={handleReportIssue}
            onCancel={() => setCurrentView('dashboard')}
          />
        )}
        
        {currentView === 'issue' && selectedIssue && (
          <IssueDetails 
            issue={selectedIssue}
            onBack={() => setCurrentView('dashboard')}
            onUpvote={handleUpvoteIssue}
            onAddUpdate={handleAddUpdate}
          />
        )}
        
        {currentView === 'volunteer' && (
          <VolunteerHub user={user} setUser={setUser} />
        )}
        
        {currentView === 'resources' && (
          <Resources />
        )}
        
        {currentView === 'rewards' && (
          <Rewards user={user} />
        )}
      </main>
    </div>
  );
}
