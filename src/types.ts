export interface BloodTestItem {
  name: string;
  result: string | number;
  unit: string;
  reference: string;
  status: 'In range' | 'Below range' | 'Above range' | 'Borderline';
  explanation: string;
  recommendation?: string;
}

export interface MedicalReport {
  id: string;
  title: string;
  type: 'Lab report' | 'Imaging / X-Ray' | 'Prescription' | 'Discharge Summary' | 'Consultation';
  date: string;
  facility: string;
  doctor?: string;
  summary: string;
  plainEnglishVerdict: string;
  keyFindings: string[];
  actionPoints: string[];
  questionsForDoctor: string[];
  testItems?: BloodTestItem[];
  fileSize?: string;
  isRecent?: boolean;
}

export interface HealthRecord {
  id: string;
  title: string;
  category: 'Lab report' | 'Consultation' | 'Imaging' | 'Vaccination';
  date: string;
  doctor?: string;
  tag: 'AI explained' | 'Visit note' | 'Scanned' | 'Pending';
  highlights: string;
  fileDetails: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  frequency: string;
  timeOfDay: string[];
  takenToday: boolean;
  streakDays: number;
  totalDays: number;
  purpose: string;
  warnings?: string;
}

export interface AppointmentReminder {
  id: string;
  title: string;
  doctor: string;
  specialty: string;
  facility: string;
  date: string; // e.g. "16 Nov 2026"
  time: string; // e.g. "10:30 AM"
  notes?: string;
  isUpcoming: boolean;
  locationAddress: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  severity?: 'normal' | 'caution' | 'emergency';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: string;
  dateJoined: string;
}
