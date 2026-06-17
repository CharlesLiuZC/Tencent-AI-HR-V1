import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Role, Phase, UserProgress } from '../types';
import { AvatarConfig } from '../components/AvatarDressUp';

export interface UserProfile {
  name: string;
  department: string;
  role: Role;
  aiLevel: number; // 1-5
  aiLevelLabel: string;
  strengths: string[];
  weaknesses: string[];
  learningFocus: string[];
  recommendedPace: string;
  roleSpecific: string;
  tencentTools: string[];
  isOnboarded: boolean; // 是否已完成入职诊断
}

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  progress: UserProgress;
  toggleUnit: (unitId: string) => void;
  setAssessmentScore: (phase: Phase, score: number) => void;
  resetProgress: () => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  avatarConfig: AvatarConfig;
  setAvatarConfig: (config: AvatarConfig) => void;
}

const DEFAULT_PROGRESS: UserProgress = {
  completedUnits: [],
  currentPhase: 'day30',
  assessmentScores: { day30: null, day60: null, day90: null },
  startDate: new Date().toISOString(),
  lastActiveDate: new Date().toISOString(),
};

const DEFAULT_AVATAR: AvatarConfig = {
  bodyColor: 'classic',
  hairstyle: 'none',
  outfit: 'none',
  glasses: 'none',
  neckwear: 'scarf',
  weapon: 'none',
  background: 'default',
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(() => {
    const saved = localStorage.getItem('gd-role');
    return (saved as Role) || 'dev';
  });

  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('gd-progress');
    return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('gd-profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(() => {
    const saved = localStorage.getItem('gd-avatar');
    return saved ? JSON.parse(saved) : DEFAULT_AVATAR;
  });

  useEffect(() => { localStorage.setItem('gd-role', role); }, [role]);
  useEffect(() => { localStorage.setItem('gd-progress', JSON.stringify(progress)); }, [progress]);
  useEffect(() => { if (userProfile) localStorage.setItem('gd-profile', JSON.stringify(userProfile)); }, [userProfile]);
  useEffect(() => { localStorage.setItem('gd-avatar', JSON.stringify(avatarConfig)); }, [avatarConfig]);

  const toggleUnit = (unitId: string) => {
    setProgress(prev => {
      const completed = prev.completedUnits.includes(unitId)
        ? prev.completedUnits.filter(id => id !== unitId)
        : [...prev.completedUnits, unitId];

      let currentPhase: Phase = 'day30';
      const has90 = completed.some(id => id.startsWith('u0') && parseInt(id.slice(1)) > 19);
      const has60 = completed.some(id => id.startsWith('u0') && parseInt(id.slice(1)) > 10 && parseInt(id.slice(1)) <= 19);
      if (has90) currentPhase = 'day90';
      else if (has60) currentPhase = 'day60';

      return { ...prev, completedUnits: completed, currentPhase, lastActiveDate: new Date().toISOString() };
    });
  };

  const setAssessmentScore = (phase: Phase, score: number) => {
    setProgress(prev => ({
      ...prev,
      assessmentScores: { ...prev.assessmentScores, [phase]: score },
      lastActiveDate: new Date().toISOString(),
    }));
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
  };

  return (
    <AppContext.Provider value={{
      role, setRole, progress, toggleUnit, setAssessmentScore, resetProgress,
      userProfile, setUserProfile, avatarConfig, setAvatarConfig,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
