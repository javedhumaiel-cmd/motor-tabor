import { useReveal } from './lib/useReveal'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Overview from './components/Overview'
import Residence from './components/Residence'
import Amenities from './components/Amenities'
import Gallery from './components/Gallery'
import FloorPlans from './components/FloorPlans'
import Neighborhood from './components/Neighborhood'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useReveal()
  return (
    <div id="top" className="bg-paper">
      <Nav />
      <main>
        <Hero />
        <Overview />
        <Residence />
        <Amenities />
        <Gallery />
        <FloorPlans />
        <Neighborhood />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
