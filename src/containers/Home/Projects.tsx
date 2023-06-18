import { useEffect, useState } from "react";

import { IProject } from "../../types";
import Project from "../../components/Project";
import {
  LazyLoadComponent,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import InfiniteScroll from "react-infinite-scroll-component";

const ProjectsPerPage = 10;

function Projects(props: {
  data: IProject[];
  images: any;
  scrollPosition: any;
}) {
  const { data } = props;
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    setProjects(data.slice(0, ProjectsPerPage));
  }, [data]);

  if (!data) return <div />;

  const _pageUpdate = () => {
    setProjects(
      projects.concat(
        data.slice(projects.length, projects.length + ProjectsPerPage)
      )
    );
  };

  return (
    <div id="portfolio-grid" data-aos="fade-up" data-aos-delay="200">
      <InfiniteScroll
        className="row no-gutter portfolio-section"
        dataLength={projects.length}
        next={_pageUpdate}
        hasMore={projects.length < data.length}
        loader={<h4>Loading...</h4>}
        style={{ display: "flex" }}
        scrollThreshold={0.5}
      >
        {projects.map((project, i) => (
          <LazyLoadComponent
            key={i}
            delayMethod="debounce"
            scrollPosition={props.scrollPosition}
            visibleByDefault={false}
          >
            <Project key={i} index={i} details={project} />
          </LazyLoadComponent>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default trackWindowScroll(Projects);
