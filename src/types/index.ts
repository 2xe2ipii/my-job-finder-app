export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  jobType: string;
  postedDate: string;
}

export interface Application {
  jobId: string;
  name: string;
  email: string;
  phone: string;
  whyHireYou: string;
  date: string;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface JobsContextType {
  jobs: Job[];
  savedJobs: Job[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  searchResults: Job[];
  saveJob: (job: Job) => void;
  removeJob: (jobId: string) => void;
  setSearchTerm: (term: string) => void;
  submitApplication: (application: Omit<Application, 'date'>) => void;
  fetchJobs: () => Promise<void>;
} 