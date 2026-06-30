import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Capability, Phase, UserProgress } from '../types';
import { AvatarConfig } from '../components/AvatarDressUp';
import { getTencentkenBalance } from '../data/gamification';

export interface UserProfile {
  name: string;
  department: string;
  role: Capability;
  aiLevel: number;
  aiLevelLabel: string;
  strengths: string[];
  weaknesses: string[];
  learningFocus: string[];
  recommendedPace: string;
  roleSpecific: string;
  tencentTools: string[];
  isOnboarded: boolean;
}

interface AppState {
  role: Capability;
  setRole: (role: Capability) => void;
  progress: UserProgress;
  toggleUnit: (unitId: string) => void;
  setAssessmentScore: (phase: Phase, score: number) => void;
  resetProgress: () => void;
  redeemReward: (rewardId: string, cost: number) => boolean;
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
  selectedCapability: null,
  spentTencentken: 0,
  redeemedRewards: [],
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
  const [role, setRole] = useState<Capability>(() => {
    const saved = localStorage.getItem('gd-role');
    return (saved as Capability) || 'ai-image';
  });

  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('gd-progress');
    if (!saved) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(saved) as Partial<UserProgress>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      assessmentScores: { ...DEFAULT_PROGRESS.assessmentScores, ...parsed.assessmentScores },
      spentTencentken: parsed.spentTencentken || 0,
      redeemedRewards: parsed.redeemedRewards || [],
    };
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
      const has90 = completed.some(id => id.includes('90'));
      const has60 = completed.some(id => id.includes('60'));
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

  const redeemReward = (rewardId: string, cost: number) => {
    if (progress.redeemedRewards.includes(rewardId) || getTencentkenBalance(progress) < cost) return false;
    setProgress(prev => ({
      ...prev,
      spentTencentken: (prev.spentTencentken || 0) + cost,
      redeemedRewards: [...(prev.redeemedRewards || []), rewardId],
      lastActiveDate: new Date().toISOString(),
    }));
    return true;
  };

  return (
    <AppContext.Provider value={{
      role, setRole, progress, toggleUnit, setAssessmentScore, resetProgress,
      redeemReward,
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
