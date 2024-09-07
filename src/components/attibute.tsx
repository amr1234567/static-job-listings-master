import { useEffect, useState } from "react";
import { useJobs } from "../hooks/useJobs";

function Attribute({ tool }: { tool: string }) {
  const {
    state: { filterJobs, filters, unFilterJobs },
  } = useJobs();
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    setIsChecked(filters.includes(tool));
  }, [filters, tool]);
  const onClick = () => {
    if (isChecked) unFilterJobs(tool);
    else filterJobs(tool);
  };
  return (
    <div
      onClick={onClick}
      className={`attribute ${isChecked ? " tool-checked" : ""}`}
    >
      {tool}
    </div>
  );
}

export default Attribute;
