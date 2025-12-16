import Hero from "@/components/home/hero/Hero";
import Services from "@/components/home/services/Services";
import ServiceLinks from "@/components/home/serviceLinks/ServiceLinks";
import ReviewSlider from "@/components/home/review/ReviewSlider";
import styles from "./page.module.scss";

const Home: React.FC = () => {
  return (
    <main className={styles.homeContainer}
    >
      <Hero />
      <Services />
      <ServiceLinks />
      <ReviewSlider />
    </main>
  );
};

export default Home;


// import React from "react";
// import Image from "next/image";
// import styles from "./page.module.scss";

// const Home: React.FC = () => {
//   return (
//     <main className={styles.homeContainer}>
//       {/* ✅ HERO SECTION */}
//       <section className={styles.heroSection}>
//         <div className={styles.heroContent}>
//           <h1>Expert Electrician & Cooling System Contractor</h1>
//           <p>Providing top-notch electrical and air conditioning solutions for homes and businesses.</p>
//         </div>

//         {/* ✅ Hero Image - Half Width */}
//         <div className={styles.heroImageContainer}>
//           <Image 
//             src="/assets/room-hero.webp" 
//             alt="Room being prepped for air conditioning and lighting installation"
//             width={800} // Adjust based on your preference
//             height={500} 
//             className={styles.heroImage}
//           />
//         </div>
//       </section>

//       {/* ✅ WRAP EACH SECTION IN A SEPARATE CONTAINER */}
//       <div className={styles.sectionsContainer}>
//         <div className={`${styles.sectionContainer} ${styles.servicesSection}`}>
//           <h2>Our Services</h2>
//           <p>We provide top-notch air conditioning and electrical solutions.</p>
//         </div>

//         <div className={`${styles.sectionContainer} ${styles.aboutSection}`}>
//           <h2>About Us</h2>
//           <p>With years of experience, we are industry leaders in cooling solutions.</p>
//         </div>

//         <div className={`${styles.sectionContainer} ${styles.projectsSection}`}>
//           <h2>Our Projects</h2>
//           <p>See our past installations and happy customers.</p>
//         </div>

//         <div className={`${styles.sectionContainer} ${styles.contactSection}`}>
//           <h2>Contact Us</h2>
//           <p>Get in touch for expert consultation and services.</p>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Home;
