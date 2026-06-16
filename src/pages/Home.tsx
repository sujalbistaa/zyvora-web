import Hero from '../components/Hero'
import JerseySpot from '../components/JerseySpot'
import Work from '../components/Work'
import Automation from '../components/Automation'
import CTA from '../components/CTA'
import { useReveal } from '../hooks/useReveal'

export default function Home() {
  useReveal()
  return (
    <main>
      <Hero />
      <JerseySpot />
      <Work />
      <Automation />
      <CTA />
    </main>
  )
}
