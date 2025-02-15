import Aboutus from "../../components/About_us/Aboutus"
import Banner from "../../components/banner/Banner"
import Service from "../../components/service/Service"
import TopRacers from "../../components/TopRacers/TopRacers"


const About = () => {
  return (
    <div className="md:space-y-40  space-y-20">
        <section>
          <Banner page="About" title="About Us" />
        </section>
        <section  >
        <Service/>
        </section>
        <section>
          <Aboutus/>
        </section>
        <section className="pb-20">
          <TopRacers/>
        </section>
    </div>
  )
}

export default About
