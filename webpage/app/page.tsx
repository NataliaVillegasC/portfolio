import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Journey } from '@/components/Journey'
import { WorldMap } from '@/components/WorldMap'
import { EducationExperience } from '@/components/EducationExperience'
import { Projects } from '@/components/Projects'
import { Certifications } from '@/components/Certifications'
import { Community } from '@/components/Community'
import { Toolbox } from '@/components/Toolbox'
import { Postcards } from '@/components/Postcards'
import { ClosingNote } from '@/components/ClosingNote'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Journey />
      <WorldMap />
      <EducationExperience />
      <Projects />
      <Certifications />
      <Community />
      <Toolbox />
      <Postcards />
      <ClosingNote />
    </main>
  )
}
