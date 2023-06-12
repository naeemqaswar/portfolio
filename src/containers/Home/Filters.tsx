import { IFilter } from "../../types";

export default function Filters(props: { data: IFilter[] }) {
  const { data } = props;

  if (!data) return <div />;

  return (
    <div
      className="col-md-12 col-lg-6 text-start text-lg-end filters-section"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div id="filters" className="filters">
        {data.map(({ name, title }, i) => (
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
  );
}
