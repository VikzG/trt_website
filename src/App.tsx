import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "./components/portfolioData";
import SoundModal from "./components/SoundModal";
import Navbar from "./components/Navbar";
import Presentation from "./components/Presentation";
import Hero from "./components/Hero";
import Services from "./components/Services";
import PortfolioSection from "./components/PortfolioSection";
import Footer from "./components/Footer";
import FooterParallax from "./components/FooterParallax";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";

interface ModalData {
  videoFile: string;
  soundFile: string;
  title: string;
  client: string;
  type: string;
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Gestion de la modale
  const openModal = (item: any) => {
    const data: ModalData = {
      videoFile: item.videoFile ?? item.video ?? "",
      soundFile: item.soundFile ?? item.audioFile ?? item.audio ?? "",
      title: item.title ?? item.name ?? "",
      client: item.client ?? "",
      type: item.type ?? "",
    };
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setModalData(null), 300);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-black lg:cursor-none">
      <AnimatePresence>
        {isLoading && (
          <Loader key="loader" finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
      >
        <CustomCursor />
        <Navbar scrollToSection={scrollToSection} />
        <main className="relative z-20 shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
        <Hero />
        <Presentation />
        <Services />
        <PortfolioSection portfolioData={portfolioData} openModal={openModal} />
        <Contact />
        </main>
        {/* Le wrapper pour l'effet final */}
        <div className="relative">

          <FooterParallax />

        </div>
        <SoundModal
          data={modalData}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </motion.div>
    </div>
  );
}

export default App;
