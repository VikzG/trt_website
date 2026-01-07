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
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Loader key="loader" finishLoading={() => setIsLoading(false)} />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-white lg:cursor-none"
        >
          <CustomCursor />
          <Navbar scrollToSection={scrollToSection} />
          <Hero />
          <Presentation />
          <Services />
          <PortfolioSection
            portfolioData={portfolioData}
            openModal={openModal}
          />
          <SoundModal
            data={modalData}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
