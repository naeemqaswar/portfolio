import React, { useEffect, useState } from "react";
// @ts-ignore
import { AnimateGroup } from "react-animate-mount";

import { IProject } from "../../types";
import Project from "../../components/Project";
import InfiniteScroll from "react-infinite-scroll-component";

const ProjectsPerPage = 10;

function Projects(props: { data: IProject[] }) {
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
    <div
      id="portfolio-grid"
      data-aos="fade-up"
      data-aos-delay="200"
      className="row no-gutter portfolio-section"
    >
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
          <Project key={i} index={i} details={project} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Projects;
