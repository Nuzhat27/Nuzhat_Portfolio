import ProjectCarousel from "./ProjectCarousel";

function ProjectCard({ project, index }) {
  return (
    <article
      className={`project-card ${
        project.screenshots?.length ? "has-gallery" : "no-gallery"
      }`}
    >
      <div className="project-gallery">
        {project.screenshots?.length ? (
          <ProjectCarousel
            screenshots={project.screenshots}
            projectName={project.name}
          />
        ) : (
          <div className="study-placeholder">
            <div className="placeholder-orb" />

            <span className="project-label">
              {project.name.toUpperCase()}
            </span>

            <h4>{project.subtitle}</h4>

            <p>{project.description}</p>

            <small>
              Project screenshots can be added later.
            </small>
          </div>
        )}
      </div>

      <div className="project-content">
        <div className="project-topline">
          <div>
            <span className="project-label">
              {String(index + 1).padStart(2, "0")} · FULL-STACK PROJECT
            </span>

            <h3>{project.name}</h3>

            <div className="project-goal">
              <span>Goal</span>
              <p>{project.goal}</p>
            </div>
          </div>

          <div className="project-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
              >
                Live ↗
              </a>
            )}
          </div>
        </div>

        <p className="project-subtitle">
          {project.subtitle}
        </p>

        <div className="project-description">
          <span>Built</span>
          <p>{project.description}</p>
        </div>

        <div className="project-stack">
          {project.stack?.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;