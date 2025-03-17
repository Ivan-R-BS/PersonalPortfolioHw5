document.addEventListener('DOMContentLoaded', () => {

  const projectsData = [
    {
      title: "Programmed Line Follower", 
      image: "images/arduinocar.webp", 
      alt: "Arduino based 3D Printed car chassis", 
      description: "Worked on getting an arduino-based car moving with the Arduino chip as the controller, using sensors and programming. Helped me get better at SolidWorks and Arduino-based Coding.", 
      link: "https://images.app.goo.gl/RDU1yG8s1oGdPDcS8", 
      linkText: "View Source img",
      isEven: false
    },
    {
      title: "React Website", 
      image: "images/ss.png", 
      alt: "Screenshot of React website with Spotify integration", 
      description: "Worked on a team to make a React-based website which allowed users to connect to their Spotify and listen to music and share what they were listening to with friends, featuring a pomodoro timer and task management.", 
      link: "video/react.mp4", 
      linkText: "Watch Demo",
      isEven: true
    },
    {
      title: "Mini-Computer in VHDL", 
      image: "images/rtl-wave.png", 
      alt: "RTL schematic and input output waveform view", 
      description: "Using VHDL, created a mini computer capable of performing basic commands like add, subtract, bitshifts etc. Helped me better understand assembly and hardware design.", 
      link: "https://www.researchgate.net/publication/375159178/figure/fig2/AS:11431281202429779@1698851768598/Figure-A1-Eight-bit-binary-rate-multiplier-a-RTL-diagram-obtained-by-compiling-the.png", 
      linkText: "View Source img",
      isEven: false
    }
  ];

 
  const remoteDataUrl = 'https://my-json-server.typicode.com/Ivan-R-BS/project-card-api/projects';

  
  const loadLocalBtn = document.getElementById('load-local');
  const loadRemoteBtn = document.getElementById('load-remote');
  const projectsContainer = document.getElementById('projects-container');

  
  if (!localStorage.getItem('projectsData')) {
    localStorage.setItem('projectsData', JSON.stringify(projectsData));
  }


  function clearProjects() {
    projectsContainer.innerHTML = '';
  }

 
  function createProjectCard(project) {
    const card = document.createElement('project-card');
    card.setAttribute('title', project.title);
    card.setAttribute('image', project.image);
    card.setAttribute('alt', project.alt);
    card.setAttribute('description', project.description);
    card.setAttribute('link', project.link);
    card.setAttribute('link-text', project.linkText);
    
    if (project.isEven) {
      card.setAttribute('is-even', '');
    }
    
    projectsContainer.appendChild(card);
  }

 
  loadLocalBtn.addEventListener('click', () => {
    try {
      clearProjects();
      const localData = JSON.parse(localStorage.getItem('projectsData'));
      
      if (!localData || !Array.isArray(localData)) {
        projectsContainer.innerHTML = '<p>No valid data found in local storage</p>';
        return;
      }
      
      localData.forEach(project => createProjectCard(project));
    } catch (error) {
      console.error('Error loading local data:', error);
      projectsContainer.innerHTML = `<p>Error loading data from local storage: ${error.message}</p>`;
    }
  });

 
  loadRemoteBtn.addEventListener('click', () => {
    clearProjects();
    projectsContainer.innerHTML = '<p>Loading projects from remote server...</p>';
    
    fetch(remoteDataUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        clearProjects();
        
        const projects = Array.isArray(data) ? data : data.projects || data.records || data.data || [];
        
        if (projects.length === 0) {
          projectsContainer.innerHTML = '<p>No projects found in remote data</p>';
          return;
        }
        
        projects.forEach(project => createProjectCard(project));
        
        localStorage.setItem('projectsData', JSON.stringify(projects));
      })
      .catch(error => {
        console.error('Error fetching remote data:', error);
        projectsContainer.innerHTML = `<p>Error loading remote data: ${error.message}</p>`;
      });
  });
});