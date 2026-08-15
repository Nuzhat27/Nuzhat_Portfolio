import { useEffect, useState } from "react";

function ProjectCarousel({ screenshots, projectName }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || screenshots.length < 2) return undefined;

    const id = window.setInterval(() => {
      setActive(
        (current) => (current + 1) % screenshots.length
      );
    }, 4500);

    return () => window.clearInterval(id);
  }, [paused, screenshots.length]);

  const move = (direction) => {
    setActive(
      (current) =>
        (current + direction + screenshots.length) %
        screenshots.length
    );
  };

  const current = screenshots[active];

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-stage">
        {screenshots.map((shot, index) => (
          <img
            key={shot.src}
            src={shot.src}
            alt={`${projectName} ${shot.label}`}
            className={`carousel-image ${
              index === active ? "active" : ""
            }`}
          />
        ))}

        <div className="carousel-overlay">
          <span>{current.label}</span>

          <strong>
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(screenshots.length).padStart(2, "0")}
          </strong>
        </div>

        {screenshots.length > 1 && (
          <>
            <button
              className="carousel-arrow left"
              onClick={() => move(-1)}
              aria-label="Previous screenshot"
            >
              ←
            </button>

            <button
              className="carousel-arrow right"
              onClick={() => move(1)}
              aria-label="Next screenshot"
            >
              →
            </button>
          </>
        )}
      </div>

      <div className="carousel-caption">
        <p>{current.caption}</p>

        <div className="carousel-dots">
          {screenshots.map((shot, index) => (
            <button
              key={shot.src}
              className={index === active ? "active" : ""}
              onClick={() => setActive(index)}
              aria-label={`Show ${shot.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCarousel;