import { useEffect } from "react";
import { useJobs } from "../hooks/useJobs";
import FiltersContainer from "../components/filters-container";
import JobsContainer from "../components/jobs-container";

function MainPage() {
  const {
    state: { fetchJobs },
  } = useJobs();
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="main">
      <FiltersContainer />
      <JobsContainer />
    </div>
  );
}

export default MainPage;
