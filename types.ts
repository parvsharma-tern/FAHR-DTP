import React from 'react';

export interface UserProfile {
  name: string;
  role: string;
  organization: string;
  location: string;
  lastUpdated: string;
}

export type SkillLevel = 'Developing' | 'Proficient' | 'Advanced' | 'Expert';

export interface SkillDomain {
  id: string;
  name: string;
  score: number; // 0-100
  level: SkillLevel;
  trend?: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
}

export interface LearningWallet {
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  credits: number;
}

export interface SubSkill {
  id: string;
  name: string;
  score: number;
  statusLabel: 'Strong' | 'Good' | 'Improving' | 'Needs Focus';
}