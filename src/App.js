import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
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

  const projects = [
    { title: 'Mosaic', image: `${process.env.PUBLIC_URL}/images/mosaic.png`, link: 'https://github.com/pjmercurio/Mosaic-Saver', ring: 1 },
    { title: 'Vinyl Streamer', image: `${process.env.PUBLIC_URL}/images/vinyl.png`, link: 'http://paulmercur.io/vinyl-streamer/', ring: 1 },
    { title: 'Spotifipod', image: `${process.env.PUBLIC_URL}/images/spotifipod.png`, link: 'https://github.com/pjmercurio/spotifipod', ring: 1 },
    { title: 'A/C Control', image: `${process.env.PUBLIC_URL}/images/webservo.jpg`, link: 'https://github.com/pjmercurio/webservo', ring: 1 },
    { title: 'Tank Sensor', image: `${process.env.PUBLIC_URL}/images/tank-sensor.jpeg`, link: 'https://github.com/pjmercurio/iot-sensor-module', ring: 1 },
    { title: 'PiSight', image: `${process.env.PUBLIC_URL}/images/pisight.png`, link: '', ring: 1 },
    { title: 'SunDay', image: `${process.env.PUBLIC_URL}/images/sun-day.png`, link: 'http://paulmercur.io/sun-day/', ring: 1 },
    { title: 'TaoAntrim', image: `${process.env.PUBLIC_URL}/images/taoantrim.png`, link: 'https://taoantrim.com/?page=photo', ring: 1 },
  ];

  const socials = [
    { title: 'Instagram', image: `${process.env.PUBLIC_URL}/images/instagram-logo.png`, link: 'https://www.instagram.com/paulmercurio', ring: 0, radius: 50 },
    { title: 'Github', image: `${process.env.PUBLIC_URL}/images/github-logo.svg`, link: 'https://github.com/pjmercurio', ring: 0, radius: 50 },
    { title: 'Linkedin', image: `${process.env.PUBLIC_URL}/images/linkedin-logo.webp`, link: 'https://www.linkedin.com/in/paul-mercurio-1a43bb59/', ring: 0, radius: 50 },
    { title: 'Email', image: `${process.env.PUBLIC_URL}/images/gmail-logo.png`, link: 'mailto:pauljosephmercurio@gmail.com', ring: 0, radius: 50 },
    { title: 'Vimeo', image: `${process.env.PUBLIC_URL}/images/vimeo-logo.png`, link: 'https://vimeo.com/paulmercurio', ring: 0, radius: 50 }
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

  useEffect(() => {
    const planets = document.querySelectorAll('.planet');
    setTimeout(() => {
      planets.forEach((planet) => {
        planet.classList.add('final');
      });
    }, 1000);
  }, []);

  return (
    <div className="App">
      <div className="solar-system">
        <div className="solar-system-center">
          <CenterImage />
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
                    width: `${social.radius}px`,
                    height: `${social.radius}px`,
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
