import { Job } from '../types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


// SLAY API ENDPOINT
const API_URL = 'https://empllo.com/api/v1'; 


interface ApiJob {
  title: string;
  company: string;
  salary: string;
  location: string;
  description: string;
  requirements: string[];
}


const stripHtmlTags = (html: string | null | undefined): string => {
  if (!html) return '';
  
  let text = html
    .replace(/<p>/gi, '')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li>/gi, '• ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<ul>|<\/ul>|<ol>|<\/ol>/gi, '\n')
    .replace(/<[^>]*>/g, '');
  
  text = text.replace(/\n{3,}/g, '\n\n');
  
  return text.trim();
};

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    console.log('Attempting to fetch jobs from:', API_URL);
    
    const response = await fetch(API_URL, { 
      headers: {
        'Accept': 'application/json'
      },
      
      cache: 'no-cache'
    });
    
    console.log(`Response from ${API_URL} - status:`, response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Received data from ${API_URL}:`, JSON.stringify(data).substring(0, 200) + '...');

  
    let jobsData = data;
    
  
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      
      jobsData = data.jobs || data.data || data.results || Object.values(data)[0];
    }

    if (!Array.isArray(jobsData)) {
      jobsData = [jobsData];
    }
    
    const transformedJobs = jobsData
      .filter((job: any) => job && typeof job === 'object') 
      .map((job: any) => {
       
        const locations = Array.isArray(job.locations) 
          ? job.locations 
          : job.location 
            ? [job.location] 
            : ['Remote'];
        
        
        const locationString = locations.join(', ');
        
        
        const minSalary = job.minSalary || 0;
        const maxSalary = job.maxSalary || 0;
        const salaryString = (minSalary && maxSalary) 
          ? `$${minSalary.toLocaleString()} - $${maxSalary.toLocaleString()}`
          : job.salary || 'Salary not specified';
        
        
        const jobType = job.jobType || job.workModel || 'Full-time';
        
        
        const fullDescription = stripHtmlTags(job.description || job.details || 'No description available');
        
        
        const requirements = Array.isArray(job.tags) 
          ? job.tags
              .filter((tag: string) => tag && tag.length > 2)
              .map((tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1))
              .slice(0, 7) 
          : Array.isArray(job.requirements) 
            ? job.requirements.map(stripHtmlTags)
            : job.requirements 
              ? [stripHtmlTags(job.requirements)] 
              : [];

        return {
          id: job.id || uuidv4(), 
          title: stripHtmlTags(job.title || job.name || 'Untitled Position'),
          company: stripHtmlTags(job.companyName || job.company || job.employer || 'Unknown Company'),
          location: locationString,
          salary: salaryString,
          description: fullDescription,
          requirements: requirements,
          jobType: stripHtmlTags(jobType),
          postedDate: job.pubDate 
            ? new Date(job.pubDate * 1000).toISOString().split('T')[0]
            : stripHtmlTags(job.postedDate || job.date || new Date().toISOString().split('T')[0]),
        };
      })
      .filter((job: Job) => job.title !== 'Untitled Position'); 
    
    if (transformedJobs.length > 0) {
      console.log(`Successfully processed ${transformedJobs.length} jobs from ${API_URL}`);
      return transformedJobs;
    } else {
      throw new Error('No valid jobs found from API');
    }
  } catch (error) {
    console.error(`Error fetching from ${API_URL}:`, error);
    throw error;
  }
};

export const applyForJob = async (jobId: string, formData: any): Promise<boolean> => {
  try {
    console.log('Applying for job:', jobId, 'with data:', formData);
    const response = await fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobId,
        ...formData,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error applying for job:', error);
    throw error;
  }
};

export const fetchJobById = async (jobId: string): Promise<Job | null> => {
  try {
    console.log('Attempting to fetch specific job by ID:', jobId);
  
    const allJobs = await fetchJobs();
    const job = allJobs.find(j => j.id === jobId);
    
    if (job) {
      console.log('Found job by ID:', job.title);
      return job;
    }
    
    console.log('Could not find job with ID:', jobId);
    return null;
  } catch (error) {
    console.error(`Error fetching job by ID:`, error);
    throw error;
  }
}; 