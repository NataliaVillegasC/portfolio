<script lang="ts">
  import { onMount } from 'svelte'
  import {
    profile,
    education,
    experience,
    projects,
    skills,
    formatRange,
    buildEmail,
  } from '@natalia/shared'

  // Assembled in the browser only, so the address never appears in the
  // prerendered HTML that scrapers harvest. It still prints fine.
  let email = $state('')
  onMount(() => {
    email = buildEmail(profile.emailParts)
  })

  // The one-pager keeps only what a recruiter needs in 30 seconds.
  const work = experience.filter((e) => e.resume)
  const topProjects = projects.filter((p) => p.flagship)
  const mainEducation = education[0]!
</script>

<svelte:head>
  <title>Résumé — {profile.name}</title>
  <meta name="description" content="One-page résumé of {profile.name} — {profile.title}." />
</svelte:head>

<nav class="toolbar" aria-label="Actions">
  <button type="button" onclick={() => window.print()}>Print / Save PDF</button>
</nav>

<main class="paper compact">
  <header>
    <h1>{profile.name}</h1>
    <p class="entry-sub">{profile.title} · {profile.location.city}, {profile.location.country}</p>
    <div class="contact-row">
      <a href={email ? `mailto:${email}` : undefined}>{email}</a>
      <a href={profile.linkedin}>linkedin.com/in/{profile.linkedinHandle}</a>
      <a href={profile.github}>github.com/{profile.githubHandle}</a>
    </div>
  </header>

  <section aria-label="Education">
    <h2>Education</h2>
    <div class="entry">
      <div class="entry-head">
        <h3>{mainEducation.institution}</h3>
        <span class="entry-meta">{formatRange(mainEducation.start, mainEducation.end)}</span>
      </div>
      <p class="entry-sub">{mainEducation.degree}</p>
      <ul>
        <li>
          GPA 4.89/5 — highest in the Industrial Engineering program this century; Ramón de Zubiría
          Award ×3; exchange semester at Seoul National University (2024).
        </li>
      </ul>
    </div>
  </section>

  <section aria-label="Experience">
    <h2>Experience</h2>
    {#each work as job}
      <div class="entry">
        <div class="entry-head">
          <h3>{job.role} · {job.company}</h3>
          <span class="entry-meta">{formatRange(job.start, job.end)}</span>
        </div>
        <ul>
          {#each job.bullets.slice(0, 3) as bullet}
            <li>{bullet}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </section>

  <section aria-label="Projects">
    <h2>Selected Projects</h2>
    {#each topProjects as project}
      <div class="entry">
        <div class="entry-head">
          <h3>{project.title}</h3>
          <span class="entry-meta">{project.tech.slice(0, 4).join(' · ')}</span>
        </div>
        <ul>
          {#each project.highlights.slice(0, 2) as highlight}
            <li>{highlight}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </section>

  <section aria-label="Skills">
    <h2>Skills</h2>
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
</main>

<style>
  /* Tighter rhythm than the CV — this page must print on one sheet */
  .compact {
    font-size: 14px;
  }
  .compact :global(h2) {
    margin: 1.5rem 0 0.7rem;
  }
  .compact .entry {
    margin-bottom: 1rem;
  }
  @media print {
    .compact {
      font-size: 11.5px;
    }
  }
</style>
