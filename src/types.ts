export type ModuleId = 'lessons' | 'projects' | 'debug' | 'exercises';

export interface Lesson {
  id: string;
  title: string;
  theory: string;
  exampleCode: string;
  instruction: string;
  initialCode: string;
  validate: (code: string) => boolean;
  successMessage: string;
}

export interface ProjectStep {
  id: string;
  instruction: string;
  initialCode: string;
  validate: (code: string) => boolean;
  successMessage: string;
  unlockedFeature: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  iconName: string;
  steps: ProjectStep[];
}

export interface DebugChallenge {
  id: string;
  title: string;
  brokenCode: string;
  errorOutput: string;
  question: string;
  validate: (code: string) => boolean;
  explanation: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  validate: (code: string, output: string) => { success: boolean; feedback: string };
  xpReward: number;
}
