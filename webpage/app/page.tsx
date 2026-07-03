import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Journey } from '@/components/Journey'
import { WorldMap } from '@/components/WorldMap'
import { Projects } from '@/components/Projects'
import { Toolbox } from '@/components/Toolbox'
import { Postcards } from '@/components/Postcards'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Journey />
      <WorldMap />
      <Projects />
      <Toolbox />
      <Postcards />
    </main>
  )
}
