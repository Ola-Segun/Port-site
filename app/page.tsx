"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  SunIcon,
  MoonIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  MailIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  MenuIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SendIcon,
  ArrowUp
} from "lucide-react";

const developerName = "Paul Olaniyan";

const jobTitles = [
  "Web Developer",
  "Software Engineer",
  "Frontend Specialist",
  "Full Stack Developer",
];

const projects = [
  {
    title: "Invetory POS",
    description: "An Invetory POS for stores or supermarkets to track sales and Entries",
    images: [
      "/images/projects/inventory-admin-dash.png",
      "/placeholder.svg?height=400&width=600",
      "/images/projects/inventory-admin-dash.png",
    ],
    languages: ["JavaScript", "PHP"],
    demoLink: "https://demo1.example.com",
    githubLink: "https://github.com/example/project1",
  },
  {
    title: "Blogging App",
    description: "A simple blogging app with CRUD funtionalities",
    images: [
      "/images/projects/socials-admin-dash.png",
      "/placeholder.svg?height=400&width=600",
      "/images/projects/socials-admin-dash.png",
    ],
    languages: ["PHP", "Laravel", "Javascript"],
    demoLink: "https://demo2.example.com",
    githubLink: "https://github.com/example/project2",
  },
  {
    title: "Calories Tracker",
    description: "A Tracker based on user Inputs used to track calories.",
    images: [
      "/images/projects/Calories tracker1.png",
      "/images/projects/Calories tracker2.png",
      "/images/projects/Calories tracker3.png",
      "/images/projects/Calories tracker4.png",
      "/images/projects/Calories tracker tabView.png",
      "/images/projects/Calories tracker mobileView.png",
    ],
    languages: ["TypeScript", "Vue.js", "Express"],
    demoLink: "https://demo3.example.com",
    githubLink: "https://github.com/example/project3",
  },
  {
    title: "Project 4",
    description: "A brief description of Project 4",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    languages: ["React Native", "Firebase", "GraphQL"],
    demoLink: "https://demo4.example.com",
    githubLink: "https://github.com/example/project4",
  },
  {
    title: "Project 5",
    description: "A brief description of Project 5",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    languages: ["Angular", "NestJS", "MongoDB"],
    demoLink: "https://demo5.example.com",
    githubLink: "https://github.com/example/project5",
  },
  {
    title: "Project 6",
    description: "A brief description of Project 6",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    languages: ["Svelte", "Sapper", "PostgreSQL"],
    demoLink: "https://demo6.example.com",
    githubLink: "https://github.com/example/project6",
  },
  {
    title: "Project 7",
    description: "A brief description of Project 7",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    languages: ["Next.js", "Tailwind CSS", "Prisma"],
    demoLink: "https://demo7.example.com",
    githubLink: "https://github.com/example/project7",
  },
];

const experiences = [
  {
    title: "Senior Web Developer",
    company: "Tech Solutions Inc.",
    period: "2020 - Present",
    description:
      "Led development of multiple web applications using React and Node.js.",
  },
  {
    title: "Full Stack Developer",
    company: "Digital Innovations Co.",
    period: "2018 - 2020",
    description:
      "Developed and maintained full stack applications using MERN stack.",
  },
];

const tools = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Git",
  "Docker",
];

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "Tech University",
    year: "2018",
  },
  {
    degree: "Full Stack Web Development Bootcamp",
    school: "Coding Academy",
    year: "2019",
  },
];

const testimonials = [
  {
    name: "Client 1",
    text: "Great work! Very professional and skilled developer.",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Client 2",
    text: "Exceeded my expectations. Would definitely work with again.",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Client 3",
    text: "Fantastic communication and delivered on time.",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Client 4",
    text: "Impressive problem-solving skills and attention to detail.",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Client 5",
    text: "Highly recommend for any web development project.",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Client 6",
    text: "Excellent work ethic and always meets deadlines.",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Client 7",
    text: "A true professional who goes above and beyond.",
    image: "/placeholder.svg?height=50&width=50",
  },
];

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentJobTitleIndex, setCurrentJobTitleIndex] = useState(0);
  const [currentJobTitle, setCurrentJobTitle] = useState("");
  const [showNav, setShowNav] = useState(false);
  const [navOpen, setNavOpen] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProjectPage, setCurrentProjectPage] = useState(1);
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(1);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const headerRef = useRef<HTMLDivElement>(null);

  const projectsPerPage = 6;
  const testimonialsPerPage = 6;

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  useEffect(() => {
    const typeJobTitle = async () => {
      const title = jobTitles[currentJobTitleIndex];
      for (let i = 0; i <= title.length; i++) {
        setCurrentJobTitle(title.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      for (let i = title.length; i >= 0; i--) {
        setCurrentJobTitle(title.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      setCurrentJobTitleIndex((prev) => (prev + 1) % jobTitles.length);
    };

    typeJobTitle();
  }, [currentJobTitleIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      if (header) {
        const headerBottom = header.getBoundingClientRect().bottom;
        setShowNav(headerBottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      backgroundColor: "white",
      mixBlendMode: "difference",
    },
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % selectedProject.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + selectedProject.images.length) %
          selectedProject.images.length
      );
    }
  };

  const paginateProjects = (pageNumber: number) => {
    setCurrentProjectPage(pageNumber);
  };

  const paginateTestimonials = (pageNumber: number) => {
    setCurrentTestimonialPage(pageNumber);
  };

  const indexOfLastProject = currentProjectPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const indexOfLastTestimonial = currentTestimonialPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = testimonials.slice(
    indexOfFirstTestimonial,
    indexOfLastTestimonial
  );

  return (
    <div
      className={`min-h-screen w-screen overflow-x-hidden ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 999,
          pointerEvents: "none",
          backgroundColor: darkMode
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(0, 0, 0, 0.2)",
          borderRadius: "50%",
          fontFamily: "Consolas, monospace",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="text-white">{cursorText}</span>
      </motion.div>

      {/* Background Dots */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle, ${
              darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"
            } 1px, transparent 1px),
            radial-gradient(circle, ${
              darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"
            } 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      />

      {/* Header Section */}
      <header
        ref={headerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        id="about"
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 100%)",
            y: backgroundY,
          }}
        />
        <div className="relative z-10 container mx-auto px-4 flex md:flex-row flex-col-reverse items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 grid gap-3">
            <motion.h1
              className="text-4xl md:text-6xl font-bold"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => {
                setCursorVariant("button");
                setCursorText("Hello!");
              }}
              onMouseLeave={() => {
                setCursorVariant("default");
                setCursorText("");
              }}
            >
              Hi, I'm {`${developerName}`}
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl h-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span>{currentJobTitle}</span>
              <span className="animate-blink">|</span>
            </motion.h2>
            <motion.p
              className="text-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Passionate about creating innovative web solutions with 5+ years
              of experience in full-stack development.
            </motion.p>
            <div className="flex justify-center md:justify-start space-x-4">
              {["HTML", "CSS", "JavaScript", "React", "Node.js"].map(
                (skill, index) => (
                  <motion.span
                    key={skill}
                    className="text-2xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    {skill === "HTML"
                      ? "🌐"
                      : skill === "CSS"
                      ? "🎨"
                      : skill === "JavaScript"
                      ? "📜"
                      : skill === "React"
                      ? "⚛️"
                      : "🟢"}
                  </motion.span>
                )
              )}
            </div>
            <motion.button
              className={`${
                darkMode
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-900"
              } w-fit px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300 flex items-center mx-auto md:mx-0`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => {
                setCursorVariant("button");
                setCursorText("Click me!");
              }}
              onMouseLeave={() => {
                setCursorVariant("default");
                setCursorText("");
              }}
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Let's Talk <MessageCircleIcon className="ml-2" />
            </motion.button>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end mb-3">
            <motion.img
              src="/images/profile_img.jpg"
              alt="Paul Olaniyan"
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
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container w-fit mx-auto px-4 py-4 flex gap-1 md:space-x-12" style={{scale:.9}}>
              {["Work", "Resume", "Testimonials", "Contact"].map((item) => (
                <motion.button
                  key={item}
                  className={`${
                    darkMode
                      ? "bg-gray-800 text-white hover:bg-gray-700"
                      : " bg-gray-100 text-gray-800 hover:bg-gray-200"
                  } px-4 py-2 rounded-full transition duration-300`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => {
                    setCursorVariant("button");
                    setCursorText(item);
                  }}
                  onMouseLeave={() => {
                    setCursorVariant("default");
                    setCursorText("");
                  }}
                  onClick={() =>
                    document
                      .getElementById(item.toLowerCase())
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
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
            className="fixed top-7 left-5 transform -translate-x-1/2 z-50"
          >
            <motion.button
              className={`${
                darkMode ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-800"
              } p-3 rounded-full shadow-lg`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setNavOpen(!navOpen)}
              onMouseEnter={() => {
                setCursorVariant("button");
                setCursorText("Menu");
              }}
              onMouseLeave={() => {
                setCursorVariant("default");
                setCursorText("");
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
                  className={`${
                    darkMode ? "bg-white" : "bg-gray-800"
                  } absolute top-0 left-16 transform -translate-x-1/2 mt-2 rounded-lg shadow-lg md:flex`}
                >
                  {["Work", "Resume", "Testimonials", "Contact"].map((item) => (
                    <motion.button
                      key={item}
                      className={`${
                        darkMode
                          ? "text-gray-800 hover:bg-gray-300"
                          : " text-white hover:bg-gray-600"
                      } px-4 py-2 transition duration-300 w-full`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => {
                        setCursorVariant("button");
                        setCursorText(item);
                      }}
                      onMouseLeave={() => {
                        setCursorVariant("default");
                        setCursorText("");
                      }}
                      onClick={() => {
                        document
                          .getElementById(item.toLowerCase())
                          ?.scrollIntoView({ behavior: "smooth" });
                        setNavOpen(false);
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

      {/* Back to top Navigation */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-7 right-5 transform -translate-x-1/2 z-50 rounded-full shadow-lg"
          >
            <motion.button
              className={`${
                darkMode ? "bg-gray-800 text-white" : "bg-gray-400 text-gray-800"
              } p-3 rounded-full shadow-lg`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => {
                setCursorVariant("button");
                setCursorText("Menu");
              }}
              onMouseLeave={() => {
                setCursorVariant("default");
                setCursorText("");
              }}
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <ArrowUp />
            </motion.button>
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
              setCursorVariant("button");
              setCursorText("My Works");
            }}
            onMouseLeave={() => {
              setCursorVariant("default");
              setCursorText("");
            }}
          >
            My Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className={`${
                  darkMode
                    ? "bg-gray-700 border-gray-500"
                    : " bg-gray-200 border-gray-300"
                } rounded-lg overflow-hidden shadow-lg cursor-pointer border-b-4`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale:1.02 }}
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentImageIndex(0);
                }}
                onMouseEnter={() => {
                  setCursorVariant("button");
                  setCursorText("View Project");
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                  setCursorText("");
                }}
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-60 object-cover"
                />
                <div className="px-6 py-3">
                  <h3 className="text-xl font-semibold">
                    {project.title}
                  </h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    } mb-2 text-sm`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap">
                    {project.languages.map((lang) => (
                      <span
                        key={lang}
                        className={`${
                          darkMode
                            ? "bg-gray-200 text-gray-800 "
                            : "bg-gray-700 text-gray-200"
                        } px-2 py-1 rounded text-sm mr-2 mb-2`}
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            {Array.from(
              { length: Math.ceil(projects.length / projectsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginateProjects(i + 1)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentProjectPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onMouseEnter={() => {
                    setCursorVariant("button");
                    setCursorText(`Page ${i + 1}`);
                  }}
                  onMouseLeave={() => {
                    setCursorVariant("default");
                    setCursorText("");
                  }}
                >
                  {i + 1}
                </button>
              )
            )}
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
            className="fixed inset-0 bg-black bg-opacity-65 flex items-center justify-center z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-7xl w-full max-h-[90vh] overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(102, 126, 234, 0.4), rgba(118, 75, 162, 0.4))`,
                }}
                animate={{
                  background: [
                    `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(102, 126, 234, 0.4), rgba(118, 75, 162, 0.4))`,
                    `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(118, 75, 162, 0.4), rgba(102, 126, 234, 0.4))`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <div className="relative z-10">
                <div className="relative grid">
                  <img
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} screenshot ${
                      currentImageIndex + 1
                    }`}
                    className="max-h-[75vh] object-cover self-center justify-self-center w-fit"
                  />
                  <button
                    className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-colors duration-200"
                    onClick={() => setSelectedProject(null)}
                  >
                    <XIcon size={24} />
                  </button>
                  <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors duration-200"
                    onClick={prevImage}
                  >
                    <ChevronLeftIcon size={24} />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors duration-200"
                    onClick={nextImage}
                  >
                    <ChevronRightIcon size={24} />
                  </button>
                  <div className="absolute bottom-2 right-2 flex space-x-2">
                    <a
                      href={selectedProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
                    >
                      <ExternalLinkIcon size={20} />
                    </a>
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
                    >
                      <GithubIcon size={20} />
                    </a>
                  </div>
                </div>
                <div className="px-4 py-2 flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {selectedProject.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap">
                    {selectedProject.languages.map((lang) => (
                      <span
                        key={lang}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-sm mr-2 mb-2 border border-gray-500 h-fit "
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Section */}
      <section
        id="resume"
        className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} py-20`}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onMouseEnter={() => {
              setCursorVariant("button");
              setCursorText("My Works");
            }}
            onMouseLeave={() => {
              setCursorVariant("default");
              setCursorText("");
            }}
          >
            Resume
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Experience */}
            <div className={`${darkMode ? 'bg-gray-700 border-gray-500' : 'bg-gray-200 border-gray-300'} p-6 rounded-lg shadow-lg border-b-4`} style={{zIndex:1}}>
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
                  <p className="text-gray-600 dark:text-gray-400">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {exp.period}
                  </p>
                  <p className="mt-2">{exp.description}</p>
                </motion.div>
              ))}
            </div>
            {/* Tools */}
            <div className={`${darkMode ? 'bg-gray-700 border-gray-500' : 'bg-gray-200 border-gray-300'} p-6 rounded-lg shadow-lg border-b-4`} style={{zIndex:1}}>
              <h3 className="text-2xl font-semibold mb-4">
                Tools & Technologies
              </h3>
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
            <div className={`${darkMode ? 'bg-gray-700 border-gray-500' : 'bg-gray-200 border-gray-300'} p-6 rounded-lg shadow-lg border-b-4`} style={{zIndex:1}}>
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
                  <p className="text-gray-600 dark:text-gray-400">
                    {edu.school}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {edu.year}
                  </p>
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
              setCursorVariant("button");
              setCursorText("Testimonials");
            }}
            onMouseLeave={() => {
              setCursorVariant("default");
              setCursorText("");
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
                <div
                  className={`${
                    darkMode
                      ? "bg-gray-700 border-gray-500"
                      : " bg-gray-200 border-gray-300"
                  } p-6 rounded-lg shadow-lg border-b-4`}
                >
                  <p
                    className={`${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    } mb-4`}
                  >
                    {testimonial.text}
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div className="font-semibold">{testimonial.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            {Array.from(
              { length: Math.ceil(testimonials.length / testimonialsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginateTestimonials(i + 1)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentTestimonialPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onMouseEnter={() => {
                    setCursorVariant("button");
                    setCursorText(`Page ${i + 1}`);
                  }}
                  onMouseLeave={() => {
                    setCursorVariant("default");
                    setCursorText("");
                  }}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} py-20`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-1/2 mb-8 md:mb-0" style={{zIndex:1}}>
              <motion.h2
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                onMouseEnter={() => {
                  setCursorVariant("button");
                  setCursorText("Let's Talk");
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                  setCursorText("");
                }}
              >
                Let's Talk
              </motion.h2>
              <motion.p className="text-xl mb-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay:0.2 }}
                viewport={{ once: true }}
                onMouseEnter={() => {
                  setCursorVariant("button");
                  setCursorText("Let's Talk");
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                  setCursorText("");
                }}
              >
                Interested to work together? Let's talk.
              </motion.p>
              <motion.a
                href="mailto:solaniyan67@gmail.com.com"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay:0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => {
                  setCursorVariant("button");
                  setCursorText("Email me");
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                  setCursorText("");
                }}
              >
                <MailIcon className="mr-2" /> Email me
              </motion.a>
            </div>
            <div className="md:w-1/2" style={{zIndex:1}}>
              <form>
                <div 
                  className="flex mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay:0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.input
                    type="text"
                    placeholder="Name"
                    className="w-1/2 mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                  <motion.input
                    type="email"
                    placeholder="Email"
                    className="w-1/2 ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay:0.2 }}
                    viewport={{ once: true }}
                  />
                </div>
                <div className="mb-4">
                  <motion.textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay:0.6 }}
                    viewport={{ once: true }}
                  ></motion.textarea>
                </div>
                <motion.button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay:0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => {
                    setCursorVariant("button");
                    setCursorText("Send");
                  }}
                  onMouseLeave={() => {
                    setCursorVariant("default");
                    setCursorText("");
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
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onMouseEnter={() => {
                setCursorVariant("button");
                setCursorText("GitHub");
              }}
              onMouseLeave={() => {
                setCursorVariant("default");
                setCursorText("");
              }}
            >
              <GithubIcon />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onMouseEnter={() => {
                setCursorVariant("button");
                setCursorText("LinkedIn");
              }}
              onMouseLeave={() => {
                setCursorVariant("default");
                setCursorText("");
              }}
            >
              <LinkedinIcon />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onMouseEnter={() => {
                setCursorVariant("button");
                setCursorText("Twitter");
              }}
              onMouseLeave={() => {
                setCursorVariant("default");
                setCursorText("");
              }}
            >
              <TwitterIcon />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onMouseEnter={() => {
                setCursorVariant("button");
                setCursorText("Email");
              }}
              onMouseLeave={() => {
                setCursorVariant("default");
                setCursorText("");
              }}
            >
              <MailIcon />
            </motion.a>
          </div>
          <div className="text-center mt-4">
            <p>&copy; 2023 {`${developerName}`}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Dark Mode Toggle */}
      <motion.button
        className={`${
          darkMode ? "bg-gray-800" : "bg-gray-300"
        } fixed right-4 p-2 rounded-full top-7 z-10`}
        
        onClick={toggleDarkMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => {
          setCursorVariant("button");
          setCursorText("Toggle Theme");
        }}
        onMouseLeave={() => {
          setCursorVariant("default");
          setCursorText("");
        }}
      >
        {darkMode ? (
          <SunIcon className="text-yellow-400" />
        ) : (
          <MoonIcon className="text-gray-800" />
        )}
      </motion.button>
    </div>
  );
}
