import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { Menu, X, Ruler, HardHat, Box, ArrowRight, MessageCircle, Mail, Phone, MapPin, CheckCircle, Layers, Eye, FileText } from 'lucide-react';
import StartProjectModal from './StartProjectModal';
import AdminPage from './AdminPage';

// ==========================================
// SHARED COMPONENTS
// ==========================================

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="bg-white shadow-sm relative z-50">
      <div className="flex items-center justify-between px-6 py-4 md:px-12">
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="oumA Design & Build"
            className="h-14 md:h-16 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-brandNavy transition">Home</Link>
          <Link to="/about" className="hover:text-brandNavy transition">About</Link>
          <Link to="/services" className="hover:text-brandNavy transition">Services</Link>
          <Link to="/portfolio" className="hover:text-brandNavy transition">Portfolio</Link>
          <Link to="/contact" className="hover:text-brandNavy transition">Contact</Link>
        </div>

        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noreferrer"
          className="hidden md:flex items-center gap-2 bg-brandNavy text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-brandNavyDark transition"
        >
          WhatsApp Helpline <MessageCircle size={16} />
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-800 p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          <Link to="/" onClick={closeMobile} className="block py-2 text-gray-700 hover:text-brandNavy font-medium">Home</Link>
          <Link to="/about" onClick={closeMobile} className="block py-2 text-gray-700 hover:text-brandNavy font-medium">About</Link>
          <Link to="/services" onClick={closeMobile} className="block py-2 text-gray-700 hover:text-brandNavy font-medium">Services</Link>
          <Link to="/portfolio" onClick={closeMobile} className="block py-2 text-gray-700 hover:text-brandNavy font-medium">Portfolio</Link>
          <Link to="/contact" onClick={closeMobile} className="block py-2 text-gray-700 hover:text-brandNavy font-medium">Contact</Link>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-brandNavy text-white px-5 py-3 rounded-full text-sm font-semibold mt-2"
          >
            WhatsApp Helpline <MessageCircle size={16} />
          </a>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-darkGrey text-gray-300 pt-12 pb-6 px-6 md:px-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div>
        <div className="mb-4">
          <div className="bg-white rounded-lg p-2 inline-block">
            <img
              src="/logo.png"
              alt="oumA Design & Build"
              className="h-16 w-auto"
            />
          </div>
        </div>
        <p className="text-sm text-gray-400">Designing and building modern homes engineered for your lifestyle.</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/about" className="hover:text-brandNavy transition">About Us</Link></li>
          <li><Link to="/services" className="hover:text-brandNavy transition">Services</Link></li>
          <li><Link to="/portfolio" className="hover:text-brandNavy transition">Portfolio</Link></li>
          <li><Link to="/contact" className="hover:text-brandNavy transition">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Services</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/services/architectural" className="hover:text-brandNavy transition">Architectural</Link></li>
          <li><Link to="/services/3d-renders" className="hover:text-brandNavy transition">3D Renders</Link></li>
          <li><Link to="/services/floor-plans" className="hover:text-brandNavy transition">2D Floor Plans</Link></li>
          <li><Link to="/services/site-supervision" className="hover:text-brandNavy transition">Site Supervision</Link></li>
          <li><Link to="/services/build-construction" className="hover:text-brandNavy transition">Build & Construction</Link></li>
          <li><Link to="/services/boqs" className="hover:text-brandNavy transition">BOQs</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Contact</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2"><Phone size={14} /> +254 711 368 594</li>
          <li className="flex items-center gap-2"><Mail size={14} /> ouma@gmail.com</li>
          <li className="flex items-center gap-2"><MapPin size={14} /> Nairobi, Kenya</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
      © 2026 oumA Design & Build. All rights reserved. • Trusted by homeowners & developers • Licensed • Insured • 10+ Years Experience
    </div>
  </footer>
);

const PageHero = ({ title, subtitle }) => (
  <div className="bg-gray-50 py-16 px-6 md:px-12 text-center border-b border-gray-200">
    <span className="inline-block px-4 py-1 text-xs font-bold tracking-wider text-brandNavy border border-brandNavy rounded-full uppercase bg-blue-50 mb-4">
      Solid • Modern • Yours
    </span>
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">{title}</h1>
    <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!project) return null;
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-gray-300 transition z-10"
      >
        <X size={32} />
      </button>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-[400px] md:h-[500px] object-cover rounded-t-2xl"
        />
        <div className="p-8">
          <span className="inline-block bg-brandNavy text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            {project.cat}
          </span>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{project.title}</h2>
          <p className="text-gray-600 text-lg mb-6">{project.desc}</p>
          <p className="text-gray-500">
            Interested in something similar? Get in touch with us to discuss your project.
          </p>
          <a
            href="https://wa.me/254711368594"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-brandNavy text-white px-6 py-3 rounded-lg font-semibold hover:bg-brandNavyDark transition mt-6"
          >
            Discuss Your Project <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

const CTA = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="bg-brandNavy py-16 px-6 md:px-12 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Dream?</h2>
        <p className="mb-8 max-w-2xl mx-auto opacity-90">Let's bring your vision to life. Get in touch with our team today for a free consultation.</p>
        <button
          onClick={() => setOpen(true)}
          className="inline-block bg-white text-brandNavy px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
        >
          Start Your Project
        </button>
      </div>
      <StartProjectModal isOpen={open} onClose={() => setOpen(false)} initialProjectType={null} />
    </>
  );
};

// ==========================================
// PAGES
// ==========================================

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [preselectedType, setPreselectedType] = useState(null);

  const openModal = (type = null) => {
    setPreselectedType(type);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 items-center px-6 py-12 md:px-12 md:py-20 bg-gray-50">
        <div className="space-y-6">
          <span className="inline-block px-4 py-1 text-xs font-bold tracking-wider text-brandNavy border border-brandNavy rounded-full uppercase bg-blue-50">
            SOLID • MODERN • YOURS
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
            Actualizing Your <br /> Build Dream
          </h1>
          <p className="text-gray-600 max-w-md text-lg">
            We design and build modern homes, renovations, and spaces engineered for your lifestyle. From concept to construction, we bring your vision to life with precision and care.
          </p>
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => openModal(null)}
              className="flex items-center gap-2 bg-brandNavy text-white px-6 py-3 rounded-lg font-semibold hover:bg-brandNavyDark transition shadow-md"
            >
              Start Your Project <ArrowRight size={18} />
            </button>
            <Link to="/portfolio" className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition">
              View Portfolio
            </Link>
          </div>
        </div>
        <div className="relative mt-8 md:mt-0">
          <img
            src="/hero.jpg"
            alt="oumA Project — Modern Bungalow"
            className="rounded-xl shadow-2xl w-full object-cover h-[300px] md:h-[600px]"
          />
        </div>
      </div>

      <div className="bg-gray-100 py-16 px-6 md:px-12">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[
            { icon: <Ruler size={36} />, title: 'Architectural', desc: 'Concept planning & detailed architectural designs', link: '/services/architectural' },
            { icon: <Box size={36} />, title: '3D Renders', desc: 'Photoreal 3D visualization & renderings', link: '/services/3d-renders' },
            { icon: <Layers size={36} />, title: '2D Floor Plans', desc: 'Detailed plans for permits, review & construction', link: '/services/floor-plans' },
            { icon: <Eye size={36} />, title: 'Site Supervision', desc: 'On-site project oversight & quality control', link: '/services/site-supervision' },
            { icon: <HardHat size={36} />, title: 'Build & Construction', desc: 'Full build from foundation to finishing', link: '/services/build-construction' },
            { icon: <FileText size={36} />, title: 'BOQs', desc: 'Bills of Quantities — accurate cost estimation & material schedules', link: '/services/boqs' },
          ].map((service, index) => (
            <div
              key={index}
              onClick={() => openModal(service.title)}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition duration-300 flex flex-col items-center text-center md:items-start md:text-left border border-gray-100 cursor-pointer"
            >
              <div className="text-brandNavy mb-4 bg-blue-50 p-3 rounded-lg">{service.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">{service.desc}</p>
              <span className="text-brandNavy text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                Start This <ArrowRight size={12} />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* The Modal */}
      <StartProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialProjectType={preselectedType}
      />
    </>
  );
};

const AboutPage = () => (
  <>
    <PageHero title="About oumA Design & Build" subtitle="10+ years of crafting modern homes and spaces engineered for real life." />
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" alt="About" className="rounded-xl shadow-lg" />
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">Founded in 2015, oumA Design & Build has grown from a small architectural studio into a full-service design and construction firm. We believe great design is not just beautiful — it's functional, sustainable, and built to last.</p>
          <p className="text-gray-600">Every project, from a cozy renovation to a luxury estate, gets the same attention to detail, transparency, and craftsmanship.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[{ n: '150+', l: 'Projects Completed' }, { n: '10+', l: 'Years Experience' }, { n: '98%', l: 'Client Satisfaction' }, { n: '25', l: 'Team Members' }].map((stat, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div className="text-4xl font-extrabold text-brandNavy mb-2">{stat.n}</div>
            <div className="text-sm text-gray-600 font-medium">{stat.l}</div>
          </div>
        ))}
      </div>
    </div>
    <CTA />
  </>
);

const ServicesPage = () => {
  const services = [
    { icon: <Ruler size={36} />, title: 'Architectural', desc: 'Concept planning & detailed architectural designs', link: '/services/architectural' },
    { icon: <Box size={36} />, title: '3D Renders', desc: 'Photoreal 3D visualization & renderings', link: '/services/3d-renders' },
    { icon: <Layers size={36} />, title: '2D Floor Plans', desc: 'Detailed plans for permits, review & construction', link: '/services/floor-plans' },
    { icon: <Eye size={36} />, title: 'Site Supervision', desc: 'On-site project oversight & quality control', link: '/services/site-supervision' },
    { icon: <HardHat size={36} />, title: 'Build & Construction', desc: 'Full build from foundation to finishing', link: '/services/build-construction' },
    { icon: <FileText size={36} />, title: 'BOQs', desc: 'Bills of Quantities — accurate cost estimation & material schedules', link: '/services/boqs' },
  ];

  return (
    <>
      <PageHero title="Our Services" subtitle="Comprehensive design and construction solutions under one roof." />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((s, i) => (
          <Link to={s.link} key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition flex gap-6 items-start border border-gray-100">
            <div className="text-brandNavy bg-blue-50 p-4 rounded-lg flex-shrink-0">{s.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{s.title}</h3>
              <p className="text-gray-600 mb-4">{s.desc}</p>
              <span className="text-brandNavy font-semibold text-sm flex items-center gap-1">Learn more <ArrowRight size={14} /></span>
            </div>
          </Link>
        ))}
      </div>
      <CTA />
    </>
  );
};

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const servicesData = {
    'architectural': {
      title: 'Architectural',
      icon: <Ruler size={36} />,
      desc: 'From concept sketches to detailed construction drawings, we design spaces that are beautiful, functional, and efficient.',
      features: ['Site analysis & concept planning', '3D architectural modeling', 'Construction documentation', 'Permit & regulatory assistance'],
    },
    '3d-renders': {
      title: '3D Renders',
      icon: <Box size={36} />,
      desc: "See your project before it's built. Our photoreal 3D visualizations bring your design to life.",
      features: ['Photoreal interior renders', 'Exterior & landscape renders', 'Virtual walkthroughs', 'Animation & flythroughs'],
    },
    'floor-plans': {
      title: '2D Floor Plans',
      icon: <Layers size={36} />,
      desc: 'Precise, code-compliant floor plans ready for permits, review boards, and construction teams.',
      features: ['Dimensioned floor plans', 'Electrical & plumbing layouts', 'Roof & foundation plans', 'Permit submission drawings'],
    },
    'site-supervision': {
      title: 'Site Supervision',
      icon: <Eye size={36} />,
      desc: 'We stay on site so your project stays on track — quality, safety, and schedule all covered.',
      features: ['Daily/weekly site visits', 'Contractor coordination', 'Quality & safety inspections', 'Progress reporting'],
    },
    'build-construction': {
      title: 'Build & Construction',
      icon: <HardHat size={36} />,
      desc: 'Full turnkey construction from foundation to finish, built by a team you can trust.',
      features: ['Full turnkey construction', 'Structural works & finishing', 'Conservation of existing structures', 'Transparent cost reporting'],
    },
    'boqs': {
      title: 'BOQs — Bills of Quantities',
      icon: <FileText size={36} />,
      desc: 'Detailed, professional cost estimation and material schedules so there are no budget surprises.',
      features: ['Material take-offs', 'Detailed cost breakdowns', 'Tender documentation', 'Quantity verification on site'],
    },
  };

  const service = servicesData[slug] || servicesData['architectural'];

  return (
    <>
      <PageHero title={service.title} subtitle={service.desc} />
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-center justify-center mb-12">
          <div className="text-brandNavy bg-blue-50 p-6 rounded-2xl">{service.icon}</div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">What's Included</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16">
          {service.features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
              <CheckCircle className="text-brandNavy flex-shrink-0" size={20} />
              <span className="text-gray-700">{f}</span>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80" alt="Service" className="rounded-xl shadow-md w-full h-64 object-cover" />
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80" alt="Service" className="rounded-xl shadow-md w-full h-64 object-cover" />
        </div>
      </div>
      <CTA />
    </>
  );
};

const PortfolioPage = () => {
  const projects = [
    { title: 'Modern Dusk Residence', cat: 'Luxury', img: '/project-1.jpg', desc: 'A signature oumA build — modern form with warm evening lighting.' },
    { title: 'Black Gate Bungalow', cat: 'Construction', img: '/project-2.jpg', desc: 'Contemporary single-storey home with detailed gate design.' },
    { title: 'Green Roof Villa', cat: 'Luxury', img: '/project-3.jpg', desc: 'Bungalow with signature green roof and lush landscape.' },
    { title: 'Evening Courtyard', cat: 'Luxury', img: '/project-4.jpg', desc: 'Warm-lit courtyard with reflective pool surroundings.' },
    { title: 'Signature Bungalow', cat: 'Construction', img: '/project-5.jpg', desc: 'Modern bungalow with @oumA signature gate.' },
    { title: 'Urban Concept Home', cat: 'Luxury', img: '/project-6.jpg', desc: 'Concept render — 3-storey modern home with balconies.' },
    { title: 'Three-Level Luxury', cat: 'Luxury', img: '/project-7.jpg', desc: 'Stone-clad multi-storey villa at dusk.' },
    { title: 'Marble Interior', cat: 'Renovation', img: '/project-8.jpg', desc: 'Black marble staircase with warm accent lighting.' },
  ];

  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const categories = ['All', 'Luxury', 'Construction', 'Renovation'];

  const filtered = filter === 'All' ? projects : projects.filter(p => p.cat === filter);

  return (
    <>
      <PageHero
        title="Our Portfolio"
        subtitle="A selection of our recent projects — from modern villas to commercial renovations."
      />

      {/* Filter buttons */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 flex flex-wrap gap-3 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${filter === cat
              ? 'bg-brandNavy text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-brandNavy hover:text-brandNavy'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map((p, i) => (
          <div
            key={i}
            onClick={() => setSelectedProject(p)}
            className="group rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition bg-white cursor-pointer"
          >
            <div className="relative overflow-hidden h-64">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <span className="absolute top-4 left-4 bg-brandNavy text-white text-xs font-bold px-3 py-1 rounded-full">
                {p.cat}
              </span>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="bg-white text-brandNavy px-6 py-3 rounded-lg font-bold flex items-center gap-2">
                  View Project <ArrowRight size={18} />
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-gray-800 text-lg mb-1">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CTA />
    </>
  );
};

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSent(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      alert("Backend not running. Please start the server.");
    }
  };

  return (
    <>
      <PageHero title="Get in Touch" subtitle="Have a project in mind? Let's talk. We respond within 24 hours." />
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-gray-700"><Phone className="text-brandNavy" size={20} /> +254 711 368 594</div>
            <div className="flex items-center gap-3 text-gray-700"><Mail className="text-brandNavy" size={20} /> ouma@gmail.com</div>
            <div className="flex items-center gap-3 text-gray-700"><MapPin className="text-brandNavy" size={20} /> Nairobi, Kenya</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-2">Office Hours</h4>
            <p className="text-gray-600 text-sm">Monday – Friday: 9:00 AM – 6:00 PM</p>
            <p className="text-gray-600 text-sm">Saturday: 10:00 AM – 2:00 PM</p>
            <p className="text-gray-600 text-sm">Sunday: Closed</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          {sent ? (
            <div className="text-center py-12">
              <CheckCircle className="text-brandNavy mx-auto mb-4" size={56} />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
              <p className="text-gray-600">We've received your message and will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Send Us a Message</h3>
              <input required type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brandNavy" />
              <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brandNavy" />
              <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brandNavy" />
              <textarea required rows="5" placeholder="Tell us about your project..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brandNavy"></textarea>
              <button type="submit" className="w-full bg-brandNavy text-white py-3 rounded-lg font-bold hover:bg-brandNavyDark transition">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

// ==========================================
// MAIN APP WITH ROUTING
// ==========================================


const AppLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen font-sans flex flex-col">
      {!isAdmin && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}