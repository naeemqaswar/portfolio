import React, { useState, useEffect, useContext } from "react";

import AppContext from "../../Context";
import { IInfo, IFilter, IProject, IContact, IAppContext } from "../../types";
import { base64Decode, getParameterByName } from "../../utils/helper";
import Projects from "./Projects";
import Footer from "../../components/Footer";

export default function Home() {
  const { portfolio, setPortfolio, selectedFilter, setSelectedFilter } =
    useContext<IAppContext>(AppContext);

  const [info, setInfo] = useState<IInfo>();
  const [footerLinks, setFooterLinks] = useState<IContact>();
  const [filters, setFilters] = useState<IFilter[]>([]);
  // const [selectedFilter, setSelectedFilter] = useState<string>();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);

  // Loading filter and project content
  useEffect(() => {
    if (!portfolio) return;

    const { info, contact, filters, projects } = portfolio;
    let _fProjects = projects.filter(
      ({ secure, live }) =>
        _securityCheck(secure) == true && (live == true || live == undefined)
    );

    setInfo(info);
    setFilters(filters);
    setProjects(_fProjects);
    setFilteredProjects(_fProjects);
    setFooterLinks(contact);
  }, [portfolio]);

  const _securityCheck = (secure: boolean | undefined) => {
    if (!secure) return true;

    let _secretRequest = getParameterByName("secret");
    if (_secretRequest) {
      if (base64Decode(_secretRequest) == process.env.REACT_APP_SECURE_SECRET)
        return true;
    }

    return false;
  };

  const _filterProjects = (filter: string) => {
    if (!filter || !projects || projects.length == 0) return;

    console.log("filter", filter);
    if (filter == "*") {
      setFilteredProjects(projects);
    } else {
      let _filtered = projects.filter((p) =>
        typeof p.filter === "string"
          ? p.filter == filter
          : p.filter.includes(filter)
      );
      setFilteredProjects(_filtered);
    }

    setSelectedFilter(filter!);
  };

  if (!projects) return <div />;

  return (
    <div id="main" className="content-available">
      <section className="section site-portfolio">
        <div className="container">
          <div className="row mb-5 align-items-center header-section">
            <div
              className="col-md-12 col-lg-6 mb-4 mb-lg-0 info-section"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h2>{info?.title}</h2>
              <p className="mb-0">{info?.headline}</p>
            </div>
            <div
              className="col-md-12 col-lg-6 text-start text-lg-end filters-section"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div id="filters" className="filters">
                {filters.map(({ name, title }, i) => (
                  <a
                    key={i}
                    href="javascript:void(0);"
                    data-filter={name == "*" ? name : `.${name}`}
                    className={
                      !selectedFilter && i == 0
                        ? "active"
                        : selectedFilter == name
                        ? "active"
                        : ""
                    }
                    onClick={() => _filterProjects(name)}
                  >
                    {title}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <Projects data={filteredProjects} />
        </div>
      </section>
      <Footer contact={footerLinks} />
    </div>
  );
}
