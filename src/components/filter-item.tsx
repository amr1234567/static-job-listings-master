import { useJobs } from "../hooks/useJobs";
import { animated } from "react-spring";
function FilterItem({ tool, style }: { tool: string; style: object }) {
  const {
    state: { unFilterJobs },
  } = useJobs();
  return (
    <animated.div style={style} className="filter-item">
      <span>{tool}</span>
      <div onClick={() => unFilterJobs(tool)}>×</div>
    </animated.div>
  );
}

export default FilterItem;
