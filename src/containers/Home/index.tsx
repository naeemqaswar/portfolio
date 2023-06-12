import React, { useState, useEffect } from "react";

import Portfolio from "../../data/portfolio.json";
import { IInfo, IFilter, IProject, IContact } from "../../types";
import { base64Decode, getParameterByName } from "../../utils/helper";
import Footer from "../../components/Footer";
import Filters from "./Filters";
import Projects from "./Projects";
import Info from "./Info";

const SECURE_SECRET = "fuck off";

export default function Home() {
  const [info, setInfo] = useState<IInfo>();
  const [footerLinks, setFooterLinks] = useState<IContact>();
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);

  // Loading filter and project content
  useEffect(() => {
    const { info, contact, filters, projects } = Portfolio;

    let _fProjects = projects.filter(
      ({ secure, live }) =>
        _securityCheck(secure) == true && (live == true || live == undefined)
    );

    setInfo(info);
    setFooterLinks(contact);
    setFilters(filters);
    setProjects(_fProjects);
  }, []);

  const _securityCheck = (secure: boolean | undefined) => {
    if (!secure) return true;

    let _secretRequest = getParameterByName("secret");
    if (_secretRequest) {
      if (base64Decode(_secretRequest) == SECURE_SECRET) return true;
    }

    return false;
  };

  return (
    <div id="main">
      <section className="section site-portfolio">
        <div className="container">
          <div className="row mb-5 align-items-center header-section">
            <Info data={info!} />
            <Filters data={filters} />
          </div>
          <Projects data={projects} />
        </div>
      </section>
      <Footer contact={footerLinks} />
    </div>
  );
}
