import React, { useState, useEffect, useContext } from "react";

import AppContext from "../../Context";
import { IInfo, IFilter, IProject, IContact } from "../../types";
import { base64Decode, getParameterByName } from "../../utils/helper";
import Projects from "./Projects";
import Footer from "../../components/Footer";

export default function Home() {
  const { portfolio } = useContext(AppContext);

  const [info, setInfo] = useState<IInfo>();
  const [footerLinks, setFooterLinks] = useState<IContact>();
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);

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
                    href="#"
                    data-filter={name == "*" ? name : `.${name}`}
                    className={i == 0 ? "active" : ""}
                  >
                    {title}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <Projects data={projects} />
        </div>
      </section>
      <Footer contact={footerLinks} />
    </div>
  );
}
