import React from "react";

export default function Footer(props: any) {
  const { contact } = props;

  return (
    <div>
      <footer className="footer footer-section" role="contentinfo">
        <div className="container">
          <div className="social text-md-center">
            {contact &&
              Object.keys(contact).map((k, i) => {
                return (
                  <a key={i} target="_blank" href={contact[k]}>
                    <span className={`bi bi-${k.toLowerCase()}`}></span>
                  </a>
                );
              })}
          </div>
        </div>
      </footer>
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
}
