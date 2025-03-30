import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Job, Application, JobsContextType } from '../types';
import { fetchJobs as fetchJobsApi, applyForJob } from '../services/api';

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};

interface JobsProviderProps {
  children: ReactNode;
}

export const JobsProvider: React.FC<JobsProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Job[]>([]);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const fetchedJobs = await fetchJobsApi();
      
      console.log(`Fetched ${fetchedJobs.length} jobs from API`);
      setJobs(fetchedJobs);
      setSearchResults(fetchedJobs);
    } catch (err) {
      console.error('Error in job fetching:', err);
      setError('Failed to fetch jobs. Please try again later.');
      setJobs([]);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults(jobs);
      return;
    }

    const filteredJobs = jobs.filter(job => {
      const searchQuery = searchTerm.toLowerCase();
      return (
        job.title.toLowerCase().includes(searchQuery) ||
        job.company.toLowerCase().includes(searchQuery) ||
        job.location.toLowerCase().includes(searchQuery)
      );
    });

    setSearchResults(filteredJobs);
  }, [searchTerm, jobs]);

  const saveJob = (job: Job) => {
    if (!savedJobs.some(savedJob => savedJob.id === job.id)) {
      setSavedJobs(prev => [...prev, job]);
    }
  };

  const removeJob = (jobId: string) => {
    setSavedJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const submitApplication = (application: Omit<Application, 'date'>) => {
    const fullApplication: Application = {
      ...application,
      date: new Date().toISOString()
    };
    
    console.log('Application submitted:', fullApplication);
    
    return true;
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        savedJobs,
        isLoading,
        error,
        searchTerm,
        searchResults,
        saveJob,
        removeJob,
        setSearchTerm,
        submitApplication,
        fetchJobs
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}; 