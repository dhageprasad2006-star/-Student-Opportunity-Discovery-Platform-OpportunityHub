import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const opportunities = [
  {
    id: 1,
    title: "Java Full Stack Developer Internship",
    organization: "TechNova Labs",
    type: "Internship",
    mode: "Hybrid",
    location: "Pune",
    skills: ["Java", "Spring Boot", "SQL", "React"],
    deadline: "2026-10-15",
    description: "Hands-on internship for students interested in Java backend and modern web development.",
    link: "https://example.com/java-internship"
  },
  {
    id: 2,
    title: "FIT-FEST Student Hackathon",
    organization: "Flora Institute of Technology",
    type: "Hackathon",
    mode: "In Person",
    location: "Pune",
    skills: ["React", "JavaScript", "Problem Solving"],
    deadline: "2026-10-05",
    description: "Build an innovative software solution and present it to a jury.",
    link: "https://example.com/hackathon"
  },
  {
    id: 3,
    title: "Cloud Fundamentals Certification",
    organization: "Cloud Academy",
    type: "Certification",
    mode: "Online",
    location: "Online",
    skills: ["Cloud Computing", "AWS", "Networking"],
    deadline: "2026-11-01",
    description: "Beginner-friendly certification covering cloud infrastructure and core services.",
    link: "https://example.com/cloud-certification"
  },
  {
    id: 4,
    title: "Data Analytics Beginner Course",
    organization: "LearnData",
    type: "Course",
    mode: "Online",
    location: "Online",
    skills: ["Python", "SQL", "Pandas", "Data Analytics"],
    deadline: "2026-10-28",
    description: "Learn data cleaning, analysis, visualization and practical Python skills.",
    link: "https://example.com/data-course"
  },
  {
    id: 5,
    title: "Women in Technology Scholarship",
    organization: "FutureTech Foundation",
    type: "Scholarship",
    mode: "Online",
    location: "India",
    skills: ["Technology", "Engineering"],
    deadline: "2026-10-20",
    description: "Scholarship opportunity supporting students pursuing technology and engineering education.",
    link: "https://example.com/scholarship"
  },
  {
    id: 6,
    title: "Python Coding Competition",
    organization: "CodeArena",
    type: "Competition",
    mode: "Online",
    location: "Online",
    skills: ["Python", "DSA", "Problem Solving"],
    deadline: "2026-10-12",
    description: "Online coding competition focused on programming and problem-solving skills.",
    link: "https://example.com/python-contest"
  },
  {
    id: 7,
    title: "AWS Cloud Internship",
    organization: "CloudWorks",
    type: "Internship",
    mode: "Remote",
    location: "Remote",
    skills: ["AWS", "Cloud Computing", "Linux"],
    deadline: "2026-10-30",
    description: "Remote internship involving cloud deployment, Linux and basic infrastructure monitoring.",
    link: "https://example.com/aws-internship"
  },
  {
    id: 8,
    title: "SQL & Database Workshop",
    organization: "DataBridge",
    type: "Workshop",
    mode: "Online",
    location: "Online",
    skills: ["SQL", "MySQL", "DBMS"],
    deadline: "2026-10-08",
    description: "Practical workshop covering SQL queries, joins, normalization and database concepts.",
    link: "https://example.com/sql-workshop"
  }
];

const defaultProfile = {
  name: "",
  education: "",
  skills: "",
  interests: "",
  categories: ["Internship", "Hackathon"]
};

function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem("studentProfile")) || defaultProfile;
  } catch {
    return defaultProfile;
  }
}

function loadBookmarks() {
  try {
    return JSON.parse(localStorage.getItem("bookmarks")) || [];
  } catch {
    return [];
  }
}

function App() {
  const [page, setPage] = useState("dashboard");
  const [profile, setProfile] = useState(loadProfile);
  const [bookmarks, setBookmarks] = useState(loadBookmarks);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [mode, setMode] = useState("All");
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem("studentProfile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const toggleBookmark = (id) => {
    setBookmarks((old) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id]
    );
    showToast(bookmarks.includes(id) ? "Removed from saved items" : "Saved successfully");
  };

  const profileSkills = profile.skills
    .toLowerCase()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const profileInterests = profile.interests
    .toLowerCase()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const recommended = useMemo(() => {
    const categories = profile.categories || [];
    return opportunities
      .map((item) => {
        const skillMatches = item.skills.filter((skill) =>
          profileSkills.some((s) => skill.toLowerCase().includes(s) || s.includes(skill.toLowerCase()))
        ).length;
        const interestMatches = item.type && profileInterests.some((s) =>
          item.type.toLowerCase().includes(s) || item.skills.some((skill) => skill.toLowerCase().includes(s))
        ) ? 1 : 0;
        const categoryMatch = categories.includes(item.type) ? 2 : 0;
        return { ...item, score: skillMatches * 3 + interestMatches + categoryMatch };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [profile, profileSkills.join(","), profileInterests.join(",")]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return opportunities.filter((item) => {
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.skills.some((skill) => skill.toLowerCase().includes(q));
      const matchesCategory = category === "All" || item.type === category;
      const matchesLocation = location === "All" || item.location === location;
      const matchesMode = mode === "All" || item.mode === mode;
      return matchesQuery && matchesCategory && matchesLocation && matchesMode;
    });
  }, [query, category, location, mode]);

  const saved = opportunities.filter((x) => bookmarks.includes(x.id));

  const navigate = (next) => {
    setPage(next);
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveProfile = (event) => {
    event.preventDefault();
    showToast("Profile saved successfully");
    navigate("dashboard");
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand" onClick={() => navigate("dashboard")}>
          <div className="brand-mark">OH</div>
          <div>
            <strong>OpportunityHub</strong>
            <span>FIT-FEST 2026</span>
          </div>
        </div>

        <nav>
          <button className={page === "dashboard" ? "active" : ""} onClick={() => navigate("dashboard")}>Dashboard</button>
          <button className={page === "discover" ? "active" : ""} onClick={() => navigate("discover")}>Discover</button>
          <button className={page === "saved" ? "active" : ""} onClick={() => navigate("saved")}>Saved ({bookmarks.length})</button>
          <button className={page === "profile" ? "active" : ""} onClick={() => navigate("profile")}>My Profile</button>
        </nav>
      </header>

      <main className="container">
        {page === "dashboard" && (
          <>
            <section className="hero">
              <div>
                <p className="eyebrow">STUDENT OPPORTUNITY DISCOVERY PLATFORM</p>
                <h1>Find the right opportunity, <span>all in one place.</span></h1>
                <p className="hero-copy">
                  Discover internships, hackathons, courses, certifications, scholarships and competitions based on your skills and interests.
                </p>
                <div className="hero-actions">
                  <button className="primary" onClick={() => navigate("discover")}>Explore Opportunities →</button>
                  <button className="secondary" onClick={() => navigate("profile")}>Complete My Profile</button>
                </div>
              </div>
              <div className="hero-card">
                <div className="mini-icon">🎯</div>
                <h3>Personalized discovery</h3>
                <p>Set your skills and interests to get simple rule-based recommendations.</p>
                <div className="stat-row"><b>{opportunities.length}</b><span>sample opportunities</span></div>
                <div className="stat-row"><b>{bookmarks.length}</b><span>saved by you</span></div>
              </div>
            </section>

            <section className="section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">SMART RECOMMENDATIONS</p>
                  <h2>Recommended for you</h2>
                </div>
                <button className="text-button" onClick={() => navigate("profile")}>Update profile →</button>
              </div>
              {recommended.length ? (
                <div className="grid">
                  {recommended.slice(0, 4).map((item) => (
                    <OpportunityCard key={item.id} item={item} bookmarked={bookmarks.includes(item.id)}
                      onBookmark={toggleBookmark} onDetails={() => setSelected(item)} />
                  ))}
                </div>
              ) : (
                <EmptyState title="Complete your profile" text="Add your skills and interests to unlock relevant recommendations." action="Go to Profile" onClick={() => navigate("profile")} />
              )}
            </section>

            <section className="section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">EXPLORE</p>
                  <h2>Opportunity categories</h2>
                </div>
              </div>
              <div className="category-grid">
                {["Internship", "Hackathon", "Course", "Certification", "Scholarship", "Competition", "Workshop"].map((cat) => (
                  <button key={cat} className="category-card" onClick={() => { setCategory(cat); navigate("discover"); }}>
                    <span>{categoryEmoji(cat)}</span>
                    <strong>{cat}</strong>
                    <small>{opportunities.filter((x) => x.type === cat).length} opportunities</small>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {page === "discover" && (
          <>
            <PageHeader eyebrow="DISCOVER" title="Find opportunities" text="Search and filter opportunities that match your goals." />
            <div className="filters">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="🔎 Search by title, company or skill..." />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>All</option>
                {["Internship", "Hackathon", "Course", "Certification", "Scholarship", "Competition", "Workshop"].map(x => <option key={x}>{x}</option>)}
              </select>
              <select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option>All</option><option>Pune</option><option>Online</option><option>Remote</option><option>India</option>
              </select>
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option>All</option><option>Online</option><option>Remote</option><option>Hybrid</option><option>In Person</option>
              </select>
            </div>
            <p className="result-count">{filtered.length} opportunities found</p>
            <div className="grid">
              {filtered.map((item) => (
                <OpportunityCard key={item.id} item={item} bookmarked={bookmarks.includes(item.id)}
                  onBookmark={toggleBookmark} onDetails={() => setSelected(item)} />
              ))}
            </div>
            {!filtered.length && <EmptyState title="No opportunities found" text="Try changing your search or filters." />}
          </>
        )}

        {page === "saved" && (
          <>
            <PageHeader eyebrow="BOOKMARKS" title="Saved opportunities" text="Keep useful opportunities in one place for later." />
            {saved.length ? (
              <div className="grid">
                {saved.map((item) => (
                  <OpportunityCard key={item.id} item={item} bookmarked
                    onBookmark={toggleBookmark} onDetails={() => setSelected(item)} />
                ))}
              </div>
            ) : (
              <EmptyState title="Nothing saved yet" text="Explore opportunities and bookmark the ones you want to revisit." action="Discover opportunities" onClick={() => navigate("discover")} />
            )}
          </>
        )}

        {page === "profile" && (
          <>
            <PageHeader eyebrow="STUDENT PROFILE" title="Tell us about yourself" text="Your profile powers skill and interest-based recommendations." />
            <form className="profile-form" onSubmit={saveProfile}>
              <div className="form-grid">
                <label>Full Name<input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} placeholder="e.g. Aarti Dhage" required /></label>
                <label>Education<input value={profile.education} onChange={e => setProfile({...profile, education: e.target.value})} placeholder="e.g. BE Computer Engineering" required /></label>
                <label className="full">Skills <span>comma separated</span><input value={profile.skills} onChange={e => setProfile({...profile, skills: e.target.value})} placeholder="Java, SQL, React, Python" required /></label>
                <label className="full">Interests <span>comma separated</span><input value={profile.interests} onChange={e => setProfile({...profile, interests: e.target.value})} placeholder="Software Development, Cloud, Data Science" /></label>
              </div>
              <div>
                <h3>Preferred opportunity categories</h3>
                <div className="check-grid">
                  {["Internship", "Hackathon", "Course", "Certification", "Scholarship", "Competition", "Workshop"].map(cat => (
                    <label className="check" key={cat}>
                      <input type="checkbox" checked={(profile.categories || []).includes(cat)}
                        onChange={() => {
                          const current = profile.categories || [];
                          const next = current.includes(cat) ? current.filter(x => x !== cat) : [...current, cat];
                          setProfile({...profile, categories: next});
                        }} />
                      {categoryEmoji(cat)} {cat}
                    </label>
                  ))}
                </div>
              </div>
              <button className="primary" type="submit">Save Profile & Get Recommendations</button>
            </form>
          </>
        )}
      </main>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}>×</button>
            <span className="pill">{categoryEmoji(selected.type)} {selected.type}</span>
            <h2>{selected.title}</h2>
            <p className="org">{selected.organization}</p>
            <div className="detail-row"><b>📍 Location</b><span>{selected.location}</span></div>
            <div className="detail-row"><b>💻 Mode</b><span>{selected.mode}</span></div>
            <div className="detail-row"><b>📅 Deadline</b><span>{formatDate(selected.deadline)}</span></div>
            <p>{selected.description}</p>
            <div className="tags">{selected.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
            <div className="modal-actions">
              <button className="secondary" onClick={() => toggleBookmark(selected.id)}>
                {bookmarks.includes(selected.id) ? "★ Saved" : "☆ Save Opportunity"}
              </button>
              <a className="primary link-button" href={selected.link} target="_blank" rel="noreferrer">Visit Opportunity ↗</a>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}

      <footer>
        <strong>OpportunityHub</strong> · FIT-FEST 2026 Hackathon · Student Opportunity Discovery Platform
      </footer>
    </div>
  );
}

function OpportunityCard({ item, bookmarked, onBookmark, onDetails }) {
  return (
    <article className="card">
      <div className="card-top">
        <span className="pill">{categoryEmoji(item.type)} {item.type}</span>
        <button className="bookmark" title="Save opportunity" onClick={() => onBookmark(item.id)}>
          {bookmarked ? "★" : "☆"}
        </button>
      </div>
      <h3>{item.title}</h3>
      <p className="org">{item.organization}</p>
      <div className="meta"><span>📍 {item.location}</span><span>💻 {item.mode}</span></div>
      <div className="tags">{item.skills.slice(0, 4).map(skill => <span key={skill}>{skill}</span>)}</div>
      <div className="card-bottom">
        <small>Deadline: {formatDate(item.deadline)}</small>
        <button className="details" onClick={onDetails}>View Details →</button>
      </div>
    </article>
  );
}

function PageHeader({ eyebrow, title, text }) {
  return <section className="page-header"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p></section>;
}

function EmptyState({ title, text, action, onClick }) {
  return <div className="empty"><div className="empty-icon">🔎</div><h3>{title}</h3><p>{text}</p>{action && <button className="primary" onClick={onClick}>{action}</button>}</div>;
}

function categoryEmoji(category) {
  return ({ Internship: "💼", Hackathon: "🏆", Course: "📚", Certification: "🎓", Scholarship: "💰", Competition: "⚡", Workshop: "🛠️" })[category] || "✨";
}

function formatDate(value) {
  return new Date(value + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

createRoot(document.getElementById("root")).render(<App />);