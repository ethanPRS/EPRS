"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Locale = "en" | "es";

interface I18nContextType {
  locale: Locale;
  t: (key: string) => string;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

/* ─────────────────────────── Translations ────────────────────────────── */
const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.cta": "Let's Talk",

    // Hero
    "hero.title.line1": "Grow to Help",
    "hero.title.line2": "Others Grow",
    "hero.subtitle": "Helping businesses and entrepreneurs scale through software, automation and technology.",
    "hero.cta.primary": "View Projects",
    "hero.cta.secondary": "Let's Talk",

    // About
    "about.title.line1": "Building systems that",
    "about.title.line2": "create impact.",
    "about.p1": "Growth is not a solitary journey. It is a network of shared knowledge, challenges overcome, and solutions built. At EPRS, the philosophy is simple: when we grow, we expand our capacity to help others grow.",
    "about.p2": "By engineering robust software architectures, streamlining complex processes through automation, and integrating state-of-the-art AI, we build the technological foundations that allow businesses to scale efficiently and sustainably.",

    // Services
    "services.title.line1": "Technology tailored",
    "services.title.line2": "to your goals",
    "services.subtitle": "From software to intelligent systems — built to help you grow.",
    "services.cta": "Get started",
    "service.0.title": "Software Development",
    "service.0.description": "Building custom digital platforms — from landing pages to full web applications — crafted around your specific business goals.",
    "service.0.offerings": "Landing Pages,Corporate Websites,Institutional Portals,Event Sites,Custom Web Apps",
    "service.1.title": "Process Automation",
    "service.1.description": "Eliminating repetitive work through intelligent workflows, API integrations, and automated reporting pipelines.",
    "service.1.offerings": "Form Automation,Email Workflows,Platform Integrations,Dashboards,Automatic Reports",
    "service.2.title": "AI Solutions",
    "service.2.description": "Leveraging artificial intelligence to improve efficiency, automate decisions, and unlock new capabilities for your business.",
    "service.2.offerings": "AI Chatbots,Internal Assistants,Intelligent Search,AI-Powered Automation,Content Generation",
    "service.3.title": "Event Technology",
    "service.3.description": "Creating seamless digital experiences for conferences, communities, and large-scale events — from registration to auto-generated certificates.",
    "service.3.offerings": "Event Landing Pages,Attendee Registration,Speaker Management,Digital Agenda,Auto Certificates",
    "service.4.title": "Technology Consulting",
    "service.4.description": "Helping organizations make confident, strategic technology decisions — from architecture planning to process optimization.",
    "service.4.offerings": "Software Architecture,Technology Planning,Process Optimization",

    // Projects
    "projects.title": "Projects",
    "projects.subtitle": "Growth creates impact. Impact creates more growth.",
    "project.0.tagline": "Process Scheduling Simulation Dashboard",
    "project.0.description": "An interactive dashboard for simulating and visualizing process scheduling algorithms like FCFS, CPU Cores management, and memory allocation.",
    "project.0.impact": "Educational systems operations tool",
    "project.1.tagline": "Connecting companies with causes",
    "project.1.description": "Designed and developed a platform that helps volunteers discover opportunities and organizations manage community engagement more efficiently.",
    "project.1.impact": "Community management simplified",
    "project.2.tagline": "Humanism and Values in the Age of AI",
    "project.2.description": "Created the digital platform for an international values-focused event, ensuring that technological advancement aligns with human values.",
    "project.2.impact": "Centralized event experience delivered",

    // Contact
    "contact.title.line1": "Let's Build Something",
    "contact.title.line2": "Meaningful",
    "contact.subtitle": "Ready to scale your business through technology? Let's connect and discuss your next big project.",
    "contact.name": "Name",
    "contact.name.placeholder": "John Doe",
    "contact.email": "Email",
    "contact.email.placeholder": "john@example.com",
    "contact.message": "Message",
    "contact.message.placeholder": "Tell me about your project...",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully! We'll be in touch soon.",

    // Footer tagline
    "tagline.grow": "Grow to",
    "tagline.help": "Help Others",
    "tagline.grow2": "Grow.",
  },
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.about": "Acerca",
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.cta": "Hablemos",

    // Hero
    "hero.title.line1": "Crecer para Ayudar",
    "hero.title.line2": "a Otros a Crecer",
    "hero.subtitle": "Ayudando a empresas y emprendedores a escalar a través del software, la automatización y la tecnología.",
    "hero.cta.primary": "Ver Proyectos",
    "hero.cta.secondary": "Hablemos",

    // About
    "about.title.line1": "Construyendo sistemas que",
    "about.title.line2": "generan impacto.",
    "about.p1": "El crecimiento no es un camino solitario. Es una red de conocimiento compartido, desafíos superados y soluciones construidas. En EPRS, la filosofía es simple: cuando crecemos, expandimos nuestra capacidad de ayudar a otros a crecer.",
    "about.p2": "Al diseñar arquitecturas de software robustas, optimizar procesos complejos mediante automatización e integrar inteligencia artificial de vanguardia, construimos las bases tecnológicas que permiten a las empresas escalar de manera eficiente y sostenible.",

    // Services
    "services.title.line1": "Tecnología hecha",
    "services.title.line2": "a tu medida",
    "services.subtitle": "Desde software hasta sistemas inteligentes — creados para ayudarte a crecer.",
    "services.cta": "Comenzar",
    "service.0.title": "Desarrollo de Software",
    "service.0.description": "Construyendo plataformas digitales a la medida — desde landing pages hasta aplicaciones web completas — diseñadas alrededor de tus objetivos de negocio.",
    "service.0.offerings": "Landing Pages,Sitios Corporativos,Portales Institucionales,Sitios de Eventos,Apps Web",
    "service.1.title": "Automatización de Procesos",
    "service.1.description": "Eliminando el trabajo repetitivo a través de flujos de trabajo inteligentes, integraciones de APIs y pipelines de reportes automatizados.",
    "service.1.offerings": "Automatización de Formularios,Flujos de Email,Integraciones,Dashboards,Reportes Automáticos",
    "service.2.title": "Soluciones de IA",
    "service.2.description": "Aprovechando la inteligencia artificial para mejorar la eficiencia, automatizar decisiones y desbloquear nuevas capacidades para tu negocio.",
    "service.2.offerings": "Chatbots IA,Asistentes Internos,Búsqueda Inteligente,Automatización con IA,Generación de Contenido",
    "service.3.title": "Tecnología para Eventos",
    "service.3.description": "Creando experiencias digitales perfectas para conferencias, comunidades y eventos a gran escala — desde registro hasta certificados automáticos.",
    "service.3.offerings": "Landing de Eventos,Registro de Asistentes,Gestión de Speakers,Agenda Digital,Certificados Automáticos",
    "service.4.title": "Consultoría Tecnológica",
    "service.4.description": "Ayudando a organizaciones a tomar decisiones tecnológicas estratégicas y seguras — desde planeación de arquitectura hasta optimización de procesos.",
    "service.4.offerings": "Arquitectura de Software,Planeación Tecnológica,Optimización de Procesos",

    // Projects
    "projects.title": "Proyectos",
    "projects.subtitle": "El crecimiento genera impacto. El impacto genera más crecimiento.",
    "project.0.tagline": "Dashboard de Simulación de Planificación de Procesos",
    "project.0.description": "Un dashboard interactivo para simular y visualizar algoritmos de planificación de procesos como FCFS, gestión de núcleos de CPU y asignación de memoria.",
    "project.0.impact": "Herramienta educativa de operación de sistemas",
    "project.1.tagline": "Conectando empresas con causas",
    "project.1.description": "Diseñé y desarrollé una plataforma que ayuda a voluntarios a descubrir oportunidades y a organizaciones a gestionar el compromiso comunitario de forma más eficiente.",
    "project.1.impact": "Gestión comunitaria simplificada",
    "project.2.tagline": "Humanismo y Valores en la era de la IA",
    "project.2.description": "Creé la plataforma digital para un evento internacional enfocado en valores, asegurando que el avance tecnológico esté alineado con los valores humanos.",
    "project.2.impact": "Experiencia de evento centralizada y entregada",

    // Contact
    "contact.title.line1": "Construyamos Algo",
    "contact.title.line2": "Significativo",
    "contact.subtitle": "¿Listo para escalar tu negocio a través de la tecnología? Conectemos y hablemos de tu próximo gran proyecto.",
    "contact.name": "Nombre",
    "contact.name.placeholder": "Juan Pérez",
    "contact.email": "Correo",
    "contact.email.placeholder": "juan@ejemplo.com",
    "contact.message": "Mensaje",
    "contact.message.placeholder": "Cuéntame sobre tu proyecto...",
    "contact.send": "Enviar Mensaje",
    "contact.sending": "Enviando...",
    "contact.success": "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.",

    // Footer tagline
    "tagline.grow": "Crecer para",
    "tagline.help": "Ayudar a Otros",
    "tagline.grow2": "a Crecer.",
  },
};

/* ─────────────────────────── Provider ────────────────────────────────── */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const t = useCallback(
    (key: string): string => translations[locale][key] ?? key,
    [locale]
  );

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "es" : "en"));
  }, []);

  return (
    <I18nContext.Provider value={{ locale, t, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}
