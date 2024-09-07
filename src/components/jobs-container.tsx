import { useTransition, config } from "react-spring";
import { useJobs } from "../hooks/useJobs";
import JobCardContainer from "./job-card-container";
import { useEffect, useState } from "react";
import { Job } from "../models/job";

export default function JobsContainer() {
  const [jobsState, setJobsState] = useState<Job[] | undefined>([]);
  const {
    state: { filteringJobs },
  } = useJobs();
  useEffect(() => {
    setJobsState(filteringJobs);
  }, [filteringJobs]);
  const transitions = useTransition(jobsState, {
    from: { transform: "translateX(-100%)" },
    enter: { transform: "translateX(0)" },
    leave: { transform: "translateX(-100%)" },
    config: {
      duration: 300,
      ...config.gentle,
    },
    // other options...
  });
  return (
    <div className="jobs-container">
      {transitions((style, item) => {
        return (
          item && <JobCardContainer key={item?.id} job={item} style={style} />
        );
      })}
      {filteringJobs?.length === 0 && <p>No jobs found</p>}
    </div>
  );
}
