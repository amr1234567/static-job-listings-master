import { useSpring, animated, useTransition } from "react-spring";
import { useJobs } from "../hooks/useJobs";
import FilterItem from "./filter-item";
import topImage from "/images/bg-header-desktop.svg";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

function FiltersContainer() {
  const [filtersState, setFilterState] = useState<string[]>([]);
  const isPhone = useMediaQuery({ query: "(max-width: 400px)" });
  const {
    state: { filters },
  } = useJobs();
  useEffect(() => {
    setFilterState(filters);
  }, [filters]);
  const spring = useSpring({
    from: {
      transform:
        filtersState.length > 0
          ? "scale(0)  translate(100%, 100%)"
          : "scale(1)  translate(-50%, 50%)",
    },
    to: {
      transform:
        filtersState.length > 0
          ? "scale(1)  translate(-50%, 50%)"
          : "scale(0)  translate(100%, 100%)",
    },
    config: { duration: 300 },
  });
  const transitions = useTransition(filtersState, {
    from: {
      opacity: 0,
      transform: "translateX(-20px)",
    },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: { opacity: 0, transform: "translateX(-20px)" },
    config: { duration: 300 },
  });
  return (
    <div className="filter-section">
      <img src={topImage} alt="" />
      <animated.div
        style={spring}
        className={
          filters.length > 0
            ? `filter-container ${isPhone ? "phone" : ""}`
            : "filter-container-empty"
        }
      >
        {transitions((style, item) => (
          <FilterItem key={item} tool={item} style={style} />
        ))}
      </animated.div>
    </div>
  );
}

export default FiltersContainer;
