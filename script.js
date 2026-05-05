async function loadProjects() {
  try {
    const res = await fetch('projects.json');

    if (!res.ok) {
      throw new Error("Failed to load projects.json");
    }

    const projects = await res.json();

    const container = document.getElementById('projects-container');
    container.innerHTML = "";

    projects.forEach(project => {
      const card = createProjectCard(project);
      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading projects:", error);
  }
}


/**
 * Creates a single project card element
 * This isolates UI creation so it can scale later (filters, sorting, etc.)
 */
function createProjectCard(project) {
  const status = normalizeStatus(project.status);

  const card = document.createElement('div');
  card.classList.add('card', status);

  card.innerHTML = `
    <h2>${project.name}</h2>
    <p>${project.description}</p>

    <span class="status-badge ${status}">
      ${project.status}
    </span>

    <p><strong>Tech:</strong> ${(project.tech || []).join(", ")}</p>

    <a href="${project.repo}" target="_blank">View Repo</a>
  `;

  return card;
}


/**
 * Normalizes status strings into safe CSS class names
 * Example: "In Progress" → "in-progress"
 */
function normalizeStatus(status) {
  return (status || "")
    .toLowerCase()
    .replace(/\s/g, "-");
}

loadProjects();