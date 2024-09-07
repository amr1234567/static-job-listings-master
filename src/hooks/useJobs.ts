import { createContext, useContext } from "react";
import { Job } from "../models/job";

// Define the state type
export type StateType = {
   jobs: Job[];
   fetchJobs: () => void;
   filterJobs: (tool: string) => void;
   unFilterJobs: (tool: string) => void;
   clearFilters: () => void;
   filteringJobs: Job[] | undefined;
   filters: string[];
};

// Initial state
export const initialState: StateType = {
   fetchJobs: () => { },
   filterJobs: () => { },
   unFilterJobs: () => { },
   clearFilters: () => { },
   jobs: [],
   filters: [],
   filteringJobs: []
};

// Create the JobsContext
export const JobsContext = createContext(initialState);

// Custom hook to use the JobsContext
export const useJobs = () => {
   const state = useContext(JobsContext);
   return { state };
};

// Reducer function
export function reducer(state: StateType, action: any): StateType {
   switch (action.type) {
      case "SET_JOBS": {
         return {
            ...state,
            jobs: action.payload, // Replace the jobs list with new data
            filteringJobs: action.payload // Set the filteringJobs to be all jobs initially
         };
      }
      case "FILTER": {
         return {
            ...state,
            filteringJobs: state.filteringJobs?.filter(
               job =>
                  job.tools.includes(action.payload.tool) ||
                  job.languages.includes(action.payload.tool)
            ),
            filters: [...state.filters, action.payload.tool]
         };
      }
      case "UN_FILTER": {
         const updatedFilters = state.filters.filter(
            tool => tool !== action.payload.tool
         );

         const filteredJobs =
            updatedFilters.length === 0
               ? state.jobs // If no filters left, return all jobs
               : state.jobs.filter(job =>
                  updatedFilters.some(
                     tool =>
                        job.tools.includes(tool) || job.languages.includes(tool)
                  )
               );

         return {
            ...state,
            filteringJobs: filteredJobs,
            filters: updatedFilters
         };
      }
      case "CLEAR_FILTER": {
         return {
            ...state,
            filteringJobs: state.jobs, // Reset to show all jobs
            filters: [] // Clear all filters
         };
      }
      default:
         return state;
   }
}
