import React, { useContext } from "react";

import { isArray } from "util";
import AppContext from "../Context";

export default function Project(props: any) {
  const { details } = props;
  const { setPopupContent } = useContext(AppContext);

  const { title, platform, filter, images, coverFocus = "top" } = details;

  const _coverImage = images[0];
  const _filterClasses = isArray(filter) ? filter.join(" ") : filter;

  return (
    <div className={`item ${_filterClasses} col-sm-12 col-md-12 col-lg-6 mb-6`}>
      <a
        href="javascript:void(0);"
        className="item-wrap img-fluid"
        onClick={() => setPopupContent(details)}
        style={{
          backgroundImage: `url(${_coverImage})`,
          backgroundPositionX: coverFocus,
        }}
      >
        <div className="work-info">
          <h3>{title}</h3>
          <span>{platform}</span>
        </div>
      </a>
    </div>
  );
}
