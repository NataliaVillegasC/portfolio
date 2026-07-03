<script lang="ts">
  import { profile, education, experience, projects, skills, formatRange } from '@natalia/shared'

  const LEADERSHIP_COMPANY = 'Stanford University (Online)'
  const work = experience.filter((e) => e.company !== LEADERSHIP_COMPANY)
  const leadership = experience.filter((e) => e.company === LEADERSHIP_COMPANY)
  const cvProjects = projects.filter((p) => !p.draft)
</script>

<svelte:head>
  <title>CV — {profile.name}</title>
  <meta name="description" content="Full academic CV of {profile.name} — {profile.title}." />
</svelte:head>

<nav class="toolbar" aria-label="Actions">
  <button type="button" onclick={() => window.print()}>Print / Save PDF</button>
</nav>

<main class="paper">
  <header>
    <h1>{profile.name}</h1>
    <p class="entry-sub">{profile.title} · {profile.location.city}, {profile.location.country}</p>
    <div class="contact-row">
      <span>{profile.phone}</span>
      <a href="mailto:{profile.email}">{profile.email}</a>
      <a href={profile.linkedin}>linkedin.com/in/{profile.linkedinHandle}</a>
      <a href={profile.github}>github.com/{profile.githubHandle}</a>
    </div>
  </header>

  <section aria-label="Education">
    <h2>Education</h2>
    {#each education as item}
      <div class="entry">
        <div class="entry-head">
          <h3>{item.institution}</h3>
          <span class="entry-meta">{formatRange(item.start, item.end)}</span>
        </div>
        <p class="entry-sub">{item.degree} · {item.location}</p>
        <ul>
          {#each item.details as detail}
            <li>{detail}</li>
          {/each}
        </ul>
        {#if item.honors.length > 0}
          <div style="margin-top: 0.5rem">
            {#each item.honors as honor}
              <span class="honor">{honor}</span>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </section>

  <section aria-label="Experience">
    <h2>Experience</h2>
    {#each work as job}
      <div class="entry">
        <div class="entry-head">
          <h3>{job.role}</h3>
          <span class="entry-meta">{formatRange(job.start, job.end)}</span>
        </div>
        <p class="entry-sub">{job.company} · {job.location}</p>
        <ul>
          {#each job.bullets as bullet}
            <li>{bullet}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </section>

  <section aria-label="Projects">
    <h2>Projects</h2>
    {#each cvProjects as project}
      <div class="entry">
        <div class="entry-head">
          <h3>{project.title}</h3>
          <span class="entry-meta">{project.period}</span>
        </div>
        <p class="entry-sub">{project.tech.join(' · ')}</p>
        <ul>
          {#each project.highlights as highlight}
            <li>{highlight}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </section>

  <section aria-label="Technical skills">
    <h2>Technical Skills</h2>
    <div class="skills-grid">
      {#each skills as group}
        <div class="skills-row">
          <span class="skills-label">{group.label}</span>
          <span>{group.items.join(', ')}</span>
        </div>
      {/each}
      <div class="skills-row">
        <span class="skills-label">Languages</span>
        <span>{profile.languages.map((l) => `${l.name} (${l.level})`).join(', ')}</span>
      </div>
    </div>
  </section>

  {#if leadership.length > 0}
    <section aria-label="Leadership">
      <h2>Leadership / Extracurricular</h2>
      {#each leadership as item}
        <div class="entry">
          <div class="entry-head">
            <h3>{item.role}</h3>
            <span class="entry-meta">{formatRange(item.start, item.end)}</span>
          </div>
          <p class="entry-sub">{item.company}</p>
          <ul>
            {#each item.bullets as bullet}
              <li>{bullet}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </section>
  {/if}
</main>
