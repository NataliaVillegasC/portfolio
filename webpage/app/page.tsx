import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Journey } from '@/components/Journey'
import { WorldMap } from '@/components/WorldMap'
import { EducationExperience } from '@/components/EducationExperience'
import { Projects } from '@/components/Projects'
import { Certifications } from '@/components/Certifications'
import { Languages } from '@/components/Languages'
import { Community } from '@/components/Community'
import { Toolbox } from '@/components/Toolbox'
import { Postcards } from '@/components/Postcards'
import { ClosingNote } from '@/components/ClosingNote'
import { Washi } from '@/components/Washi'
import { ScrollFx } from '@/components/fx/ScrollFx'
import { FlightProgress } from '@/components/fx/FlightProgress'
import { CoverOpen } from '@/components/fx/CoverOpen'

export default function HomePage() {
  return (
    <main>
      <CoverOpen />
      <ScrollFx />
      <FlightProgress />
      <Hero />
      <About />
      <Washi tint="blue" rotate={2} />
      <Journey />
      <WorldMap />
      <Washi tint="green" rotate={-2.5} />
      <EducationExperience />
      <Projects />
      <Washi tint="gold" rotate={1.5} />
      <Certifications />
      <Languages />
      <Community />
      <Toolbox />
      <Washi tint="blue" rotate={-2} />
      <Postcards />
      <ClosingNote />
    </main>
  )
}
