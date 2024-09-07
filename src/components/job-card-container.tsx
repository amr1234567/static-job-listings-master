import { Job } from "../models/job";
import Attribute from "./attibute";
import { animated } from "react-spring";

export default function JobCardContainer({
  job,
  style,
}: {
  job: Job;
  style: object;
}) {
  return (
    <animated.div
      className={`job-container ${job.featured ? "before" : ""}`}
      style={style}
    >
      <div className="details">
        <img src={job.logo} alt="" />
        <div className="info">
          <header>
            <p className="company-name">{job.company}</p>
            {job.new && <div className="new-job">New!</div>}
            {job.featured && <div className="featured-job">featured</div>}
          </header>
          <p className="title">{job.position}</p>
          <footer>
            <p className="time">{job.postedAt}</p>
            <span>.</span>
            <p className="contract">{job.contract}</p>
            <span>.</span>
            <p className="location">{job.location}</p>
          </footer>
        </div>
      </div>
      <div className="job-attributes">
        {job.languages.map((language, index) => (
          <Attribute key={index} tool={language} />
        ))}
        {job.tools.map((tool, index) => (
          <Attribute key={index} tool={tool} />
        ))}
      </div>
    </animated.div>
  );
}
