import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Gallery from './components/Gallery';
import CenterImage from './components/CenterImage';
import Planet from './components/Planet';
import Tooltip from './components/Tooltip';

// Helper function to get positions based on number of planets and radius
const getPlanetPositions = (projects) => {
  const isMobile = window.innerWidth < 768;
  const rings = isMobile ? [90, 155, 500] : [110, 250, 550];
  const numPlanets = projects.length;
  const positions = [];
  const angleStep = (2 * Math.PI) / numPlanets;
  for (let i = 0; i < numPlanets; i++) {
    const radius = rings[projects[i].ring];
    const angle = angleStep * i - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    positions.push({ x, y });
  }
  return positions;
};

function App() {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleProjectClick = useCallback(() => {
    const planets = document.querySelectorAll('.planet');
    const gallery = document.querySelector('.gallery');
    const centerImage = document.querySelector('.center-image');
    planets.forEach((planet) => {
      planet.classList.remove('final');
    });
    gallery.classList.add('visible');
    centerImage.classList.add('small');
  }, []);

  const handleGalleryClose = useCallback(() => {
    const planets = document.querySelectorAll('.planet');
    const gallery = document.querySelector('.gallery');
    const centerImage = document.querySelector('.center-image');
    planets.forEach((planet) => {
      planet.classList.add('final');
    });
    gallery.classList.remove('visible');
    centerImage.classList.remove('small');
  }, []);

  const projects = [
    { title: 'Mosaic', image: `${process.env.PUBLIC_URL}/images/mosaic.webp`, link: 'https://github.com/pjmercurio/Mosaic-Saver', ring: 1 },
    { title: 'Vinyl Streamer', image: `${process.env.PUBLIC_URL}/images/vinyl.webp`, link: 'http://paulmercur.io/vinyl-streamer/', ring: 1 },
    { title: 'Spotifipod', image: `${process.env.PUBLIC_URL}/images/spotifipod.webp`, link: 'https://github.com/pjmercurio/spotifipod', ring: 1 },
    { title: 'A/C Control', image: `${process.env.PUBLIC_URL}/images/webservo.webp`, link: 'https://github.com/pjmercurio/webservo', ring: 1 },
    { title: 'Tank Sensor', image: `${process.env.PUBLIC_URL}/images/tank-sensor.webp`, link: 'https://github.com/pjmercurio/iot-sensor-module', ring: 1 },
    { title: 'PiSight', image: `${process.env.PUBLIC_URL}/images/pisight.webp`, link: '', ring: 1 },
    { title: 'SunDay', image: `${process.env.PUBLIC_URL}/images/sun-day.webp`, link: 'http://paulmercur.io/sun-day/', ring: 1 },
    { title: 'Tao Antrim', image: `${process.env.PUBLIC_URL}/images/taoantrim.png`, link: 'https://taoantrim.com/?page=photo', ring: 1 },
    { title: 'Project Gallery', image: `${process.env.PUBLIC_URL}/images/gallery.webp`, onClick: handleProjectClick, ring: 1 },
  ];

  const socials = [
    { title: 'Instagram', image: `${process.env.PUBLIC_URL}/images/instagram-logo.webp`, link: 'https://www.instagram.com/paulmercurio', ring: 0 },
    { title: 'Github', image: `${process.env.PUBLIC_URL}/images/github-logo.svg`, link: 'https://github.com/pjmercurio', ring: 0 },
    { title: 'Linkedin', image: `${process.env.PUBLIC_URL}/images/linkedin-logo.webp`, link: 'https://www.linkedin.com/in/paul-mercurio-1a43bb59/', ring: 0 },
    { title: 'Email', image: `${process.env.PUBLIC_URL}/images/gmail-logo.webp`, link: 'mailto:pauljosephmercurio@gmail.com', ring: 0 },
    { title: 'Vimeo', image: `${process.env.PUBLIC_URL}/images/vimeo-logo.webp`, link: 'https://vimeo.com/paulmercurio', ring: 0,  },
    { title: 'Resumé', image: `${process.env.PUBLIC_URL}/images/resume-logo.webp`, link: `${process.env.PUBLIC_URL}/images/Resume_Paul_Mercurio.pdf`, ring: 0 }
  ]; 

  // Calculate positions for all projects
  const socialPositions = getPlanetPositions(socials);
  const projectPositions = getPlanetPositions(projects);

  // Assign positions to planets
  socials.forEach((social, idx) => {
    social.position = socialPositions[idx];
  });
  projects.forEach((project, idx) => {
    project.position = projectPositions[idx];
  });

  // Handle tooltip visibility
  const handleMouseEnter = useCallback((event, title) => {
    setTooltipContent(title);
    setTimeout(() => {
      const rect = event.target.getBoundingClientRect();
      const tooltipRect = document.querySelector('.tooltip').getBoundingClientRect();
      setTooltipPosition({ 
        x: rect.left + rect.width / 2 - tooltipRect.width / 2, 
        y: rect.top - tooltipRect.height - 10 
      });
      setTooltipVisible(true);
    }, 0);
  }, []);

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  // Initial animation
  useEffect(() => {
    const planets = document.querySelectorAll('.planet');
    setTimeout(() => {
      planets.forEach((planet) => {
        planet.classList.add('final');
      });
    }, 750);
  }, []);

  return (
    <div className="App">
      <Gallery onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
      <div className="solar-system">
        <div className="solar-system-center">
          <CenterImage onClick={handleGalleryClose} />
          <div className="planets">
            {
              socials.map((social, index) => (
                <Planet
                  key={`social-${index}`}
                  title={social.title}
                  link={social.link}
                  style={{
                    '--planet-transform': `translate(${social.position.x}px, ${social.position.y}px) translate(-50%, -50%)`,
                    background: `url(${social.image}) fixed center / 40px no-repeat`,
                    width: `${50}px`,
                    height: `${50}px`,
                  }}
                  onMouseEnter={(e) => handleMouseEnter(e, social.title)}
                  onMouseLeave={handleMouseLeave}
                />
            ))}
            {projects.map((project, index) => (
              <Planet
                key={`planet-${index}`}
                title={project.title}
                link={project.link}
                onClick={project.onClick}
                style={{
                  '--planet-transform': `translate(${project.position.x}px, ${project.position.y}px) translate(-50%, -50%)`,
                  backgroundImage: `url(${project.image})`,
                }}
                onMouseEnter={(e) => handleMouseEnter(e, project.title)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>
      </div>
      <Tooltip visible={tooltipVisible} content={tooltipContent} position={tooltipPosition} />
    </div>
  );
}

export default App;
