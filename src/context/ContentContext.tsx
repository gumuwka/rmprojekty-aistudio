import React, { createContext, useContext, useState, useEffect } from 'react';


interface ContentContextType {
  content: any;
  updateContent: (newContent: any) => Promise<void>;

  loading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const defaultHomeContent = {
  hero: {
    title: "Rad-mar\nBiuro Projektowe",
    subtitle: "Projekty instalacji elektrycznych i fotowoltaicznych, ekspertyzy techniczne, opinie pożarowe oraz wsparcie w dotacjach – kompleksowe wsparcie dla firm i klientów indywidualnych",
    cta: "ŚLEDŹ NAS NA FACEBOOKU",
    bgImage: "/assets/hero_bg_premium.webp"
  },
  mapSection: {
    title: "Kompleksowe wsparcie dla branży OZE",
    subtitle: "Precyzyjne wsparcie inżynieryjne i doradcze, które przyspieszy realizację Twoich projektów fotowoltaicznych od koncepcji po przyłączenie do sieci.",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_jsKiAigiyGBENZDSU8N3LB4eEvnWP-F1iuPzuBYe2n-rIVXBWWM_ppHKGFJvE2wUbJzj34gRjzrjDfs3a0JFVtJWyxaLROI14Djvn-X3PyKpoBPII2XRAuPlHnIv-lrFA_IS_75o90dsdFw5YKWLn0IuuNUAszsKeLg5CVHNBn2ywdIHZReYxae-ZYIotKvLVEKLDhoqIhJdPUZF_yHd3BfRo1ShFg37caP1S0Vrkz7QEbR_JC4pIWHMwvyDwF1JY7_WwLM0-As",
    tile1: {
      title: "Projektowanie PV",
      desc: "Precyzyjne projekty architektoniczne i elektryczne dla instalacji komercyjnych i przemysłowych, gwarantujące maksymalne uzyski i trwałość konstrukcji."
    },
    tile2: {
      title: "Konsulting Techniczny",
      desc: "Eksperckie doradztwo w zakresie złożonych przepisów, studiów wykonalności i optymalizacji projektów energii odnawialnej."
    },
    tile3: {
      title: "Szkolenia OZE",
      desc: "Specjalistyczne programy szkoleniowe zaprojektowane w celu podnoszenia kwalifikacji zespołów instalacyjnych w branży."
    }
  },
  servicesIntro: {
    title: "W czym możemy Ci pomóc?",
    desc: "Skorzystaj z naszej wiedzy i doświadczenia. Wybierz usługę, aby dowiedzieć się więcej."
  },
  aboutIntro: {
    label: "Nasza misja",
    title: "Tworzymy fundamenty nowoczesnej energetyki",
    desc: "Radmar to zespół inżynierów i rzeczoznawców, których wspólnym celem jest profesjonalne wsparcie branży OZE. Specjalizujemy się w projektowaniu instalacji fotowoltaicznych, uzgodnieniach PPOŻ oraz doradztwie technicznym.",
    image: "/assets/about_us.png",
    badgeValue: "100%",
    badgeLabel: "Dokładności",
    expTitle: "Doświadczenie",
    expDesc: "Lata pracy przy najbardziej wymagających projektach przemysłowych.",
    qualTitle: "Jakość",
    qualDesc: "Każdy projekt przechodzi wieloetapową weryfikację techniczną."
  },
  faq: [
    { q: 'Jakie dokumenty są wymagane do uzgodnienia PPOŻ?', a: 'Standardowo potrzebujemy schematu elektrycznego oraz podstawowych danych technicznych instalacji. Szczegółowy arkusz prześlemy pocztą e-mail.' },
    { q: 'Czy projekt PV*SOL uwzględnia zacienienie?', a: 'Tak, w wersji Premium wykonujemy pełną symulację zacienienia 3D, co pozwala na precyzyjne oszacowanie uzysków rocznych.' },
    { q: 'Jak długo czeka się na ekspertyzę nośności dachu?', a: 'Standardowy czas oczekiwania to 3-5 dni roboczych od momentu dostarczenia danych o konstrukcji budynku.' },
    { q: 'Czy pomagacie w złożeniu wniosku Mój Prąd 6.0?', a: 'Oczywiście. Przygotowujemy kompletną dokumentację i składamy ją w Twoim imieniu przez portal mObywatel/GWD.' },
    { q: 'Czy działacie na terenie całej Polski?', a: 'Tak, nasze usługi projektowe i doradcze świadczymy zdalnie na terenie całego kraju. Termowizja z drona dostępna jest w wybranych województwach.' },
    { q: 'Czy uzgodnienie PPOŻ jest konieczne dla mikroinstalacji?', a: 'Zgodnie z Prawem Budowlanym, każda instalacja powyżej 6,5 kW wymaga uzgodnienia z rzeczoznawcą ds. PPOŻ i zgłoszenia do PSP.' }
  ],
  finalCta: {
    title: "Gotowy na współpracę?",
    desc: "Wypełnij formularz poniżej. Oddzwonimy lub odpiszemy w ciągu 15 minut z gotową ofertą lub propozycją współpracy.",
    bullet1: "Bezpłatna konsultacja techniczna",
    bullet2: "Szybki czas realizacji (już od 48h)",
    bullet3: "Pełna dokumentacja zgodnie z prawem"
  }
};

const defaultAboutContent = {
  title: "Liderzy\nEnergii",
  description: "RAD MAR to zespół specjalistów, dla których odnawialne źródła energii to nie tylko praca, ale misja wspierania polskiej energetyki.",
  stat1_value: "10+",
  stat1_label: "Lat doświadczenia",
  stat2_value: "1000+",
  stat2_label: "Zrealizowanych projektów",
  image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
  box1_title: "Bezpieczeństwo",
  box1_desc: "Każdy projekt przechodzi rygorystyczną weryfikację pod kątem zgodności z aktualnymi przepisami PPOŻ.",
  box2_title: "Doświadczenie",
  box2_desc: "Tysiące projektów dla największych deweloperów i firm instalacyjnych w całej Polsce.",
  box3_title: "Zaufanie",
  box3_desc: "Budujemy trwałe relacje oparte na merytorycznym wsparciu i rzetelności w dostarczaniu dokumentacji."
};

const defaultProjects = [
  {
    id: 1,
    title: "Farma PV 1MW",
    category: "Farma",
    location: "Poznań, Polska",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop",
    description: "Kompleksowy projekt farmy fotowoltaicznej wraz z przyłączem SN, uwzględniający specjalistyczne uzgodnienia i optymalizację kosztów wykonawstwa.",
    scope: [
      "Analiza techniczna i wizja lokalna",
      "Przygotowanie dokumentacji projektowej",
      "Uzgodnienia przeciwpożarowe (PPOŻ)",
      "Nadzór nad montażem instalacji"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Instalacja Przemysłowa 500kWp",
    category: "Przemysł",
    location: "Kraków, Polska",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1000&auto=format&fit=crop",
    description: "Instalacja dachowa na halach produkcyjnych. Projekt obejmował zaawansowane symulacje zacienienia w PV*SOL oraz ekspertyzę nośności dachu.",
    scope: [
      "Ekspertyza nośności dachu",
      "Symulacja zacienienia w PV*SOL 3D",
      "Projekt instalacji elektrycznej",
      "Pomoc w uzyskaniu dofinansowania"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop"
    ]
  }
];

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with default content so the page renders immediately without API round-trip
  const initialContent = {
    home: defaultHomeContent,
    about: defaultAboutContent,
    services: [],
    projects: defaultProjects,
  };

  const [content, setContent] = useState<any>(initialContent);
  const [loading, setLoading] = useState(false);

  const fetchContent = async () => {
    try {
      // Fetch local DB content (if any)
      const res = await fetch('/api/content');
      let data = await res.ok ? await res.json() : {};
      
      // Fetch services & projects from Sanity
      let sanityServices = [];
      let sanityProjects = [];
      try {
        const { sanityClient } = await import('../sanityClient');
        sanityServices = await sanityClient.fetch('*[_type == "service"]{..., "id": id.current, "image": image.asset->url, "gallery": gallery[].asset->url}');
        sanityProjects = await sanityClient.fetch('*[_type == "project"]{..., "id": id.current, "image": image.asset->url, "gallery": gallery[].asset->url}');
      } catch (err) {
        console.error("Failed to fetch from Sanity", err);
      }

      // Uzupełnienie brakujących danych domyślnymi wartościami
      if (sanityServices && sanityServices.length > 0) {
        data.services = sanityServices;
      } else if (!data.services) {
        data.services = [];
      }

      if (sanityProjects && sanityProjects.length > 0) {
        data.projects = sanityProjects;
      } else if (!data.projects || data.projects.length === 0) {
        data.projects = defaultProjects;
      }
      
      if (!data.about) {
        data.about = defaultAboutContent;
      } else {
        for (const key in defaultAboutContent) {
          if (!data.about[key]) {
            data.about[key] = (defaultAboutContent as any)[key];
          }
        }
      }
      
      if (!data.home) data.home = {};
      const sections = ['hero', 'mapSection', 'servicesIntro', 'aboutIntro', 'faq', 'finalCta'];
      for (const sec of sections) {
        if (!data.home[sec]) {
          data.home[sec] = (defaultHomeContent as any)[sec];
        } else if (typeof data.home[sec] === 'object' && !Array.isArray(data.home[sec])) {
          const defaultSec = (defaultHomeContent as any)[sec];
          for (const key in defaultSec) {
            if (!data.home[sec][key]) {
              data.home[sec][key] = defaultSec[key];
            }
          }
        }
      }
      
      setContent(data);
    } catch (err) {
      console.error("Failed to fetch content", err);
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (newContent: any) => {
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent),
      });
      if (res.ok) {
        setContent(newContent);
      }
    } catch (err) {
      console.error("Failed to save content", err);
    }
  };

  useEffect(() => {
    fetchContent(); // Przywrócono pobieranie danych z Supabase
  }, []);

  return (
    <ContentContext.Provider value={{ content, updateContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within a ContentProvider");
  return context;
};
