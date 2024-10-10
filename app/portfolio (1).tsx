'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useAnimation, AnimatePresence } from 'framer-motion'
import { SunIcon, MoonIcon, GithubIcon, LinkedinIcon, TwitterIcon, MailIcon, MessageCircleIcon, ExternalLinkIcon, MenuIcon, XIcon, ChevronLeftIcon, ChevronRightIcon, SendIcon } from 'lucide-react'

const jobTitles = ['Web Developer', 'Software Engineer', 'Frontend Specialist', 'Full Stack Developer']

const projects = [
  { 
    title: 'Project 1', 
    description: 'A brief description of Project 1', 
    images: ['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
    languages: ['JavaScript', 'React', 'Node.js'],
    demoLink: 'https://demo1.example.com',
    githubLink: 'https://github.com/example/project1'
  },
  // ... (other projects remain the same)
]

const experiences = [
  {
    title: 'Senior Web Developer',
    company: 'Tech Solutions Inc.',
    period: '2020 - Present',
    description: 'Led development of multiple web applications using React and Node.js.'
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Innovations Co.',
    period: '2018 - 2020',
    description: 'Developed and maintained full stack applications using MERN stack.'
  }
]

const tools = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Git', 'Docker']

const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'Tech University',
    year: '2018'
  },
  {
    degree: 'Full Stack Web Development Bootcamp',
    school: 'Coding Academy',
    year: '2019'
  }
]

const testimonials = [
  { name: 'Client 1', text: 'Great work! Very professional and skilled developer.', image: '/placeholder.svg?height=50&width=50' },
  // ... (other testimonials remain the same)
]

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [cursorVariant, setCursorVariant] = useState('default')
  const [cursorText, setCursorText] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentJobTitleIndex, setCurrentJobTitleIndex] = useState(0)
  const [currentJobTitle, setCurrentJobTitle] = useState('')
  const [showNav, setShowNav] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentProjectPage, setCurrentProjectPage] = useState(1)
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(1)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const headerRef = useRef(null)

  const projectsPerPage = 6
  const testimonialsPerPage = 6

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', mouseMove)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [])

  useEffect(() => {
    const typeJobTitle = async () => {
      const title = jobTitles[currentJobTitleIndex]
      for (let i = 0; i <= title.length; i++) {
        setCurrentJobTitle(title.slice(0, i))
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      for (let i = title.length; i >= 0; i--) {
        setCurrentJobTitle(title.slice(0, i))
        await new Promise(resolve => setTimeout(resolve, 50))
      }
      setCurrentJobTitleIndex((prev) => (prev + 1) % jobTitles.length)
    }

    typeJobTitle()
  }, [currentJobTitleIndex])

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerBottom = headerRef.current.getBoundingClientRect().bottom
        setShowNav(headerBottom < 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
    },
    button: {
      height: 160,
      width: 160,
      x: mousePosition.x - 80,
      y: mousePosition.y - 80,
      backgroundColor: 'white',
      mixBlendMode: 'difference',
    },
  }

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProject.images.length)
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedProject.images.length) % selectedProject.images.length)
    }
  }

  const paginateProjects = (pageNumber: number) => {
    setCurrentProjectPage(pageNumber)
  }

  const paginateTestimonials = (pageNumber: number) => {
    setCurrentTestimonialPage(pageNumber)
  }

  const indexOfLastProject = currentProjectPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject)

  const indexOfLastTestimonial = currentTestimonialPage * testimonialsPerPage
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage
  const currentTestimonials = testimonials.slice(indexOfFirstTestimonial, indexOfLastTestimonial)

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 999,
          pointerEvents: 'none',
          backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
          borderRadius: '50%',
          fontFamily: 'Consolas, monospace',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="text-white">{cursorText}</span>
      </motion.div>

      {/* Background Dots */}
      <div 
        className="fixed inset-0 pointer-events-none" 
        style={{
          backgroundImage: `
            radial-gradient(circle, ${darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'} 1px, transparent 1px),
            radial-gradient(circle, ${darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'} 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
        }}
      />

      {/* Header Section */}
      <header ref={headerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'linear-gradient(45deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 100%)',
            y: backgroundY,
          }}
        />
        <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => {
                setCursorVariant('button')
                setCursorText('Hello!')
              }}
              onMouseLeave={() => {
                setCursorVariant('default')
                setCursorText('')
              }}
            >
              Hi, I'm John Doe
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl mb-4 h-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span>{currentJobTitle}</span>
              <span className="animate-blink">|</span>
            </motion.h2>
            <motion.p
              className="text-lg mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Passionate about creating innovative web solutions with 5+ years of experience in full-stack development.
            </motion.p>
            <div className="flex justify-center md:justify-start space-x-4 mb-6">
              {['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="text-2xl"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  {skill === 'HTML' ? '🌐' : skill === 'CSS' ? '🎨' : skill === 'JavaScript' ? '📜' : skill === 'React' ? '⚛️' : '🟢'}
                </motion.span>
              ))}
            </div>
            <motion.button
              className={`${darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'} px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300 flex items-center mx-auto md:mx-0`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => {
                setCursorVariant('button')
                setCursorText('Click me!')
              }}
              onMouseLeave={() => {
                setCursorVariant('default')
                setCursorText('')
              }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Let's Talk <MessageCircleIcon className="ml-2" />
            </motion.button>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <motion.img
              src="/placeholder.svg?height=400&width=400"
              alt="John Doe"
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        {!showNav && (
          <motion.nav
            className="absolute bottom-0 left-0 right-0 flex justify-center"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex justify-center space-x-12">
              {['Work', 'Resume', 'Testimonials', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => {
                    setCursorVariant('button')
                    setCursorText(item)
                  }}
                  onMouseLeave={() => {
                    setCursorVariant('default')
                    setCursorText('')
                  }}
                  onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </header>

      {/* Floating Navigation */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <motion.button
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setNavOpen(!navOpen)}
              onMouseEnter={() => {
                setCursorVariant('button')
                setCursorText('Menu')
              }}
              onMouseLeave={() => {
                setCursorVariant('default')
                setCursorText('')
              }}
            >
              {navOpen ? <XIcon /> : <MenuIcon />}
            </motion.button>
            <AnimatePresence>
              {navOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                >
                  {['Work', 'Resume', 'Testimonials', 'Contact'].map((item) => (
                    <motion.button
                      key={item}
                      className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => {
                        setCursorVariant('button')
                        setCursorText(item)
                      }}
                      onMouseLeave={() => {
                        setCursorVariant('default')
                        setCursorText('')
                      }}
                      onClick={() => {
                        document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
                        setNavOpen(false)
                      }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* My Works Section */}
      <section id="work" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onMouseEnter={() => {
              setCursorVariant('button')
              setCursorText('My Works')
            }}
            onMouseLeave={() => {
              setCursorVariant('default')
              setCursorText('')
            }}
          >
            My Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer border-b-4 border-gray-300 dark:border-gray-600"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setSelectedProject(project)
                  setCurrentImageIndex(0)
                }}
                onMouseEnter={() => {
                  setCursorVariant('button')
                  setCursorText('View Project')
                }}
                onMouseLeave={() => {
                  setCursorVariant('default')
                  setCursorText('')
                }}
              >
                <img src={project.images[0]} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap mb-4">
                    {project.languages.map((lang) => (
                      <span key={lang} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm mr-2 mb-2">{lang}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginateProjects(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentProjectPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onMouseEnter={() => {
                  setCursorVariant('button')
                  setCursorText(`Page ${i + 1}`)
                }}
                onMouseLeave={() => {
                  setCursorVariant('default')
                  setCursorText('')
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Popup */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
              <div className="relative">
                <img
                  src={selectedProject.images[currentImageIndex]}
                  alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-96 object-cover rounded-lg mb-4"
                />
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2"
                  onClick={prevImage}
                  onMouseEnter={() => {
                    setCursorVariant('button')
                    setCursorText('Previous')
                  }}
                  onMouseLeave={() => {
                    setCursorVariant('default')
                    setCursorText('')
                  }}
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2"
                  onClick={nextImage}
                  onMouseEnter={() => {
                    setCursorVariant('button')
                    setCursorText('Next')
                  }}
                  onMouseLeave={() => {
                    setCursorVariant('default')
                    setCursorText('')
                  }}
                >
                  <ChevronRightIcon />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedProject.description}</p>
              <div className="flex flex-wrap mb-4">
                {selectedProject.languages.map((lang) => (
                  <span key={lang} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm mr-2 mb-2">{lang}</span>
                ))}
              </div>
              <div className="flex justify-between">
                <a
                  href={selectedProject.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  onMouseEnter={() => {
                    setCursorVariant('button')
                    setCursorText('View Demo')
                  }}
                  onMouseLeave={() => {
                    setCursorVariant('default')
                    setCursorText('')
                  }}
                >
                  View Demo
                </a>
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                  onMouseEnter={() => {
                    setCursorVariant('button')
                    setCursorText('GitHub Repo')
                  }}
                  onMouseLeave={() => {
                    setCursorVariant('default')
                    setCursorText('')
                  }}
                >
                  GitHub Repo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Section */}
      <section id="resume" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onMouseEnter={() => {
              setCursorVariant('button')
              setCursorText('Resume')
            }}
            onMouseLeave={() => {
              setCursorVariant('default')
              setCursorText('')
            }}
          >
            Resume
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Experience */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Experience</h3>
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  className="mb-4 relative pl-4 border-l-2 border-blue-500"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2"></div>
                  <h4 className="text-xl font-semibold">{exp.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{exp.period}</p>
                  <p className="mt-2">{exp.description}</p>
                </motion.div>
              ))}
            </div>
            {/* Tools */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Tools & Technologies</h3>
              <div className="flex flex-wrap">
                {tools.map((tool, index) => (
                  <motion.span
                    key={tool}
                    className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>
            {/* Education */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Education</h3>
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  className="mb-4 relative pl-4 border-l-2 border-green-500"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[7px] top-2"></div>
                  <h4 className="text-xl font-semibold">{edu.degree}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{edu.school}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{edu.year}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onMouseEnter={() => {
              setCursorVariant('button')
              setCursorText('Testimonials')
            }}
            onMouseLeave={() => {
              setCursorVariant('default')
              setCursorText('')
            }}
          >
            Testimonials
          </motion.h2>
          <div className="flex flex-wrap justify-center">
            {currentTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="w-full md:w-1/2 lg:w-1/3 p-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg border-b-4 border-gray-300 dark:border-gray-500">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{testimonial.text}</p>
                  <div className="flex items-center">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                    <div className="font-semibold">{testimonial.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            {Array.from({ length: Math.ceil(testimonials.length / testimonialsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginateTestimonials(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentTestimonialPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onMouseEnter={() => {
                  setCursorVariant('button')
                  setCursorText(`Page ${i + 1}`)
                }}
                onMouseLeave={() => {
                  setCursorVariant('default')
                  setCursorText('')
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h2
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                onMouseEnter={() => {
                  setCursorVariant('button')
                  setCursorText('Let\'s Talk')
                }}
                onMouseLeave={() => {
                  setCursorVariant('default')
                  setCursorText('')
                }}
              >
                Let's Talk
              </motion.h2>
              <p className="text-xl mb-4">Interested to work together? Let's talk.</p>
              <motion.a
                href="mailto:johndoe@example.com"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => {
                  setCursorVariant('button')
                  setCursorText('Email me')
                }}
                onMouseLeave={() => {
                  setCursorVariant('default')
                  setCursorText('')
                }}
              >
                <MailIcon className="mr-2" /> Email me
              </motion.a>
            </div>
            <div className="md:w-1/2">
              <form>
                <div className="flex mb-4">
                  <input type="text" placeholder="Name" className="w-1/2 mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="email" placeholder="Email" className="w-1/2 ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                  <textarea placeholder="Message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => {
                    setCursorVariant('button')
                    setCursorText('Send')
                  }}
                  onMouseLeave={() => {
                    setCursorVariant('default')
                    setCursorText('')
                  }}
                >
                  Send <SendIcon className="ml-2" size={16} />
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-6">
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onMouseEnter={() => {
              setCursorVariant('button')
              setCursorText('GitHub')
            }} onMouseLeave={() => {
              setCursorVariant('default')
              setCursorText('')
            }}><GithubIcon /></motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onMouseEnter={() => {
              setCursorVariant('button')
              setCursorText('LinkedIn')
            }} onMouseLeave={() => {
              setCursorVariant('default')
              setCursorText('')
            }}><LinkedinIcon /></motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onMouseEnter={() => {
              setCursorVariant('button')
              setCursorText('Twitter')
            }} onMouseLeave={() => {
              setCursorVariant('default')
              setCursorText('')
            }}><TwitterIcon /></motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onMouseEnter={() => {
              setCursorVariant('button')
              setCursorText('Email')
            }} onMouseLeave={() => {
              setCursorVariant('default')
              setCursorText('')
            }}><MailIcon /></motion.a>
          </div>
          <div className="text-center mt-4">
            <p>&copy; 2023 John Doe. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Dark Mode Toggle */}
      <motion.button
        className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        onClick={toggleDarkMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => {
          setCursorVariant('button')
          setCursorText('Toggle Theme')
        }}
        onMouseLeave={() => {
          setCursorVariant('default')
          setCursorText('')
        }}
      >
        {darkMode ? <SunIcon className="text-yellow-400" /> : <MoonIcon className="text-gray-800" />}
      </motion.button>
    </div>
  )
}