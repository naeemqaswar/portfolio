import React, { useEffect } from "react";

const PROJECT_STATUS = Object.freeze({
  development: "development",
  live: "live",
});

export default function DetailsPopup(props: any) {
  const { display = false, details, hide } = props;

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.keyCode === 27 && hide) {
        hide();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (!display) return <div />;

  const {
    title,
    platform,
    images,
    description,
    demo,
    stack,
    source,
    filter,
    live = true,
    secure = false,
    status = PROJECT_STATUS.live,
  } = details;

  const _renderStatus = () => {
    if (status !== PROJECT_STATUS.development) {
      return null;
    }

    return (
      <span
        className={`badge bg-${PROJECT_STATUS.live ? "secondary" : "success"}`}
      >
        {status == PROJECT_STATUS.development ? "Coming Soon" : status}
      </span>
    );
  };

  return (
    <div
      style={{ display: display ? "block" : "none" }}
      className={`modal ${display ? "show" : ""}`}
      aria-labelledby="..."
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content project-details">
          <div className="modal-body">
            <div className="top-action sticky-content">
              <button
                type="button"
                className="btn-close"
                onClick={hide}
              ></button>
            </div>
            <section className="section">
              <div className="site-section pb-0">
                <div className="container">
                  <div className="row align-items-stretch">
                    <div
                      className="col-md-8 portfolio-container"
                      data-aos="fade-up"
                    >
                      {images.map((image: string, i: number) => (
                        <img
                          key={i}
                          src={image}
                          alt={title}
                          className="img-fluid"
                        />
                      ))}
                    </div>
                    <div
                      className="col-md-4 ml-auto"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      <div className="sticky-content">
                        <div className="mb-4">
                          <h2 className="h2 title">{title}</h2>
                          <span className="text-muted platform">
                            {platform}
                          </span>
                          &nbsp;
                          {_renderStatus()}
                        </div>
                        <div className="mb-4">
                          <p>{description}</p>
                        </div>
                        <h4 className="h4 mb-3 fw-bold">Technology Stack</h4>
                        <div className="mb-5 project-stack">
                          <ul>
                            {stack.map((tech: string, i: number) => (
                              <li key={i}>
                                <i
                                  title={tech[0].toUpperCase() + tech.slice(1)}
                                  className={`devicon-${tech}-plain tech-icon colored`}
                                ></i>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          {demo ? (
                            <a href={demo} className="readmore" target="_blank">
                              View Demo
                            </a>
                          ) : null}
                          {source ? (
                            <a
                              href={source}
                              className="readmore"
                              target="_blank"
                            >
                              Source Code
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
