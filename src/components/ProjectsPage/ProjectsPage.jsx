import React, { useEffect } from 'react';
import './ProjectsPage.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: "Em desenvolvimento",
    subtitle: "Em breve novidades",
    imageSrc: "https://media.tenor.com/g3y2q5VQxvAAAAAM/cat-computer.gif",
    githubUrl: "https://github.com/carolsoul"
  },
  {
    id: 2,
    title: "Em desenvolvimento",
    subtitle: "Em breve novidades",
    imageSrc: "https://media.tenor.com/Va_MYd9zdeUAAAAM/gato-mouse.gif",
    githubUrl: "https://github.com/carolsoul"
  },
  {
    id: 3,
    title: "Em desenvolvimento",
    subtitle: "Em breve novidades",
    imageSrc: "https://media.tenor.com/8wBCqZH60U8AAAAM/computer-cat.gif",
    githubUrl: "https://github.com/carolsoul"
  },
  {
    id: 4,
    title: "Em desenvolvimento",
    subtitle: "Em breve novidades",
    imageSrc: "https://i.gifer.com/2WWe.gif",
    githubUrl: "https://github.com/carolsoul"
  },
  {
    id: 5,
    title: "Em desenvolvimento",
    subtitle: "Em breve novidades",
    imageSrc: "https://usagif.com/wp-content/uploads/cat-typing-20.gif",
    githubUrl: "https://github.com/carolsoul"
  },
  {
    id: 6,
    title: "Em desenvolvimento",
    subtitle: "Em breve novidades",
    imageSrc: "https://i.gifer.com/7IjS.gif",
    githubUrl: "https://github.com/carolsoul"
  },
  {
    id: 7,
    title: "Portfólio Isabela Moraes",
    subtitle: "Desenvolvimento Front-end",
    imageSrc: "./portfolio-isabela-moraes.png",
    githubUrl: "https://github.com/carolsoul/isabela-de-moraes"
  },
  {
    id: 8,
    title: "Agenda de Contatos",
    subtitle: "Aplicação Full-Stack",
    imageSrc: "./agenda-de-contatos.png",
    githubUrl: "https://github.com/carolsoul/agenda-de-contatos"
  },
  {
    id: 9,
    title: "601 Arcade Bar & Karaokê",
    subtitle: "Sistema de Busca de Músicas",
    imageSrc: "./601-arcade-bar.png",
    githubUrl: "https://github.com/carolsoul/601-arcade-bar-karaoke"
  }
];

function Projects() {
  useEffect(() => {
    // array de todos os elementos com a classe .slide
    const slides = gsap.utils.toArray(".slide");
    // array de todas as imagens borradas de .active-slide img
    const activeSlideImages = gsap.utils.toArray(".active-slide img");

    //function que pega a profundidade inicial (Z) de cada .slide se já tiver transformação aplicada, se não, retorna 0
    function getInitialTranslateZ(slide) {
      const style = window.getComputedStyle(slide); //pega estilos computados que o navegador está aplicando no momento
      const matrix = style.transform.match(/matrix3d\((.+)\)/); //verifica se transform é uma matrix 3D (que é armazenada em 16 valores)
      if (matrix) {
        const values = matrix[1].split(", "); //divide os 16 valores em lista de strings
        return parseFloat(values[14] || 0); //14 em matrix 3D corresponde ao translateZ e converte em numero, se for ausente, usa 0
      }
      return 0;
    }

    //função que calcula a opacidade suavemente. converte os valores de um intervalo para outro, se currentZ vai de -5000 para 0, a opacidade vai de 0 a 1 proporcionalmente
    function mapRange(value, inMin, inMax, outMin, outMax) {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    //pega a profundidade inicial de cada .slide
    slides.forEach((slide, index) => {
      const initialZ = getInitialTranslateZ(slide);

      ScrollTrigger.create({
        trigger: ".container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress; //pega o progress (de 0 a 1) conforme scroll
          const ZIncrement = progress * 22500; //multiplica para ter profundidade real
          const currentZ = initialZ + ZIncrement; //e soma com a posição inicial 

          //calculo de opacidade com base na profundidade, quanto mais perto, mais visível
          let opacity;
          if (currentZ > -2500) {
            opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
          } else {
            opacity = mapRange(currentZ, -5000, -2500, 0, 0.5);
          }

          //o slide se move em porfundidade (Z) e centraliza em X e Y
          slide.style.opacity = opacity;
          slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;

          //se a profundidade for menor que 100 continua trazendo a imagem para frente, se não, ela desparece
          if (currentZ < 100) {
            gsap.to(activeSlideImages[index], {
              opacity: 1,
              duration: 1.5,
              ease: "power3.out"
            });
          } else {
            gsap.to(activeSlideImages[index], {
              opacity: 0,
              duration: 1.5,
              ease: "power3.out"
            });
          }
        }
      });
    });
  }, []);

  return (
    <section className='projects' id='projects'>

      <div className="container">
        {/* Renderiza as imagens de fundo dinamicamente */}
        <div className="active-slide">
          {projectsData.map(project => (
            <img 
              src={project.imageSrc} 
              alt={`Imagem do projeto ${project.title}`} 
              key={project.id} 
            />
          ))}
        </div>

        <div className="slider">
          {/* Mapeia os dados do projeto para criar cada slide */}
          {projectsData.map((project) => (
            <div className="slide" id={`slide-${project.id}`} key={project.id}>
              <div className="slide-copy">
                <p>{project.title}</p>
                <p id='index'>{project.subtitle}</p>
              </div>
              
              {/* A imagem agora é um link clicável para o GitHub */}
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="slide-img-link">
                <div className="slide-img">
                  <img src={project.imageSrc} alt={`Thumbnail do projeto ${project.title}`} />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        <div className="text-call-to-action">
          <p>Vamos construir algo incrível juntos</p>
          <small>Pronto para transformar sua ideia em realidade? Estou aqui para te ajudar a criar experiências digitais exepcionais.</small>
        </div>

        <div className="btn-container">
          <a href="mailto:carolannago2005@gmail.com" target="_blank" rel="noopener noreferrer">
            <button className="send-email">Me mande um e-mail</button>
          </a>

          <a href="https://github.com/carolsoul" target="_blank" rel="noopener noreferrer">
            <button className="see-github">Veja meu GitHub</button>
          </a>
        </div>

        <div className="social">
          <a
            href="https://wa.me/5511962237927?text=Ol%C3%A1%2C%20vim%20pelo%20seu%20portf%C3%B3lio%21"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./WHATSAPP.svg" alt="icone-do-whatsapp" className='icon' />
          </a>
          <a href="https://www.linkedin.com/in/anna-caroline-gon%C3%A7alves-9624262b0/">
            <img src="./LINKEDIN.svg" alt="icone-do-linkedin" className='icon' />
          </a>
          <a
            href="/CURRICULO_ANNA.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./CV.svg" alt="icone-do-curriculo" className='icon' />
          </a>
        </div>

        <footer>
          <p>
            feito com &#10084;.
            <br />
            &copy; 2025 Carol Sousa. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </section>
  );
}

export default Projects;