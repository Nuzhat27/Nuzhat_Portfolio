import { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

import { api, setToken } from "./api";

import { projects } from "./data/projects";

import ProjectCard from "./components/projects/ProjectCard";


// ============================================================
// EXPERIENCE DATA
// ============================================================

const experience = [
  {
    role: "Software Development Intern",
    org: "Indian Railways",
    date: "Jun 2025 — Jul 2025",
    bullets: [
      <>
        Built and maintained a <strong>MERN stack</strong> internal workflow
        application across the SDLC.
      </>,
      <>
        Created <strong>12 reusable React components</strong>, reducing
        duplicate frontend code by ~<strong>30%</strong>.
      </>,
      <>
        Connected <strong>6 frontend modules</strong> to Express.js REST APIs
        with client/server validation.
      </>,
      <>
        Resolved <strong>15+ defects</strong>, reducing pre-release issues by
        ~<strong>20%</strong>.
      </>,
    ],
  },

  {
    role: "System Engineer Intern",
    org: "National Aluminium Company Limited (NALCO)",
    date: "May 2025 — Jun 2025",
    bullets: [
      <>
        Built a centralized intranet portal serving <strong>4 departments</strong>.
      </>,
      <>
        Designed <strong>9 REST API endpoints</strong> and MIS, DPR and MPR
        dashboards.
      </>,
      <>
        Refactored JavaScript rendering logic, reducing average page-load time
        by ~<strong>15%</strong>.
      </>,
    ],
  },
];


// ============================================================
// SKILLS DATA
// ============================================================

const skillGroups = [
  { id: "languages", title: "Languages", description: "Languages I use across application logic, scripting and full-stack work.", children: [
    { name: "Java", use: "Backend services and object-oriented programming." },
    { name: "Python", use: "Scripting, algorithm design and data processing." },
    { name: "JavaScript", use: "Primary language across my MERN projects." },
  ]},
  { id: "frontend", title: "Frontend", description: "Reusable interfaces, responsive layouts and component-driven UI.", children: [
    { name: "React.js", use: "Component-based interfaces and reusable UI systems." },
    { name: "HTML5/CSS3", use: "Semantic markup, layout and responsive styling." },
    { name: "Tailwind CSS", use: "Rapid, consistent UI styling across projects." },
  ]},
  { id: "backend", title: "Backend & APIs", description: "Server-side systems, authentication and predictable API contracts.", children: [
    { name: "Node.js", use: "Server runtime across my full-stack applications." },
    { name: "Express.js", use: "REST APIs and backend routing." },
    { name: "REST Design", use: "Resource-oriented endpoints with consistent responses." },
    { name: "JWT Auth", use: "Authentication and role-based access control." },
  ]},
  { id: "databases", title: "Databases", description: "Data models and persistence choices that fit the application problem.", children: [
    { name: "MongoDB", use: "Document modeling, queries and application data persistence." },
    { name: "Mongoose", use: "Schemas, models and validation in MERN applications." },
    { name: "MySQL", use: "Relational database fundamentals and SQL." },
  ]},
  { id: "cs", title: "CS Fundamentals", description: "The fundamentals I rely on when implementation details get complicated.", children: [
    { name: "DSA", use: "Core problem-solving and algorithmic thinking." },
    { name: "OOP", use: "Modular and reusable object-oriented design." },
    { name: "DBMS", use: "Database concepts, normalization and query reasoning." },
    { name: "OS & Networks", use: "Systems and networking fundamentals behind backend decisions." },
  ]},
  { id: "tools", title: "Tools", description: "The everyday tools I use to build, debug, test and ship.", children: [
    { name: "Git / GitHub", use: "Version control and collaborative development." },
    { name: "Postman", use: "API testing and request inspection." },
    { name: "VS Code", use: "Primary development environment." },
  ]},
];


// ============================================================
// APP
// ============================================================

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />

      <Routes>
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="*"
          element={
            <Portfolio />
          }
        />
      </Routes>
    </>
  );
}


// ============================================================
// HEADER / NAVBAR
// ============================================================

function Header({ theme, setTheme }) {
  const [open, setOpen] = useState(false);

  const links = [
    ["about", "About"],
    ["skills", "Skills"],
    ["experience", "Experience"],
    ["projects", "Projects"],
    ["github", "GitHub"],
    ["certifications", "Certifications"],
    ["blog", "Blog"],
    ["contact", "Contact"],
  ];

  const go = (id) => {
    setOpen(false);

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <>
      <header className="site-header">
        <div className="nav-shell">

          <button
            className="brand"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            aria-label="Back to top"
          >
            <span className="brand-mark">
              NF
            </span>

            <span className="brand-copy">
              <strong>Nuzhat Firdosh</strong>
              <small>FULL-STACK DEVELOPER</small>
            </span>
          </button>


          <nav
            className="nav-links"
            aria-label="Primary navigation"
          >
            {links.map(([id, label]) => (
              <button
                key={id}
                onClick={() => go(id)}
              >
                {label}
              </button>
            ))}
          </nav>


          <div className="nav-actions">

            <button
              className="theme-toggle"
              onClick={() =>
                setTheme(
                  theme === "dark"
                    ? "light"
                    : "dark"
                )
              }
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? "☼" : "◐"}
            </button>


            <a
              className="nav-resume"
              href="/Nuzhat_Firdosh_Resume.pdf"
              download
            >
              Resume <span>↓</span>
            </a>


            <button
              className="menu-toggle"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>

          </div>
        </div>
      </header>


      <div
        className={`mobile-drawer ${
          open ? "open" : ""
        }`}
      >
        <div className="drawer-top">

          <div className="brand-copy">
            <strong>Nuzhat Firdosh</strong>
            <small>FULL-STACK DEVELOPER</small>
          </div>

          <button
            onClick={() => setOpen(false)}
          >
            Close ×
          </button>

        </div>


        {links.map(([id, label]) => (
          <button
            key={id}
            onClick={() => go(id)}
          >
            {label}
            <span>↗</span>
          </button>
        ))}


        <a
          href="/Nuzhat_Firdosh_Resume.pdf"
          download
          onClick={() => setOpen(false)}
        >
          Download resume <span>↓</span>
        </a>

      </div>
    </>
  );
}


// ============================================================
// PORTFOLIO
// ============================================================

function Portfolio() {
  const localCertifications = [
    {
      name: "DevOps",
      issuer: "Udemy",
      year: "Udemy",
      url: "https://drive.google.com/file/d/1EBlUQHDTh2pewXtUTZQzC2aTg0kKD8hl/view",
    },
    {
      name: "Web Development",
      issuer: "Udemy",
      year: "Udemy",
      url: "https://drive.google.com/file/d/16jCZoGO5MuTAED-g5Z8BS2rJljhJub7Z/view?usp=drive_link",
    },
  ];

  const [data, setData] = useState({
    projects,
    certifications: localCertifications,
  });

  const [github, setGithub] = useState(null);


  // ----------------------------------------------------------
  // LOAD PORTFOLIO DATA
  // ----------------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    api.get("/portfolio")
      .then(({ data: portfolioData }) => {
        if (cancelled) return;
        setData({
          projects: portfolioData.projects?.length ? portfolioData.projects : projects,
          certifications: localCertifications,
        });
      })
      .catch(() => {
        // Keep the local project data when the optional database API is unavailable.
      });

    const loadGithub = async () => {
      try {
        const username = "Nuzhat27";
        const headers = {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        };

        const [profileResponse, reposResponse, contributionResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { headers }),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { headers }),
          fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
        ]);

        if (!profileResponse.ok || !reposResponse.ok || !contributionResponse.ok) {
          throw new Error("GitHub unavailable");
        }

        const [profile, repos, contributionData] = await Promise.all([
          profileResponse.json(),
          reposResponse.json(),
          contributionResponse.json(),
        ]);

        const languageTotals = {};
        repos.forEach((repo) => {
          if (repo.language) languageTotals[repo.language] = (languageTotals[repo.language] || 0) + 1;
        });
        const totalLanguageCount = Object.values(languageTotals).reduce((sum, value) => sum + value, 0);
        const languages = Object.entries(languageTotals)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            percent: totalLanguageCount ? Number(((count / totalLanguageCount) * 100).toFixed(1)) : 0,
          }));

        const raw = Array.isArray(contributionData.contributions) ? contributionData.contributions : [];
        const first = raw.length ? new Date(`${raw[0].date}T00:00:00`) : new Date();
        const firstSunday = new Date(first);
        firstSunday.setDate(first.getDate() - first.getDay());
        const days = [...raw];
        while (days.length && new Date(`${days[0].date}T00:00:00`) > firstSunday) {
          const d = new Date(`${days[0].date}T00:00:00`);
          d.setDate(d.getDate() - 1);
          days.unshift({ date: d.toISOString().slice(0, 10), count: 0, level: 0 });
        }
        const weeks = [];
        for (let i = 0; i < days.length; i += 7) {
          const week = days.slice(i, i + 7);
          while (week.length < 7) week.push({ date: "", count: 0, level: 0 });
          weeks.push(week);
        }
        const recentWeeks = weeks.slice(-53);

        const next = {
          username,
          url: profile.html_url,
          repos: profile.public_repos ?? 0,
          followers: profile.followers ?? 0,
          following: profile.following ?? 0,
          since: profile.created_at ? new Date(profile.created_at).getFullYear() : null,
          totalContributions: contributionData.total?.lastYear ?? recentWeeks.flat().reduce((sum, d) => sum + (d.count || 0), 0),
          weeks: recentWeeks,
          languages,
          repositories: repos.slice(0, 6).map((repo) => ({
            name: repo.name,
            stars: repo.stargazers_count || 0,
            url: repo.html_url,
          })),
        };

        if (!cancelled) setGithub(next);
      } catch (error) {
        if (!cancelled) {
          setGithub({
            username: "Nuzhat27",
            url: "https://github.com/Nuzhat27",
            error: true,
            weeks: [],
            repositories: [],
            languages: [],
          });
        }
      }
    };

    loadGithub();
    return () => { cancelled = true; };
  }, []);


  return (
    <main>

      {/* ====================================================
          HERO
      ==================================================== */}

      <section
        className="hero"
        id="home"
      >
        <div className="hero-shell">

          <div className="hero-copy">

            <div className="eyebrow">
              <span className="eyebrow-dot" />
              SOFTWARE ENGINEER · MERN · INDIA
            </div>


            <h1>
              Build products
              <br />
              that <span>move</span> people.
            </h1>


            <p className="hero-lede">
              I build full-stack web systems with{" "}
              <strong>
                React, Node.js, Express and MongoDB
              </strong>{" "}
              — turning requirements into reliable,
              maintainable products.
            </p>


            <div className="hero-actions">

              <a
                className="button button-primary"
                href="#projects"
              >
                Explore projects <span>↗</span>
              </a>

              <a
                className="button button-secondary"
                href="#contact"
              >
                Let's talk <span>→</span>
              </a>

            </div>


            <div className="hero-stats">

              <div>
                <strong>9.33</strong>
                <span>CGPA / 10</span>
              </div>

              <div>
                <strong>02</strong>
                <span>SDE internships</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Full-stack platforms</span>
              </div>

            </div>

          </div>


          <HeroWorkspace />

        </div>

        <div className="hero-grid-glow" />
      </section>

      <SkillsMarquee />


      {/* ====================================================
          ABOUT
      ==================================================== */}

      <section
        className="section section-about"
        id="about"
      >
        <div className="section-shell">

          <SectionHeading
            number="01"
            label="ABOUT ME"
            title="Turning ideas into useful digital products."
          />


          <div className="about-layout">

            <div className="about-statement">

              <p>
                I'm a{" "}
                <strong>
                  Computer Science undergraduate
                </strong>{" "}
                at IGIT Sarang, graduating in 2026
                with a{" "}
                <strong>
                  9.33/10 CGPA
                </strong>.
              </p>


              <p>
                My strongest work sits where{" "}
                <strong>
                  frontend engineering,
                  backend APIs and database design
                </strong>{" "}
                meet. I like taking an ambiguous
                requirement and turning it into a
                clean, usable system.
              </p>

            </div>


            <div className="about-facts">

              <Fact
                label="Education"
                value="B.Tech CSE · IGIT Sarang · 2022–2026"
              />

              <Fact
                label="Focus"
                value="MERN · REST APIs · Full-stack systems"
              />

              <Fact
                label="Based in"
                value="India"
              />

              <Fact
                label="Open to"
                value="SDE roles · internships · collaborations"
              />

            </div>

          </div>

        </div>
      </section>


      {/* ====================================================
          SKILLS
      ==================================================== */}

      <section
        className="section skills-section"
        id="skills"
      >
        <div className="section-shell">

          <SectionHeading
            number="02"
            label="SKILL GRAPH"
            title="A map, not a list"
          />

          <SkillGraph />

        </div>
      </section>


      {/* ====================================================
          EXPERIENCE
      ==================================================== */}

      <section
        className="section experience-section"
        id="experience"
      >
        <div className="section-shell">

          <SectionHeading
            number="03"
            label="EXPERIENCE"
            title="Where I've shipped."
          />


          <div className="experience-list">

            {experience.map(
              (item, index) => (
                <ExperienceItem
                  key={item.org}
                  item={item}
                  index={index}
                />
              )
            )}

          </div>

        </div>
      </section>


      {/* ====================================================
          PROJECTS
      ==================================================== */}

      <section
        className="section projects-section"
        id="projects"
      >
        <div className="section-shell">

          <SectionHeading
            number="04"
            label="FEATURED PROJECTS"
            title="Things I've built end-to-end."
          />


          <ProjectShowcase projects={data.projects} />

        </div>
      </section>


      {/* ====================================================
          GITHUB
      ==================================================== */}

      <GitHubSection github={github} />


      {/* ====================================================
          CERTIFICATIONS
      ==================================================== */}

      <section
        className="section credentials-section"
        id="certifications"
      >
        <div className="section-shell">

          <SectionHeading
            number="06"
            label="CREDENTIALS"
            title="Certifications."
          />


          <div className="cert-list">

            {data.certifications.length ? (
              data.certifications.map(
                (cert) => (

                  <a
                    className="cert-card"
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    key={
                      cert._id ||
                      cert.name
                    }
                  >

                    <div>

                      <span className="cert-year">
                        {cert.year}
                      </span>

                      <h3>
                        {cert.name}
                      </h3>

                      <p>
                        {cert.issuer}
                      </p>

                    </div>

                    <span className="cert-arrow">
                      ↗
                    </span>

                  </a>

                )
              )

            ) : (

              <p className="empty-note">
                Certifications will appear
                here after the database is
                seeded.
              </p>

            )}

          </div>

        </div>
      </section>


      {/* ====================================================
          RESUME
      ==================================================== */}

      <section
        className="section resume-section"
        id="resume"
      >
        <div className="section-shell">

          <div className="resume-banner">

            <div>

              <span className="eyebrow">
                07 · RESUME
              </span>

              <h2>
                Want the one-page version?
              </h2>

              <p>
                ATS-friendly resume with
                experience, projects, skills
                and certifications.
              </p>

            </div>


            <div className="resume-actions">

              <a
                className="button button-primary"
                href="/Nuzhat_Firdosh_Resume.pdf"
                download
              >
                Download PDF ↓
              </a>

              <a
                className="button button-secondary"
                href="/Nuzhat_Firdosh_Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Open ↗
              </a>

            </div>

          </div>

        </div>
      </section>


      {/* ====================================================
          BLOG
      ==================================================== */}

      <BlogSection />


      {/* ====================================================
          CONTACT
      ==================================================== */}

      <ContactSection />


      {/* ====================================================
          FOOTER
      ==================================================== */}

      <footer>

        <div className="footer-row">

          <div className="footer-brand">

            <span className="brand-mark">
              NF
            </span>

            <span>
              © {new Date().getFullYear()} Nuzhat Firdosh
            </span>

          </div>


          <div className="footer-links">

            <a
              href="https://github.com/Nuzhat27"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/nuzhat-firdosh-8894842a8/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>

            <a
              href="https://leetcode.com/u/nuzhatfrd/"
              target="_blank"
              rel="noreferrer"
            >
              LeetCode
            </a>

            <Link to="/admin/login">
              Admin
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}


// ============================================================
// SKILLS MARQUEE
// ============================================================

const marqueeSkills = [
  "JAVASCRIPT", "PYTHON", "JAVA", "DSA", "GIT", "REACT",
  "NODE.JS", "EXPRESS", "MONGODB", "REST APIS", "JAVASCRIPT",
  "PYTHON", "JAVA", "DSA", "GIT", "REACT", "NODE.JS", "EXPRESS",
  "MONGODB", "REST APIS",
];

function SkillsMarquee() {
  return (
    <div className="skills-marquee" aria-label="Technology skills">
      <div className="skills-marquee-track">
        {marqueeSkills.map((skill, index) => (
          <span key={`${skill}-${index}`}>
            <i>✦</i>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// HERO WORKSPACE
// ============================================================

function HeroWorkspace() {
  return (
    <div className="workspace-visual hero-reference-image" aria-label="Nuzhat portfolio code workspace">
      <img src="/hero-reference.png" alt="Nuzhat.js full-stack developer workspace" />
    </div>
  );
}

// ============================================================
// SKILL GRAPH
// ============================================================


function SkillGraph() {
  const [activeId, setActiveId] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Keep the same radial geometry as the reference image:
  // six category nodes around STACK, with every child node visible
  // as a dot. Child labels are revealed only for the selected category.
  const center = { x: 280, y: 280 };
  const categoryRadius = 110;
  const skillRadius = 205;

  const getCategoryPosition = (index) => {
    const angle = (index / skillGroups.length) * Math.PI * 2 - Math.PI / 2;
    return {
      angle,
      x: center.x + categoryRadius * Math.cos(angle),
      y: center.y + categoryRadius * Math.sin(angle),
    };
  };

  const getSkillPosition = (groupIndex, skillIndex, count) => {
    const { angle: catAngle } = getCategoryPosition(groupIndex);
    const spread = Math.min(Math.PI / 2.8, 0.92);
    const offset = count === 1
      ? 0
      : (skillIndex / (count - 1) - 0.5) * spread;
    const skillAngle = catAngle + offset;

    return {
      x: center.x + skillRadius * Math.cos(skillAngle),
      y: center.y + skillRadius * Math.sin(skillAngle),
      angle: skillAngle,
    };
  };

  const showSkill = (skill, position) => {
    const placement = position.y < 205
      ? "top"
      : position.y > 355
        ? "bottom"
        : Math.cos(position.angle || 0) >= 0
          ? "right"
          : "left";

    setHoveredSkill({ ...skill, ...position, placement });
  };

  const clearSkill = () => setHoveredSkill(null);

  const tooltipStyle = hoveredSkill
  ? {
      left: `${Math.max(
        12,
        Math.min(
          (hoveredSkill.x / 560) * 100,
          88
        )
      )}%`,
      top: `${Math.max(
        12,
        Math.min(
          (hoveredSkill.y / 560) * 100,
          88
        )
      )}%`,
    }
  : undefined;

  const selectCategory = (groupId) => {
    setActiveId((current) => current === groupId ? null : groupId);
    clearSkill();
  };

  return (
    <div className="skill-graph-layout">
      <div className="skill-graph-stage" id="cxWrap">
        <svg
          className="skill-graph-svg"
          viewBox="0 0 560 560"
          role="img"
          aria-label="Interactive skill constellation"
        >
          {/* Category connections remain visible at all times. */}
          {skillGroups.map((group, i) => {
            const { x, y } = getCategoryPosition(i);
            return (
              <line
                key={`cat-link-${group.id}`}
                className="cx-link"
                x1={center.x}
                y1={center.y}
                x2={x}
                y2={y}
              />
            );
          })}

          <circle className="graph-center-ring" cx={center.x} cy={center.y} r="34" />
          <circle className="graph-center-dot" cx={center.x} cy={center.y} r="7" />
          <text className="graph-center-text" x={center.x} y={center.y + 52} textAnchor="middle">
            STACK
          </text>

          {/*
            IMPORTANT: all child nodes + their connection lines stay visible,
            exactly like the reference. Only their text is conditional.
          */}
          {skillGroups.map((group, groupIndex) => {
            const { x: catX, y: catY } = getCategoryPosition(groupIndex);
            const count = group.children.length;
            const selectedGroup = group.id === activeId;

            return group.children.map((skill, skillIndex) => {
              const { x, y, angle } = getSkillPosition(groupIndex, skillIndex, count);
              const labelOnRight = Math.cos(angle) >= 0;
              const isHovered = hoveredSkill?.name === skill.name;

              return (
                <g
                  key={`${group.id}-${skill.name}`}
                  className={`cx-group skill-group ${selectedGroup ? "selected-skill" : ""} ${isHovered ? "skill-hovered" : ""}`}
                  onMouseEnter={() => showSkill(skill, { x, y, angle })}
                  onMouseLeave={clearSkill}
                  onFocus={() => showSkill(skill, { x, y, angle })}
                  onBlur={clearSkill}
                  onClick={() => showSkill(skill, { x, y, angle })}
                  role="button"
                  tabIndex="0"
                  aria-label={`${skill.name}: ${skill.use}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      showSkill(skill, { x, y, angle });
                    }
                  }}
                >
                  <line
                    x1={catX}
                    y1={catY}
                    x2={x}
                    y2={y}
                    className={`cx-link child-link ${selectedGroup ? "active" : ""}`}
                  />

                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 7 : 5.5}
                    className="cx-node skill-dot"
                  />

                  <text
                    x={x + (labelOnRight ? 11 : -11)}
                    y={y + 4}
                    className={`cx-label skill-label ${selectedGroup ? "revealed" : ""}`}
                    textAnchor={labelOnRight ? "start" : "end"}
                  >
                    {skill.name}
                  </text>
                </g>
              );
            });
          })}

          {/* Category nodes sit above the child network. */}
          {skillGroups.map((group, i) => {
            const { angle, x, y } = getCategoryPosition(i);
            const selected = group.id === activeId;
            const labelOnRight = Math.cos(angle) >= 0;

            return (
              <g
                key={group.id}
                className={`cx-group category-group ${selected ? "selected" : ""}`}
                onClick={() => selectCategory(group.id)}
                role="button"
                tabIndex="0"
                aria-pressed={selected}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectCategory(group.id);
                  }
                }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={selected ? 17 : 9}
                  className={`cx-node cat ${selected ? "selected" : ""}`}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={selected ? 6 : 4}
                  className="cx-category-dot"
                />
                <text
                  x={x + (labelOnRight ? 16 : -16)}
                  y={y + 4}
                  className="cx-label cat-label"
                  textAnchor={labelOnRight ? "start" : "end"}
                >
                  {group.title}
                </text>
              </g>
            );
          })}
        </svg>

        {hoveredSkill && (
          <div
            className={`cx-tooltip show skill-near-tooltip tooltip-${hoveredSkill.placement}`}
            style={tooltipStyle}
          >
            <b>{hoveredSkill.name}</b>
            <span>{hoveredSkill.use}</span>
          </div>
        )}
      </div>

      <div className="skill-graph-copy">
        <p>
          Most portfolios show skills as a flat icon grid. Mine is a graph,
          because that's closer to how I actually think about a stack — a core
          set of fundamentals with everything else connected to it, not a checklist.
        </p>
        <p>
          Click a category to reveal its technologies. Hover over any child
          node to see how I've actually used it.
        </p>

        {activeId ? (
          <div className="graph-detail">
            <span className="heading-label">SELECTED · {skillGroups.find((g) => g.id === activeId)?.title}</span>
            <h3>{skillGroups.find((g) => g.id === activeId)?.title}</h3>
            <p>{skillGroups.find((g) => g.id === activeId)?.description}</p>
          </div>
        ) : (
          <div className="graph-detail graph-detail-empty">
            <span className="heading-label">SELECT A CATEGORY</span>
            <p>Choose a parent node to reveal its technology names.</p>
          </div>
        )}

        <div className="graph-legend">
          <span><i className="legend-category" /> Category</span>
          <span><i className="legend-skill" /> Skill</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PROJECT SHOWCASE
// ============================================================

function ProjectShowcase({ projects: projectList }) {
  if (!projectList.length) {
    return <p className="empty-note">Projects will appear here when the portfolio data loads.</p>;
  }

  return (
    <div className="project-grid">
      {projectList.map((project, index) => (
        <ProjectCard key={project._id || project.name} project={project} index={index} />
      ))}
    </div>
  );
}

// ============================================================
// GITHUB ACTIVITY
// ============================================================

function GitHubActivity({ github }) {
  const weeks = github?.weeks?.length ? github.weeks : [];
  const allDays = weeks.flat();
  const monthLabels = [];
  const seenMonths = new Set();
  weeks.forEach((week, index) => {
    const day = week.find((d) => d.date);
    if (!day) return;
    const date = new Date(`${day.date}T00:00:00`);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!seenMonths.has(key)) {
      seenMonths.add(key);
      monthLabels.push({ label: date.toLocaleString("en-US", { month: "short" }), column: index + 1 });
    }
  });

  return (
    <div className="github-activity">
      <div className="github-activity-head">
        <span>CONTRIBUTION ACTIVITY</span>
        <span>{github?.error ? "UNAVAILABLE" : github?.weeks?.length ? `${github.totalContributions ?? 0} CONTRIBUTIONS` : "CONNECTING"}</span>
      </div>
      <div className="github-months" style={{ gridTemplateColumns: `repeat(${Math.max(weeks.length, 1)}, 1fr)` }}>
        {monthLabels.map((month) => <span key={`${month.label}-${month.column}`} style={{ gridColumn: month.column }}>{month.label}</span>)}
      </div>
      <div className="github-calendar-body">
        <div className="github-weekday-labels"><span>Mon</span><span>Wed</span><span>Fri</span></div>
        <div className="github-activity-grid" style={{ gridTemplateRows: "repeat(7, 1fr)", gridAutoColumns: `calc((100% - ${(weeks.length - 1) * 3}px) / ${Math.max(weeks.length, 1)})` }} aria-label="GitHub contribution graph">
          {weeks.flatMap((week, weekIndex) => week.map((cell, dayIndex) => (
            <span key={`${weekIndex}-${dayIndex}-${cell.date}`} className={`activity-cell level-${cell.level || 0}`} title={cell.date ? `${cell.date}: ${cell.count || 0} contributions` : undefined} />
          )))}
        </div>
      </div>
      <div className="github-activity-foot"><span>Less</span>{[0,1,2,3,4].map((level) => <i key={level} className={`level-${level}`} />)}<span>More</span></div>
    </div>
  );
}

// ============================================================
// BLOG
// ============================================================

const blogPosts = [
  {
    category: "ENGINEERING PRACTICE",
    tags: ["DEBUGGING", "API", "FULL-STACK"],
    title: "I Start With the Failure, Not the Fix",
    excerpt: "When a feature breaks, I first try to make the failure predictable. That means tracing the request from UI to route to database instead of changing code until the error disappears.",
    body: "A useful debugging session starts by shrinking the problem. I reproduce the issue with the smallest input I can, inspect the browser request, check the Express route and validation, and only then look at the database layer. This approach helped me untangle the kind of bugs that appear when several layers are technically working but disagree about a field, response shape or state. The goal is not a clever patch. It is finding the boundary where the system stopped agreeing with itself. Once that boundary is clear, the fix is usually smaller — and much easier to test.",
  },
  {
    category: "BACKEND DESIGN",
    tags: ["MERN", "REST", "MONGODB"],
    title: "Before I Add an Endpoint, I Ask What the Resource Is",
    excerpt: "A clean REST API starts with a clear data model. I learned to define the resource and its state transitions before writing controllers, which makes routes easier to reason about.",
    body: "While building full-stack applications, it is tempting to start with the screen and then create whatever endpoint the screen needs. I now work backwards from the resource: what data exists, who owns it, what can change, and what should happen when an operation fails? That thinking naturally shapes the route, controller and schema. It also makes frontend integration less fragile because the API has a predictable contract instead of being a collection of UI-specific responses.",
  },
  {
    category: "SYSTEM THINKING",
    tags: ["AUTH", "RBAC", "SECURITY"],
    title: "Authorization Is a Data Problem Before It Is a UI Problem",
    excerpt: "Role-based access looks like a button-hiding exercise until users call the API directly. I treat permissions as backend rules first, with the interface reflecting those rules second.",
    body: "For a multi-user platform, I separate authentication from authorization. Knowing who the user is is not the same as knowing what that user is allowed to do. I model roles and protected actions explicitly, enforce them in the API, and only then use the frontend to make the experience clearer by hiding actions the user cannot perform. That order matters: the UI is a convenience layer; the server is the boundary. Thinking this way also makes permission changes easier because the policy lives in one place instead of being scattered across components.",
  },
];

function BlogSection() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section blog-section" id="blog">
      <div className="section-shell">
        <SectionHeading number="09" label="WRITING" title="From the blog" />
        <p className="blog-intro">Notes on how I approach debugging, API design and building reliable full-stack systems — the decisions behind the code matter as much as the code itself.</p>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <article className={`blog-card ${open === index ? "open" : ""}`} key={post.title}>
              <div className="blog-tags">
                <span>{post.category}</span>
                {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              {open === index && <div className="blog-body"><p>{post.body}</p></div>}
              <button className="blog-read" onClick={() => setOpen(open === index ? null : index)}>
                {open === index ? "Close article ↑" : "Read more →"}
              </button>
            </article>
          ))}
        </div>
        <button className="button button-secondary blog-all" onClick={() => setOpen(open === null ? 0 : null)}>
          {open === null ? "Read a post →" : "Close post ↑"}
        </button>
      </div>
    </section>
  );
}

// ============================================================
// SECTION HEADING
// ============================================================

function SectionHeading({
  number,
  label,
  title,
}) {
  return (
    <div className="section-heading">

      <div className="heading-number">
        {number}
      </div>

      <div>

        <div className="heading-label">
          {label}
        </div>

        <h2>
          {title}
        </h2>

      </div>

    </div>
  );
}


// ============================================================
// FACT
// ============================================================

function Fact({ label, value }) {
  return (
    <div className="fact-row">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}


// ============================================================
// EXPERIENCE ITEM
// ============================================================

function ExperienceItem({
  item,
  index,
}) {
  return (
    <article className="experience-item">

      <div className="experience-number">
        0{index + 1}
      </div>


      <div className="experience-main">

        <div className="experience-top">

          <div>

            <h3>
              {item.role}
            </h3>

            <p>
              {item.org}
            </p>

          </div>

          <span>
            {item.date}
          </span>

        </div>


        <ul>

          {item.bullets.map(
            (bullet, bulletIndex) => (
              <li key={bulletIndex}>
                {bullet}
              </li>
            )
          )}

        </ul>

      </div>

    </article>
  );
}


// ============================================================
// GITHUB
// ============================================================

function GitHubSection({ github }) {
  return (
    <section
      className="section github-section"
      id="github"
    >
      <div className="section-shell">

        <SectionHeading
          number="05"
          label="OPEN SOURCE"
          title="A live snapshot of my GitHub."
        />


        <div className="github-layout">

          <div className="github-main-card">

            <div className="github-card-head">

              <div>

                <span className="heading-label">
                  @Nuzhat27
                </span>

                <h3>
                  Code, projects & progress.
                </h3>

              </div>


              <a
                href="https://github.com/Nuzhat27"
                target="_blank"
                rel="noreferrer"
              >
                Visit GitHub ↗
              </a>

            </div>


            <GitHubActivity github={github} />

            <div className="github-stats">

              <div>
                <strong>{github?.repos ?? "—"}</strong>
                <span>Public repos</span>
              </div>

              <div>
                <strong>{github?.followers ?? "—"}</strong>
                <span>Followers</span>
              </div>

              <div>
                <strong>{github?.following ?? "—"}</strong>
                <span>Following</span>
              </div>

              <div>
                <strong>{github?.since ?? "—"}</strong>
                <span>On GitHub since</span>
              </div>

            </div>


            <div className="language-panel">

              <div className="panel-head">

                <span>
                  LANGUAGE BREAKDOWN
                </span>

                <span>
                  {github
                    ? "LIVE DATA"
                    : "CONNECTING"}
                </span>

              </div>


              {github?.languages?.length ? (

                github.languages.map(
                  (language) => (

                    <div
                      className="language-row"
                      key={language.name}
                    >

                      <div className="language-label">

                        <span>
                          {language.name}
                        </span>

                        <b>
                          {language.percent}%
                        </b>

                      </div>


                      <div className="language-track">

                        <i
                          style={{
                            width: `${Math.max(
                              language.percent,
                              4
                            )}%`,
                          }}
                        />

                      </div>

                    </div>

                  )
                )

              ) : (

                <div className="github-empty">
                  GitHub language data will
                  appear here when the API
                  responds.
                </div>

              )}

            </div>

          </div>


          <div className="repo-panel">

            <div className="panel-head">

              <span>
                RECENT REPOSITORIES
              </span>

              <span>
                UPDATED
              </span>

            </div>


            {(github?.repositories || [])
              .slice(0, 6)
              .map((repo) => (

                <a
                  className="repo-row"
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  key={repo.name}
                >

                  <span>
                    {repo.name}
                  </span>

                  <b>
                    ★ {repo.stars}
                  </b>

                </a>

              ))}


            {!github?.repositories?.length && (

              <a
                className="repo-row"
                href="https://github.com/Nuzhat27"
                target="_blank"
                rel="noreferrer"
              >

                <span>
                  github.com/Nuzhat27
                </span>

                <b>
                  ↗
                </b>

              </a>

            )}

          </div>

        </div>

      </div>
    </section>
  );
}


// ============================================================
// CONTACT
// ============================================================

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [state, setState] = useState({
    type: "",
    text: "",
  });


  async function submit(event) {
    event.preventDefault();

    setState({
      type: "loading",
      text: "Sending…",
    });


    try {
      await api.post(
        "/messages",
        form
      );

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setState({
        type: "success",
        text: "Message sent successfully.",
      });

    } catch (error) {

      setState({
        type: "error",
        text:
          error.response?.data?.message ||
          "Could not send message.",
      });

    }
  }


  return (
    <section
      className="section contact-section"
      id="contact"
    >

      <div className="section-shell contact-wrap">

        <div className="contact-copy">

          <span className="heading-label">
            08 · CONTACT
          </span>

          <h2>
            Have a problem
            <br />
            <em>worth building?</em>
          </h2>


          <p>
            Open to software engineering
            roles, internships,
            collaborations and interesting
            product problems.
          </p>


          <div className="contact-links">

            <a href="mailto:nuzhatfrd@gmail.com">
              <span>Email</span>
              <strong>
                nuzhatfrd@gmail.com ↗
              </strong>
            </a>


            <a
              href="https://www.linkedin.com/in/nuzhat-firdosh-8894842a8/"
              target="_blank"
              rel="noreferrer"
            >
              <span>LinkedIn</span>
              <strong>
                /in/nuzhat-firdosh ↗
              </strong>
            </a>


            <a
              href="https://github.com/Nuzhat27"
              target="_blank"
              rel="noreferrer"
            >
              <span>GitHub</span>
              <strong>
                @Nuzhat27 ↗
              </strong>
            </a>


            <a
              href="https://leetcode.com/u/nuzhatfrd/"
              target="_blank"
              rel="noreferrer"
            >
              <span>LeetCode</span>
              <strong>
                @nuzhatfrd ↗
              </strong>
            </a>

          </div>

        </div>


        <form
          className="contact-form"
          onSubmit={submit}
        >

          <div className="form-intro">
            SEND A MESSAGE
          </div>


          <div className="field">

            <label>
              Name
            </label>

            <input
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name: event.target.value,
                })
              }
              required
              placeholder="Your name"
            />

          </div>


          <div className="field">

            <label>
              Email
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({
                  ...form,
                  email: event.target.value,
                })
              }
              required
              placeholder="you@example.com"
            />

          </div>


          <div className="field">

            <label>
              Message
            </label>

            <textarea
              value={form.message}
              onChange={(event) =>
                setForm({
                  ...form,
                  message: event.target.value,
                })
              }
              required
              placeholder="Tell me what you're building..."
            />

          </div>


          <button
            className="button button-primary"
            disabled={state.type === "loading"}
          >
            {state.type === "loading"
              ? "Sending…"
              : "Send message →"}
          </button>


          {state.text && (
            <div
              className={`form-status ${state.type}`}
            >
              {state.text}
            </div>
          )}


          <small>
            Your message is stored securely
            in the portfolio database.
          </small>

        </form>

      </div>

    </section>
  );
}


// ============================================================
// ADMIN LOGIN
// ============================================================

function AdminLogin() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const navigate =
    useNavigate();


  async function login(event) {
    event.preventDefault();

    setError("");

    try {

      const { data } =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      setToken(data.token);

      navigate("/admin");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed."
      );

    }
  }


  return (
    <div className="admin-page">

      <div className="admin-card">

        <span className="heading-label">
          ADMIN CMS
        </span>

        <h1>
          Portfolio control.
        </h1>

        <p>
          Manage portfolio messages,
          projects and certifications.
        </p>


        <form onSubmit={login}>

          <div className="field">

            <label>
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              required
            />

          </div>


          <div className="field">

            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              required
            />

          </div>


          {error && (
            <div className="form-status error">
              {error}
            </div>
          )}


          <button className="button button-primary">
            Sign in →
          </button>

        </form>

      </div>

    </div>
  );
}


// ============================================================
// ADMIN DASHBOARD
// ============================================================

function Admin() {
  const [messages, setMessages] =
    useState([]);

  const [adminProjects, setAdminProjects] =
    useState([]);

  const [certs, setCerts] =
    useState([]);

  const navigate =
    useNavigate();


  const load = async () => {

    try {

      const [
        { data: messagesData },
        { data: portfolioData },
      ] = await Promise.all([
        api.get("/messages"),
        api.get("/portfolio"),
      ]);


      setMessages(
        messagesData
      );

      setAdminProjects(
        portfolioData.projects || []
      );

      setCerts(
        portfolioData.certifications || []
      );

    } catch {

      setToken(null);

      navigate("/admin/login");
    }
  };


  useEffect(() => {
    load();
  }, []);


  const remove = async (
    type,
    id
  ) => {

    const endpoint =
      type === "messages"
        ? `/messages/${id}`
        : `/admin/${type}/${id}`;


    await api.delete(endpoint);

    load();
  };


  return (
    <div className="admin-page">

      <div className="section-shell admin-wrap">

        <div className="admin-top">

          <div>

            <span className="heading-label">
              CMS
            </span>

            <h1>
              Portfolio control
            </h1>

          </div>


          <button
            className="button button-secondary"
            onClick={() => {
              setToken(null);
              navigate("/admin/login");
            }}
          >
            Logout
          </button>

        </div>


        <div className="admin-grid">

          {/* MESSAGES */}

          <div className="admin-panel">

            <h2>
              Messages ({messages.length})
            </h2>


            {messages.map((message) => (

              <div
                className="message"
                key={message._id}
              >

                <strong>
                  {message.name}
                </strong>

                <span>
                  {message.email}
                </span>

                <p>
                  {message.message}
                </p>


                <div className="message-actions">

                  {!message.read && (
                    <button
                      onClick={() =>
                        api
                          .patch(
                            `/messages/${message._id}/read`
                          )
                          .then(load)
                      }
                    >
                      Mark read
                    </button>
                  )}


                  <button
                    onClick={() =>
                      remove(
                        "messages",
                        message._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>


          {/* PROJECTS */}

          <div className="admin-panel">

            <h2>
              Projects ({adminProjects.length})
            </h2>


            {adminProjects.map((project) => (

              <div
                className="admin-row"
                key={project._id}
              >

                <span>
                  {project.name}
                </span>

                <button
                  onClick={() =>
                    remove(
                      "projects",
                      project._id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            ))}

          </div>


          {/* CERTIFICATIONS */}

          <div className="admin-panel">

            <h2>
              Certifications ({certs.length})
            </h2>


            {certs.map((cert) => (

              <div
                className="admin-row"
                key={cert._id}
              >

                <span>
                  {cert.name}
                </span>

                <button
                  onClick={() =>
                    remove(
                      "certifications",
                      cert._id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}


export default App;