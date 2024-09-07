import { useMemo, useReducer } from "react";
import { initialState, JobsContext, reducer, StateType } from "./useJobs";

export const JobsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/data.json");
      const data = await response.json();
      console.log(data);
      dispatch({ type: "SET_JOBS", payload: data });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  const filterJobs = async (tool: string) => {
    dispatch({
      type: "FILTER",
      payload: {
        tool,
      },
    });
  };
  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTER" });
  };
  const unFilterJobs = (tool: string) => {
    dispatch({ type: "UN_FILTER", payload: { tool } });
  };
  const value = useMemo(() => {
    const currentState: StateType = {
      ...state,
      unFilterJobs,
      clearFilters,
      filterJobs,
      fetchJobs,
    };
    return currentState;
  }, [state]);

  return (
    <JobsContext.Provider value={value}> {children} </JobsContext.Provider>
  );
};
