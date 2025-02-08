import React from 'react';
import { Trophy, Leaf, Clock, Award } from 'lucide-react';
import MainNav from '../components/MainNav';

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  points: number;
}

interface Activity {
  id: number;
  action: string;
  date: string;
  points: number;
  type: 'story' | 'marketplace' | 'eco';
}

const Profile: React.FC = () => {
  // Mock data - später durch API-Daten ersetzen
  const userProfile = {
    userId: "user-42",
    username: "SustainableHero",
    totalPoints: 315,
    level: 3,
    joinDate: "2024-01-15",
    storiesCompleted: 5,
    marketItemsBought: 2
  };

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Erster Schritt",
      description: "Erste umweltfreundliche Aktion durchgeführt",
      date: "2024-01-16",
      points: 50
    },
    {
      id: 2,
      title: "Story Master",
      description: "5 Story-Kapitel abgeschlossen",
      date: "2024-02-01",
      points: 100
    },
    {
      id: 3,
      title: "Öko-Held",
      description: "100 Punkte in einer Woche gesammelt",
      date: "2024-02-05",
      points: 75
    }
  ];

  const recentActivities: Activity[] = [
    {
      id: 1,
      action: "Story-Kapitel 'Cyberpunk' abgeschlossen",
      date: "2024-02-07",
      points: 30,
      type: 'story'
    },
    {
      id: 2,
      action: "Öko-Produkt im Marketplace gekauft",
      date: "2024-02-06",
      points: 20,
      type: 'marketplace'
    },
    {
      id: 3,
      action: "Fahrrad statt Auto genutzt",
      date: "2024-02-05",
      points: 15,
      type: 'eco'
    }
  ];

  return (
    <div className="min-h-screen bg-[url('/images/content.jpg')] bg-center bg-cover flex items-center justify-center p-5">
      <div className="w-full max-w-4xl bg-white/85 p-8 rounded-xl shadow-lg">
        <MainNav />

        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-red-700 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl text-white font-bold">
              {userProfile.username.charAt(0)}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {userProfile.username}
          </h1>
          <p className="text-gray-600">Mitglied seit {new Date(userProfile.joinDate).toLocaleDateString('de-DE')}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/80 p-4 rounded-lg shadow-md text-center">
            <Trophy className="w-8 h-8 text-red-700 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{userProfile.totalPoints}</p>
            <p className="text-gray-600">Gesamtpunkte</p>
          </div>
          <div className="bg-white/80 p-4 rounded-lg shadow-md text-center">
            <Leaf className="w-8 h-8 text-red-700 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">Level {userProfile.level}</p>
            <p className="text-gray-600">Aktuelles Level</p>
          </div>
          <div className="bg-white/80 p-4 rounded-lg shadow-md text-center">
            <Award className="w-8 h-8 text-red-700 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{achievements.length}</p>
            <p className="text-gray-600">Errungenschaften</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Errungenschaften</h2>
          <div className="space-y-4">
            {achievements.map(achievement => (
              <div key={achievement.id} className="bg-white/80 p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-800">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(achievement.date).toLocaleDateString('de-DE')}
                  </p>
                </div>
                <div className="bg-red-700 text-white px-3 py-1 rounded-full text-sm">
                  +{achievement.points} Punkte
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Letzte Aktivitäten</h2>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="bg-white/80 p-4 rounded-lg shadow-md flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.date).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                </div>
                <div className="bg-red-700 text-white px-3 py-1 rounded-full text-sm">
                  +{activity.points} Punkte
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;