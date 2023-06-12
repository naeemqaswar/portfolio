import React from "react";
import { IInfo } from "../../types";

export default function Info(props: { data: IInfo }) {
  const { data } = props;

  if (!data) return <div />;

  const { title, headline } = data;

  return (
    <div
      className="col-md-12 col-lg-6 mb-4 mb-lg-0 info-section"
      data-aos="fade-up"
    >
      <h2>{title}</h2>
      <p className="mb-0">{headline}</p>
    </div>
  );
}
