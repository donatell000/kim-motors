import ScrollSnapContainer from "@/components/scroll-snap/ScrollSnapContainer";
import WelcomeIntro from "@/components/welcome/WelcomeIntro";
import Hero from "@/components/hero/Hero";
import Advantages from "@/components/advantages/Advantages";
import About from "@/components/about/About";
import Platforms from "@/components/platforms/Platforms";
import Selection from "@/components/selection/Selection";
import Process from "@/components/process/Process";
import Contact from "@/components/contact/Contact";
import Clients from "@/components/clients/Clients";
import Logistics from "@/components/logistics/Logistics";

export default function Home() {
  return (
    <WelcomeIntro>
      <ScrollSnapContainer>
        <Hero />
        <Advantages />
        <About />
        <Platforms />

        <Selection />
        <Process />

        <Clients />
        <Contact />
        <Logistics />
      </ScrollSnapContainer>
    </WelcomeIntro>
  );
}
