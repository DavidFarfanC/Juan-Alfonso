import { useEffect, useState } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.35 }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    if (!activeProject) {
      document.body.style.removeProperty('overflow')
      return
    }

    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveProject(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.removeProperty('overflow')
    }
  }, [activeProject])

  const handleContactSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nombre = formData.get('name')?.trim() || 'Sin nombre'
    const correo = formData.get('email')?.trim() || 'Sin correo'
    const mensaje = formData.get('message')?.trim() || 'Sin mensaje'

    const text = `Hola, me gustaría una propuesta.\n\nNombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}`
    const phone = '523333682559'
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`

    window.open(url, '_blank', 'noopener,noreferrer')
    event.currentTarget.reset()
  }

  const projects = [
    {
      title: 'VIÑA EMILIA',
      type: 'VINICOLA | CAVA | COCINA | B&B',
      location: 'ENSENADA, BC',
      description:
        'Un refugio en el Valle de Ensenada donde la arquitectura dialoga con la tierra, el vino y el atardecer.',
      image:
        'https://res.cloudinary.com/dkucopkow/image/upload/v1762065083/Captura_de_pantalla_2025-11-01_a_la_s_11.31.14_p.m._jaomtu.png',
      descriptionLong:
        'El proyecto combina piedra local, madera y teja tradicional para crear un volumen acogedor que se integra con el entorno agrícola. Los accesos enmarcan la llegada desde los viñedos y conducen a terrazas y estancias exteriores diseñadas para la convivencia. La cava y los espacios gastronómicos se vinculan visualmente con los patios, mientras que la volumetría busca capturar la luz del valle y mantener una temperatura interior estable. La arquitectura responde al clima mediterráneo de Ensenada con materiales durables y una espacialidad serena pensada para recibir al visitante.',
      gallery: [
        'https://res.cloudinary.com/dkucopkow/image/upload/v1762065142/Captura_de_pantalla_2025-11-01_a_la_s_11.32.14_p.m._pqrfcm.png',
        'https://res.cloudinary.com/dkucopkow/image/upload/v1762065157/Captura_de_pantalla_2025-11-01_a_la_s_11.32.32_p.m._ookwh6.png',
        'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2071',
      ],
      quote:
        'La "poesía" más poderosa de los arquitectos tiende a venir en forma construida, hay quienes usan papel y lapiz para articular su pasión, orgullo o incluso desesperación en relación con el diseño',
      quoteAuthor: 'Juan G.',
    },
    {
      title: 'ARQUITECTURA SUSTENTABLE',
      type: 'MODERNA | SUSTENTABILIDAD | TRANSPARENTE',
      location: 'VALLE DE GUADALUPE, BC',
      description:
        'Un pabellón contemporáneo que se eleva sobre el paisaje del Valle de Guadalupe para contemplarlo sin invadirlo.',
      image:
        'https://res.cloudinary.com/dkucopkow/image/upload/v1762065696/Captura_de_pantalla_2025-11-01_a_la_s_11.41.29_p.m._zfzjkb.png',
      descriptionLong:
        'El proyecto se apoya sobre una estructura elevada que permite minimizar el impacto en el terreno y maximiza la ventilación natural. Los volúmenes se resuelven con acero expuesto, paneles de madera y grandes cristales que abren el espacio hacia las montañas y viñedos. La terraza frontal funciona como mirador, mientras que el interior se articula mediante materiales cálidos y techos altos que integran iluminación tenue. Su diseño apuesta por eficiencia térmica, construcción ligera y una relación directa con el paisaje, alineándose con principios de arquitectura sustentable.',
      gallery: [
        'https://res.cloudinary.com/dkucopkow/image/upload/v1762065727/Captura_de_pantalla_2025-11-01_a_la_s_11.41.49_p.m._bzbqvn.png',
        'https://res.cloudinary.com/dkucopkow/image/upload/v1762065676/Captura_de_pantalla_2025-11-01_a_la_s_11.41.09_p.m._fbymn4.png',
        'https://images.unsplash.com/photo-1568930157403-9ad464e5f075?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987',
      ],
      quote:
        'La arquitectura es la voluntad de una época traducida al espacio.',
      quoteAuthor: 'Ludwig Mies van der Rohe',
    },
    {
      title: 'DICO + SOFANNI',
      type: 'ARQUITECTURA COMERCIAL',
      location: 'GDL, JAL',
      description:
        'Un showroom contemporáneo que combina amplitud, luz y transparencia para exhibir el diseño interior como una experiencia inmersiva.',
      image:
        'https://res.cloudinary.com/dkucopkow/image/upload/v1763014528/WhatsApp_Image_2025-11-12_at_22.03.49_tmkqod.jpg',
      descriptionLong:
        'El proyecto integra dos firmas de mobiliario en un volumen comercial de doble altura que prioriza la visibilidad y el flujo interior. La fachada principal se resuelve con grandes paños de vidrio y marcos metálicos que maximizan la entrada de luz natural y generan una presencia urbana clara. En el interior, la espacialidad se organiza mediante líneas de iluminación geométrica en el plafón, recorridos amplios y áreas de exhibición que permiten una lectura coherente del mobiliario. El diseño busca crear una experiencia comercial cálida, ordenada y visualmente fluida para el visitante.',
      gallery: [
        'https://res.cloudinary.com/dkucopkow/image/upload/v1763014665/WhatsApp_Image_2025-11-12_at_22.10.49_1_mh6gc1.jpg',
        'https://res.cloudinary.com/dkucopkow/image/upload/v1763014688/WhatsApp_Image_2025-11-12_at_22.10.49_jzdljr.jpg',
        'https://res.cloudinary.com/dkucopkow/image/upload/v1763014722/WhatsApp_Image_2025-11-12_at_22.12.18_jirwsm.jpg',
      ],
      quote:
        'La simplicidad es la clave de la verdadera elegancia en la arquitectura.',
      quoteAuthor: 'Tadao Ando',
    },
  ]

  const services = [
    {
      title: 'Arquitectura a medida',
      description:
        'Proyectos residenciales y comerciales con un enfoque integral que mezcla contexto, función y estética atemporal.',
    },
    {
      title: 'Dirección de obra',
      description:
        'Gestión ejecutiva con presencia en sitio, cuidando cada detalle constructivo y la fidelidad al concepto original.',
    },
    {
      title: 'Consultoría de marca espacial',
      description:
        'Creación de experiencias arquitectónicas que amplifican el valor y la narrativa de marcas premium.',
    },
  ]

  return (
    <div className="page">
      <header className="top-bar">
        <div className="brand">
          <img
            className="brand-logo"
            src="https://res.cloudinary.com/dkucopkow/image/upload/v1762030349/Copia_de_White_and_Black_Corporate_Architecture_Presentation-removebg-preview_pptpt8.png"
            alt="Juan García Arquitectura"
          />
        </div>
        <nav className="nav-links">
          <a href="#portfolio">Proyectos</a>
          <a href="#studio">Estudio</a>
          <a href="#contact">Contacto</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-intro" data-animate="fade-right">
              <p className="hero-kicker">Estudio en San Diego · Tijuana · Guadalajara</p>
              <h1>
                Espacios que celebran la luz, la calma y la materia en su
                estado más puro.
              </h1>
              <p className="hero-copy">
                Juan García diseña proyectos icónicos para clientes que buscan una arquitectura con
                precisión técnica, narrativa poética y una estética atemporal
                inspirada en la naturaleza.
              </p>
              <div className="hero-actions">
                <a className="primary" href="#portfolio">
                  Ver portafolio
                </a>
                <a className="secondary" href="#contact">
                  Solicitar consulta
                </a>
              </div>
            </div>
            <div className="hero-visual" data-animate="fade-left">
              <div className="hero-image">
                <div className="hero-image__overlay" />
                <div className="hero-stats">
                  <p>
                    10 años creando arquitectura escultural y funcional con
                    presencia en el noroeste de México y la costa oeste de los
                    Estados Unidos.
                  </p>
                  <div className="hero-stat-row">
                    <span className="hero-stat-value">10</span>
                    <span className="hero-stat-label">años de trayectoria</span>
                  </div>
                  <div className="hero-stat-row">
                    <span className="hero-stat-value">8</span>
                    <span className="hero-stat-label">
                      reconocimientos clave
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="studio" className="studio">
          <div className="section-header" data-animate="fade-right">
            <span className="section-tag">Estudio</span>
            <h2>Un proceso curado, sensible e impecable en cada fase.</h2>
          </div>
          <div className="studio-layout">
            <div className="studio-gallery" data-animate="scale-in">
              <div
                className="studio-gallery__primary"
                style={{
                  backgroundImage:
                    "url('https://res.cloudinary.com/dkucopkow/image/upload/v1762064364/Captura_de_pantalla_2025-11-01_a_la_s_11.19.17_p.m._urxxdn.png')",
                }}
              />
              <div className="studio-gallery__stack">
                <div
                  className="studio-gallery__item"
                  style={{
                    backgroundImage:
                      "url('https://res.cloudinary.com/dkucopkow/image/upload/v1762064729/Captura_de_pantalla_2025-11-01_a_la_s_11.25.23_p.m._acfw9h.png')",
                  }}
                />
                <div
                  className="studio-gallery__item"
                  style={{
                    backgroundImage:
                      "url('https://res.cloudinary.com/dkucopkow/image/upload/v1762064654/Captura_de_pantalla_2025-11-01_a_la_s_11.24.07_p.m._szg39i.png')",
                  }}
                />
              </div>
            </div>
            <div className="studio-content" data-animate="fade-left">
              <p>
                Nuestra filosofía parte de comprender la arquitectura como un diálogo 
                sensible entre luz, materia y vida cotidiana. Creemos en los espacios 
                que respiran, que se integran con su entorno y que evolucionan con quienes los habitan.
                Cada decisión se guía por la honestidad de los materiales, la calma
                en las formas y una estética que expresa un lujo silencioso, cálido y profundamente humano.
              </p>
              <div className="studio-pillars">
                <div>
                  <span>01</span>
                  <h3>Contexto</h3>
                  <p>
                    Lectura precisa del paisaje, la luz y el clima para insertar
                    la arquitectura con respeto y carácter.
                  </p>
                </div>
                <div>
                  <span>02</span>
                  <h3>Materialidad</h3>
                  <p>
                    Selección de materiales nobles con acabados táctiles y
                    tonalidades que envejecen con dignidad.
                  </p>
                </div>
                <div>
                  <span>03</span>
                  <h3>Experiencia</h3>
                  <p>
                    Secuencias espaciales que coreografían la luz, el silencio y
                    el movimiento para generar emociones memorables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="portfolio">
          <div className="section-header" data-animate="fade-right">
            <span className="section-tag">Portafolio</span>
            <h2>Arquitectura icónica con una estética minimalista y radical.</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card" data-animate="fade-up">
                <div
                  className="project-image"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="project-meta">
                  <div>
                    <p className="project-type">{project.type}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <p className="project-location">{project.location}</p>
                </div>
                <p className="project-description">{project.description}</p>
                <button type="button" className="project-link" onClick={() => setActiveProject(project)}>
                  Ver proyecto
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="services">
          <div className="section-header" data-animate="fade-right">
            <span className="section-tag">Servicios</span>
            <h2>Una visión integral para proyectos residenciales y de marca.</h2>
          </div>
          <div className="services-layout">
            <div className="services-intro" data-animate="fade-right">
              <p>
                Dirigimos cada proyecto con la misma precisión que un atelier.
                Seleccionamos materiales, proveedores y procesos constructivos
                para asegurar una ejecución impecable desde la idea hasta la
                entrega.
              </p>
              <ul className="services-scope">
                <li>Residencias privadas de lujo</li>
                <li>Hotelería boutique y hospitality premium</li>
                <li>Espacios comerciales con narrativa de marca</li>
              </ul>
            </div>
            <div className="service-list" data-animate="stagger">
              {services.map((service, index) => (
                <div key={service.title} className="service-card">
                  <div className="service-card__header">
                    <span className="service-card__index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3>{service.title}</h3>
                  </div>
                  <p>{service.description}</p>
                  <span className="service-card__accent" aria-hidden="true" />
                </div>
              ))}
              <div className="service-card service-card--cta">
                <p>
                  Alineamos expectativas, tiempos y presupuesto con una sesión
                  estratégica inicial.
                </p>
                <a className="service-cta" href="#contact">
                  Agenda una llamada
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonial" data-animate="scale-in">
          <div className="quote-mark" aria-hidden="true">
            &ldquo;
          </div>
          <blockquote>
            Ha sido el único despacho capaz de ofrecer una visión total. Cada
            espacio que diseñan tiene una calma tangible que transforma la forma
            en que habitamos.
          </blockquote>
          <p className="quote-author">Mariana Székely · Coleccionista</p>
        </section>

        <section id="contact" className="contact">
          <div className="section-header" data-animate="fade-right">
            <span className="section-tag">Contacto</span>
            <h2>Construyamos juntos el próximo landmark.</h2>
          </div>
          <div className="contact-grid">
            <div data-animate="fade-right">
              <p>
                Soy Juan Alfonso García Serrano, arquitecto con más de 15 años de experiencia en el diseño, desarrollo y supervisión de proyectos residenciales, comerciales e institucionales en México y el extranjero. Me apasiona crear espacios que combinen funcionalidad, estética y sostenibilidad, siempre buscando soluciones prácticas e innovadoras para cada cliente.
              </p>
              <ul className="contact-info">
                <li>
                  <span>Email</span>
                  <a href="mailto:jalfonsogs@gmail.com">
                    jalfonsogs@gmail.com
                  </a>
                </li>
                <li>
                  <span>Teléfono</span>
                  <a href="tel:+523333682559">+52 333 3682559</a>
                  <a href="tel:+526245677941">+52 624 5677941</a>
                  <div className="contact-socials">
                    <a
                      className="contact-socials__link"
                      href="https://wa.me/523333682559?text=Hola,%20quiero%20explorar%20la%20posibilidad%20de%20construir%20algo%20extraordinario."
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Escríbenos por WhatsApp"
                    >
                      <img
                        className="contact-socials__icon"
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                        alt="WhatsApp"
                        loading="lazy"
                      />
                    </a>
                    <a
                      className="contact-socials__link"
                      href="https://www.instagram.com/jagarquitectosyconstruccion?igsh=MTEwaDRhMHNoODQ2ZA=="
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Visita nuestro Instagram"
                    >
                      <img
                        className="contact-socials__icon"
                        src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                        alt="Instagram"
                        loading="lazy"
                      />
                    </a>
                  </div>
                </li>
                <li>
                  <span>Estudio</span>
                  <p>
                    416 W San Ysidro Blvd STE L PMB #1942 <br />
                    San Ysidro, CA 92173 - 2450 · US
                  </p>
                </li>
              </ul>
            </div>
            <form
              id="contactForm"
              className="contact-form"
              data-animate="fade-left"
              onSubmit={handleContactSubmit}
            >
              <label>
                Nombre completo
                <input type="text" name="name" placeholder="Tu nombre" />
              </label>
              <label>
                Correo electrónico
                <input type="email" name="email" placeholder="nombre@mail.com" />
              </label>
              <label>
                Mensaje
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Cuéntanos sobre tu idea"
                />
              </label>
              <button type="submit">Enviar propuesta</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Estudio Juan García. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#studio">Manifiesto</a>
          <a href="#portfolio">Colección</a>
          <a href="#contact">Agenda</a>
        </div>
      </footer>

      {activeProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
          <div className="project-modal__backdrop" onClick={() => setActiveProject(null)} />
          <div className="project-modal__content">
            <div className="project-modal__header">
              <div>
                <span className="project-modal__type">{activeProject.type}</span>
                <h3 id="project-modal-title">{activeProject.title}</h3>
                <p className="project-modal__location">{activeProject.location}</p>
              </div>
              <button
                type="button"
                className="project-modal__close"
                onClick={() => setActiveProject(null)}
                aria-label="Cerrar proyecto"
              >
                Cerrar
              </button>
            </div>
            <p className="project-modal__description">{activeProject.descriptionLong}</p>
            <div className="project-modal__gallery">
              {activeProject.gallery.map((image, index) => (
                <div
                  key={image}
                  className="project-modal__image"
                  style={{ backgroundImage: `url(${image})` }}
                  aria-label={`${activeProject.title} imagen ${index + 1}`}
                />
              ))}
            </div>
            <blockquote className="project-modal__quote">
              “{activeProject.quote}”
              <cite>— {activeProject.quoteAuthor}</cite>
            </blockquote>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
