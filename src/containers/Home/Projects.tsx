import LazyLoad from "react-lazyload";

import { IProject } from "../../types";
import Project from "../../components/Project";

export default function Projects(props: { data: IProject[] }) {
  const { data } = props;

  if (!data) return <div />;

  return (
    // <LazyLoad once>
    <div
      id="portfolio-grid"
      className="row no-gutter portfolio-section"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      {data.map((project, i) => (
        <Project key={i} index={i} details={project} />
      ))}
    </div>
    // </LazyLoad>
  );
}
