import SectionHeading from '../components/SectionHeading';

const About = () => {
  return (
    <div className="pt-32 pb-20 section-padding min-h-screen">
      <div className="container mx-auto">
        <SectionHeading title="About AIIC" subtitle="The Anand Innovation & Incubation Council" />
        <div className="glass-card p-8">
          <p className="text-text-secondary leading-relaxed mb-6">
            The Anand Innovation & Incubation Council (AIIC) is a Section 8 Not-for-Profit Company established on March 29, 2024. Operating within the Marathwada Institute of Technology, Aurangabad, our goal is to foster an ecosystem of innovation, prototyping, and entrepreneurship.
          </p>
          <p className="text-text-secondary leading-relaxed mb-6">
            Guided by **Mentor Dr. Y. A. Kawade** and supported by **DG Munish Sharma**, AIIC serves as a launchpad for student-led startups and cutting-edge research projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
