import React, { useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Layout, FileText, Phone, CheckCircle2, ChevronRight, Loader2, Globe, Plus, Trash2, Image as ImageIcon, MapPin, Tag, Eye, Settings, Edit3, X, HelpCircle, Newspaper, Calendar, Zap, Facebook } from 'lucide-react';
import { cn } from '../lib/utils';
import { services as defaultServices } from '../servicesData';

export default function CMSPanel() {
  const { content, updateContent, loading } = useContent();
  const [activeSection, setActiveSection] = useState('home');
  const [viewMode, setViewMode] = useState<'visual' | 'form'>('visual');
  const [localContent, setLocalContent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editingField, setEditingField] = useState<{ path: (string | number)[], label: string, multiline?: boolean, isImage?: boolean } | null>(null);

  React.useEffect(() => {
    if (content && !localContent) {
      setLocalContent(JSON.parse(JSON.stringify(content)));
    }
  }, [content]);

  if (loading || !localContent) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-stone-50">
        <Loader2 className="animate-spin text-orange-500 mb-4" size={40} />
        <p className="text-stone-500 font-medium tracking-widest uppercase text-xs">Ładowanie systemu...</p>
      </div>
    );
  }

  const handleUpdate = (path: (string | number)[], value: any) => {
    const updated = { ...localContent };
    let current = updated;
    for (let i = 0; i < path.length - 1; i++) {
      if (current[path[i]] === undefined) current[path[i]] = typeof path[i+1] === 'number' ? [] : {};
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setLocalContent(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateContent(localContent);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) { alert("Błąd zapisu!"); } finally { setIsSaving(false); }
  };

  const addProject = () => {
    const newProject = { 
      id: Date.now(), 
      title: "Nowa Realizacja", 
      category: "Kategoria", 
      location: "Miasto", 
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop", 
      description: "Opis...",
      scope: ["Krok 1", "Krok 2"] 
    };
    setLocalContent({ ...localContent, projects: [...(localContent.projects || []), newProject] });
  };

  const addNews = () => {
    const newItem = { id: Date.now(), title: "Nowy artykuł", excerpt: "Krótki wstęp do artykułu...", date: new Date().toLocaleDateString('pl-PL'), image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop", category: "Nowości" };
    setLocalContent({ ...localContent, news: [...(localContent.news || []), newItem] });
  };

  const addService = () => {
    const newService = { 
       id: `usluga-${Date.now()}`, 
       title: "Nowa Usługa", 
       shortDescription: "Krótki opis...", 
       fullContent: "Pełny opis...", 
       icon: "Zap", 
       image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop",
       steps: ["Krok 1", "Krok 2"],
       features: ["Cecha 1", "Cecha 2"],
       usefulInfo: ["Informacja 1"],
       requiredDocuments: ["Dokument 1"],
       legalSafety: ["Aspekt 1"]
    };
    setLocalContent({ ...localContent, services: [...(localContent.services || []), newService] });
  };

  const sections = [
    { id: 'home', title: 'Strona Główna', icon: Globe },
    { id: 'services', title: 'Oferta (Usługi)', icon: Zap },
    { id: 'projects', title: 'Realizacje', icon: Layout },
    { id: 'news', title: 'Aktualności', icon: Newspaper },
    { id: 'contact', title: 'Kontakt', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex">
      {/* SIDEBAR */}
      <div className="w-72 bg-white border-r border-stone-200 h-screen sticky top-0 flex flex-col p-6 shadow-sm z-50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black">RM</div>
          <h1 className="font-black text-sm uppercase">Radmar CMS</h1>
        </div>
        <nav className="space-y-1 flex-1">
          {sections.map(section => (
            <button key={section.id} onClick={() => setActiveSection(section.id)} className={cn("w-full flex items-center justify-between p-4 rounded-2xl transition-all group", activeSection === section.id ? "bg-stone-900 text-white shadow-xl shadow-stone-900/10" : "hover:bg-stone-50 text-stone-500 hover:text-stone-900")}>
              <div className="flex items-center gap-3">
                <section.icon size={20} className={cn(activeSection === section.id ? "text-orange-400" : "text-stone-400 group-hover:text-stone-900")} />
                <span className="font-bold text-sm">{section.title}</span>
              </div>
              <ChevronRight size={14} className={cn("opacity-30", activeSection === section.id ? "translate-x-1 opacity-100" : "")} />
            </button>
          ))}
          <div className="mt-10 pt-10 border-t border-stone-100 space-y-4">
             <div className="bg-stone-100 p-1.5 rounded-2xl flex flex-col gap-1">
                <button onClick={() => setViewMode('visual')} className={cn("flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-all", viewMode === 'visual' ? "bg-white text-orange-600 shadow-md" : "text-stone-500")}><Eye size={16} /> Wizualny</button>
                <button onClick={() => setViewMode('form')} className={cn("flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-all", viewMode === 'form' ? "bg-white text-orange-600 shadow-md" : "text-stone-500")}><Settings size={16} /> Formularz</button>
             </div>
          </div>
        </nav>
        <button onClick={handleSave} disabled={isSaving} className={cn("w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all mt-6", success ? "bg-green-500 text-white" : "bg-orange-500 text-white hover:bg-stone-900")}>
          {isSaving ? <Loader2 className="animate-spin" size={16} /> : success ? <CheckCircle2 size={16} /> : <Save size={16} />}
          {isSaving ? "Zapis..." : success ? "Gotowe!" : "Zapisz projekt"}
        </button>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="h-20 bg-white border-b border-stone-200 px-10 flex items-center justify-between sticky top-0 z-40">
          <h2 className="text-xl font-black text-stone-900 uppercase tracking-tighter">{sections.find(s => s.id === activeSection)?.title}</h2>
          <span className="text-[9px] font-black uppercase tracking-widest bg-stone-100 px-3 py-1.5 rounded-full">Tryb {viewMode === 'visual' ? 'Wizualny' : 'Formularza'}</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {viewMode === 'visual' ? (
            <div className="p-10">
               <div className="bg-white rounded-[4rem] shadow-2xl border border-stone-200 overflow-hidden relative min-h-[1000px] max-w-6xl mx-auto ring-1 ring-stone-900/5">
                  {activeSection === 'home' && <VisualHomePreview data={localContent.home} services={localContent.services} onEdit={(path: any, label: string, ml: boolean, isImg: boolean = false) => setEditingField({ path, label, multiline: ml, isImage: isImg })} />}
                  {activeSection === 'contact' && <VisualContactPreview data={localContent.contact} onEdit={(path: any, label: string, ml: boolean, isImg: boolean = false) => setEditingField({ path, label, multiline: ml, isImage: isImg })} />}
                  {(activeSection === 'projects' || activeSection === 'news' || activeSection === 'services') && (
                    <div className="p-24 text-center">
                       <h3 className="text-2xl font-bold mb-4">Zarządzanie Listą</h3>
                       <p className="text-stone-400 mb-10 italic">Wróć do "Trybu Formularza", aby edytować listę {activeSection === 'news' ? 'wpisów' : activeSection === 'services' ? 'usług' : 'realizacji'}.</p>
                       <button onClick={() => setViewMode('form')} className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold">Otwórz Formularz</button>
                    </div>
                  )}
                  <div className="absolute inset-0 pointer-events-none border-[20px] border-stone-50/30 rounded-[4rem]" />
               </div>
            </div>
          ) : (
            <div className="p-16 max-w-4xl mx-auto space-y-16">
               {activeSection === 'home' && (
                  <div className="space-y-12">
                    <FormSection title="Hero Section">
                      <Field label="Tytuł Hero" value={localContent.home?.hero?.title} onChange={(v: any) => handleUpdate(['home', 'hero', 'title'], v)} multiline />
                      <Field label="Podtytuł" value={localContent.home?.hero?.subtitle} onChange={(v: any) => handleUpdate(['home', 'hero', 'subtitle'], v)} multiline />
                      <Field label="Przycisk CTA" value={localContent.home?.hero?.cta} onChange={(v: any) => handleUpdate(['home', 'hero', 'cta'], v)} />
                      <ImageUpload value={localContent.home?.hero?.bgImage} onChange={(url: string) => handleUpdate(['home', 'hero', 'bgImage'], url)} />
                    </FormSection>

                    <FormSection title="Sekcja z Mapką">
                      <Field label="Główny nagłówek" value={localContent.home?.mapSection?.title} onChange={(v: any) => handleUpdate(['home', 'mapSection', 'title'], v)} />
                      <Field label="Główny opis" value={localContent.home?.mapSection?.subtitle} onChange={(v: any) => handleUpdate(['home', 'mapSection', 'subtitle'], v)} multiline />
                      <ImageUpload value={localContent.home?.mapSection?.bgImage} onChange={(url: string) => handleUpdate(['home', 'mapSection', 'bgImage'], url)} />
                      <div className="grid grid-cols-2 gap-4 mt-6">
                         <div className="col-span-2 font-bold text-sm text-stone-400 mt-4 border-b pb-2">Kafelek 1 (Projektowanie)</div>
                         <Field label="Tytuł" value={localContent.home?.mapSection?.tile1?.title} onChange={(v: any) => handleUpdate(['home', 'mapSection', 'tile1', 'title'], v)} />
                         <Field label="Opis" value={localContent.home?.mapSection?.tile1?.desc} onChange={(v: any) => handleUpdate(['home', 'mapSection', 'tile1', 'desc'], v)} multiline />
                         
                         <div className="col-span-2 font-bold text-sm text-stone-400 mt-4 border-b pb-2">Kafelek 2 (Konsulting)</div>
                         <Field label="Tytuł" value={localContent.home?.mapSection?.tile2?.title} onChange={(v: any) => handleUpdate(['home', 'mapSection', 'tile2', 'title'], v)} />
                         <Field label="Opis" value={localContent.home?.mapSection?.tile2?.desc} onChange={(v: any) => handleUpdate(['home', 'mapSection', 'tile2', 'desc'], v)} multiline />

                         <div className="col-span-2 font-bold text-sm text-stone-400 mt-4 border-b pb-2">Kafelek 3 (Szkolenia)</div>
                         <Field label="Tytuł" value={localContent.home?.mapSection?.tile3?.title} onChange={(v: any) => handleUpdate(['home', 'mapSection', 'tile3', 'title'], v)} />
                         <Field label="Opis" value={localContent.home?.mapSection?.tile3?.desc} onChange={(v: any) => handleUpdate(['home', 'mapSection', 'tile3', 'desc'], v)} multiline />
                      </div>
                    </FormSection>

                    <FormSection title="Sekcja Usług (Wstęp)">
                      <Field label="Nagłówek" value={localContent.home?.servicesIntro?.title} onChange={(v: any) => handleUpdate(['home', 'servicesIntro', 'title'], v)} />
                      <Field label="Opis" value={localContent.home?.servicesIntro?.desc} onChange={(v: any) => handleUpdate(['home', 'servicesIntro', 'desc'], v)} multiline />
                    </FormSection>


                    <div className="space-y-10">
                      <div className="flex items-center justify-between"><h3 className="text-xl font-bold">FAQ (Najczęstsze pytania)</h3><button onClick={() => {
                        const newFaq = [...(localContent.home?.faq || []), { q: 'Nowe pytanie', a: 'Nowa odpowiedź' }];
                        handleUpdate(['home', 'faq'], newFaq);
                      }} className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"><Plus size={18} /> Dodaj pytanie</button></div>
                      {localContent.home?.faq?.map((faqItem: any, i: number) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm relative group">
                          <button onClick={() => {
                            const newFaq = localContent.home.faq.filter((_: any, idx: number) => idx !== i);
                            handleUpdate(['home', 'faq'], newFaq);
                          }} className="absolute -top-3 -right-3 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                          <div className="grid grid-cols-1 gap-6">
                             <Field label="Pytanie" value={faqItem.q} onChange={(v: any) => handleUpdate(['home', 'faq', i, 'q'], v)} />
                             <Field label="Odpowiedź" value={faqItem.a} onChange={(v: any) => handleUpdate(['home', 'faq', i, 'a'], v)} multiline />
                          </div>
                        </div>
                      ))}
                    </div>

                    <FormSection title="Pomarańczowy blok nad formularzem (Call to Action)">
                      <Field label="Nagłówek" value={localContent.home?.finalCta?.title} onChange={(v: any) => handleUpdate(['home', 'finalCta', 'title'], v)} />
                      <Field label="Opis" value={localContent.home?.finalCta?.desc} onChange={(v: any) => handleUpdate(['home', 'finalCta', 'desc'], v)} multiline />
                      <Field label="Punkt wypunktowany 1" value={localContent.home?.finalCta?.bullet1} onChange={(v: any) => handleUpdate(['home', 'finalCta', 'bullet1'], v)} />
                      <Field label="Punkt wypunktowany 2" value={localContent.home?.finalCta?.bullet2} onChange={(v: any) => handleUpdate(['home', 'finalCta', 'bullet2'], v)} />
                      <Field label="Punkt wypunktowany 3" value={localContent.home?.finalCta?.bullet3} onChange={(v: any) => handleUpdate(['home', 'finalCta', 'bullet3'], v)} />
                    </FormSection>
                  </div>
               )}
               {activeSection === 'services' && (
                  <div className="space-y-10">
                    <div className="flex items-center justify-between"><h3 className="text-xl font-bold">Oferta (Usługi)</h3><button onClick={addService} className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"><Plus size={18} /> Dodaj usługę</button></div>
                    {localContent.services?.map((s: any, i: number) => (
                      <div key={s.id} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm relative group">
                        <button onClick={() => setLocalContent({ ...localContent, services: localContent.services.filter((x: any) => x.id !== s.id) })} className="absolute -top-3 -right-3 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                        <div className="grid grid-cols-2 gap-6">
                           <Field label="Tytuł" value={s.title} onChange={(v: any) => handleUpdate(['services', i, 'title'], v)} />
                           <Field label="Ikona (z Lucide)" value={s.icon} onChange={(v: any) => handleUpdate(['services', i, 'icon'], v)} />
                           <ImageUpload value={s.image} onChange={(url: string) => handleUpdate(['services', i, 'image'], url)} />
                           <Field label="Identyfikator (URL)" value={s.id} onChange={(v: any) => handleUpdate(['services', i, 'id'], v)} />
                           
                           <div className="col-span-2">
                             <Field label="Krótki opis (na kafelek)" value={s.shortDescription} onChange={(v: any) => handleUpdate(['services', i, 'shortDescription'], v)} multiline />
                           </div>
                           <div className="col-span-2">
                             <Field label="Pełny opis (na podstronie)" value={s.fullContent} onChange={(v: any) => handleUpdate(['services', i, 'fullContent'], v)} multiline />
                           </div>

                           <div className="col-span-2 border-t pt-6 mt-2 border-stone-100">
                             <h4 className="font-bold mb-4">Zaawansowane Listy (1 linia = 1 punkt)</h4>
                           </div>
                           <ArrayField label="Cechy / Zalety" value={s.features} onChange={(arr: string[]) => handleUpdate(['services', i, 'features'], arr)} />
                           <ArrayField label="Kroki współpracy" value={s.steps} onChange={(arr: string[]) => handleUpdate(['services', i, 'steps'], arr)} />
                           <ArrayField label="Przydatne informacje" value={s.usefulInfo} onChange={(arr: string[]) => handleUpdate(['services', i, 'usefulInfo'], arr)} />
                           <ArrayField label="Wymagane dokumenty" value={s.requiredDocuments} onChange={(arr: string[]) => handleUpdate(['services', i, 'requiredDocuments'], arr)} />
                           <div className="col-span-2">
                              <ArrayField label="Prawo i bezpieczeństwo" value={s.legalSafety} onChange={(arr: string[]) => handleUpdate(['services', i, 'legalSafety'], arr)} />
                           </div>
                           <div className="col-span-2">
                              <Field label="Informacja o cenie" value={s.priceInfo} onChange={(v: any) => handleUpdate(['services', i, 'priceInfo'], v)} />
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
               )}

               {activeSection === 'projects' && (
                  <div className="space-y-10">
                    <div className="flex items-center justify-between"><h3 className="text-xl font-bold">Realizacje</h3><button onClick={addProject} className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"><Plus size={18} /> Dodaj</button></div>
                    {localContent.projects?.map((p: any, i: number) => (
                      <div key={p.id} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm relative group">
                        <button onClick={() => setLocalContent({ ...localContent, projects: localContent.projects.filter((x: any) => x.id !== p.id) })} className="absolute -top-3 -right-3 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                        <div className="grid grid-cols-2 gap-6">
                           <Field label="Tytuł" value={p.title} onChange={(v) => handleUpdate(['projects', i, 'title'], v)} />
                           <Field label="Kategoria" value={p.category} onChange={(v) => handleUpdate(['projects', i, 'category'], v)} />
                           <Field label="Lokalizacja" value={p.location} onChange={(v) => handleUpdate(['projects', i, 'location'], v)} />
                           <ImageUpload value={p.image} onChange={(url) => handleUpdate(['projects', i, 'image'], url)} />
                           <div className="col-span-2"><Field label="Opis" value={p.description} onChange={(v) => handleUpdate(['projects', i, 'description'], v)} multiline /></div>
                           <div className="col-span-2">
                              <ArrayField label="Zakres prac (1 linia = 1 punkt)" value={p.scope} onChange={(arr: string[]) => handleUpdate(['projects', i, 'scope'], arr)} />
                           </div>
                           <div className="col-span-2 border-t pt-6 mt-2 border-stone-100">
                              <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">Galeria z realizacji (max 10 zdjęć)</h4>
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {(p.gallery || []).map((img: string, gIdx: number) => (
                                  <div key={gIdx} className="relative group aspect-square rounded-2xl overflow-hidden border border-stone-200">
                                     <img src={img} className="w-full h-full object-cover" />
                                     <button onClick={() => {
                                        const newGallery = p.gallery.filter((_: any, idx: number) => idx !== gIdx);
                                        handleUpdate(['projects', i, 'gallery'], newGallery);
                                     }} className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"><Trash2 size={12} /></button>
                                  </div>
                                ))}
                                {(!p.gallery || p.gallery.length < 10) && (
                                   <div className="aspect-square">
                                      <ImageUpload value="" onChange={(url: string) => {
                                          if (url) {
                                            const newGallery = [...(p.gallery || []), url];
                                            handleUpdate(['projects', i, 'gallery'], newGallery);
                                          }
                                      }} />
                                   </div>
                                )}
                              </div>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
               )}

               {activeSection === 'news' && (
                  <div className="space-y-10">
                    <div className="flex items-center justify-between"><h3 className="text-xl font-bold">Aktualności</h3><button onClick={addNews} className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"><Plus size={18} /> Nowy wpis</button></div>
                    {localContent.news?.map((n: any, i: number) => (
                      <div key={n.id} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm relative group">
                        <button onClick={() => setLocalContent({ ...localContent, news: localContent.news.filter((x: any) => x.id !== n.id) })} className="absolute -top-3 -right-3 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                        <div className="grid grid-cols-2 gap-6">
                           <Field label="Tytuł" value={n.title} onChange={(v) => handleUpdate(['news', i, 'title'], v)} />
                           <Field label="Kategoria" value={n.category} onChange={(v) => handleUpdate(['news', i, 'category'], v)} />
                           <Field label="Data" value={n.date} onChange={(v) => handleUpdate(['news', i, 'date'], v)} />
                           <ImageUpload value={n.image} onChange={(url) => handleUpdate(['news', i, 'image'], url)} />
                           <div className="col-span-2"><Field label="Wstęp (Excerpt)" value={n.excerpt} onChange={(v) => handleUpdate(['news', i, 'excerpt'], v)} multiline /></div>
                        </div>
                      </div>
                    ))}
                  </div>
               )}
            </div>
          )}
        </div>
      </div>

      {/* SIDEBAR EDITOR */}
      <AnimatePresence>
        {editingField && (
          <motion.div initial={{ x: 450 }} animate={{ x: 0 }} exit={{ x: 450 }} className="fixed right-8 top-8 bottom-8 w-[400px] bg-white shadow-3xl z-[100] p-10 rounded-[3rem] border border-stone-200 flex flex-col">
            <div className="flex justify-between items-center mb-10"><div><h3 className="text-2xl font-black uppercase tracking-tighter">Edycja</h3><p className="text-[10px] text-orange-500 uppercase font-black">{editingField.label}</p></div><button onClick={() => setEditingField(null)} className="p-3 bg-stone-50 rounded-full"><X size={20} /></button></div>
            {editingField.isImage ? (
               <ImageUpload value={editingField.path.reduce((obj, key) => obj?.[key], localContent)} onChange={(url: string) => handleUpdate(editingField.path, url)} />
            ) : (
               <textarea autoFocus className="flex-1 w-full p-8 bg-stone-50 border-2 border-stone-100 rounded-[2rem] focus:border-orange-500 focus:bg-white outline-none text-lg resize-none shadow-inner" value={editingField.path.reduce((obj, key) => obj?.[key] || '', localContent)} onChange={(e) => handleUpdate(editingField.path, e.target.value)} />
            )}
            <button onClick={() => setEditingField(null)} className="mt-10 bg-stone-900 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">Zapisz i zamknij</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// HELPERS (Subcomponents)
function VisualHomePreview({ data, services, onEdit }: any) {
  const displayServices = services || defaultServices;
  return (
    <div className="w-full space-y-4 pb-20 bg-stone-50 rounded-[4rem]">
       {/* Hero */}
       <section className="relative h-[400px] flex items-center px-16 bg-white rounded-t-[4rem] overflow-hidden border-b border-stone-100">
          <img src={data?.hero?.bgImage || "/assets/hero_bg_premium.webp"} className="absolute inset-0 w-full h-full object-cover opacity-10" />
          <div className="absolute top-4 right-4 z-20">
             <EditableWrapper onEdit={() => onEdit(['home', 'hero', 'bgImage'], 'Zdjęcie w Tle (Hero)', false, true)}><div className="w-4 h-4" /></EditableWrapper>
          </div>
          <div className="relative z-10 max-w-2xl">
             <EditableWrapper onEdit={() => onEdit(['home', 'hero', 'title'], 'Tytuł Hero', true)}>
                <h1 className="text-5xl font-black mb-4 text-stone-900">{data?.hero?.title || 'Rad-mar\nBiuro Projektowe'}</h1>
             </EditableWrapper>
             <EditableWrapper onEdit={() => onEdit(['home', 'hero', 'subtitle'], 'Podtytuł', true)}>
                <p className="text-lg text-stone-500 mb-6 font-medium">{data?.hero?.subtitle || 'Eksperckie uzgodnienia PPOŻ, zaawansowane projekty PV*SOL i profesjonalne wsparcie w dotacjach.'}</p>
             </EditableWrapper>
             <EditableWrapper onEdit={() => onEdit(['home', 'hero', 'cta'], 'Przycisk CTA', false)}>
                <button className="bg-[#1877F2] text-white px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-2">
                   <Facebook size={18} />
                   {data?.hero?.cta || 'ŚLEDŹ NAS NA FACEBOOKU'}
                </button>
             </EditableWrapper>
          </div>
       </section>

       {/* Map Section */}
       <section className="relative px-16 py-12 bg-[#fff8f5] border-b border-stone-100 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-map-image opacity-70 blur-[2px]" style={data?.mapSection?.bgImage ? { backgroundImage: `url(${data.mapSection.bgImage})` } : {}} />
          <div className="absolute top-4 right-4 z-20">
             <EditableWrapper onEdit={() => onEdit(['home', 'mapSection', 'bgImage'], 'Zdjęcie Mapy (Tło)', false, true)}><div className="w-4 h-4" /></EditableWrapper>
          </div>
          <div className="absolute inset-0 z-0 service-bg-gradient" />
          
          <div className="relative z-10">
             <EditableWrapper onEdit={() => onEdit(['home', 'mapSection', 'title'], 'Nagłówek Mapy', false)}>
                <h2 className="text-3xl font-black mb-2 uppercase">{data?.mapSection?.title || 'Kompleksowe wsparcie dla branży OZE'}</h2>
             </EditableWrapper>
             <EditableWrapper onEdit={() => onEdit(['home', 'mapSection', 'subtitle'], 'Opis Mapy', true)}>
                <p className="text-stone-600 mb-10 max-w-xl font-medium">{data?.mapSection?.subtitle || 'Precyzyjne wsparcie inżynieryjne i doradcze, które przyspieszy realizację Twoich projektów fotowoltaicznych od koncepcji po przyłączenie do sieci.'}</p>
             </EditableWrapper>
             <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                   <EditableWrapper onEdit={() => onEdit(['home', 'mapSection', 'tile1', 'title'], 'Tytuł kafelka 1', false)}>
                      <h3 className="font-bold text-lg mb-2">{data?.mapSection?.tile1?.title || 'Projektowanie PV'}</h3>
                   </EditableWrapper>
                   <EditableWrapper onEdit={() => onEdit(['home', 'mapSection', 'tile1', 'desc'], 'Opis kafelka 1', true)}>
                      <p className="text-xs text-stone-500 leading-relaxed">{data?.mapSection?.tile1?.desc || 'Precyzyjne projekty architektoniczne i elektryczne dla instalacji komercyjnych i przemysłowych...'}</p>
                   </EditableWrapper>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                   <EditableWrapper onEdit={() => onEdit(['home', 'mapSection', 'tile2', 'title'], 'Tytuł kafelka 2', false)}>
                      <h3 className="font-bold text-lg mb-2">{data?.mapSection?.tile2?.title || 'Konsulting Techniczny'}</h3>
                   </EditableWrapper>
                   <EditableWrapper onEdit={() => onEdit(['home', 'mapSection', 'tile2', 'desc'], 'Opis kafelka 2', true)}>
                      <p className="text-xs text-stone-500 leading-relaxed">{data?.mapSection?.tile2?.desc || 'Eksperckie doradztwo w zakresie złożonych przepisów, studiów wykonalności...'}</p>
                   </EditableWrapper>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                   <EditableWrapper onEdit={() => onEdit(['home', 'mapSection', 'tile3', 'title'], 'Tytuł kafelka 3', false)}>
                      <h3 className="font-bold text-lg mb-2">{data?.mapSection?.tile3?.title || 'Szkolenia OZE'}</h3>
                   </EditableWrapper>
                   <EditableWrapper onEdit={() => onEdit(['home', 'mapSection', 'tile3', 'desc'], 'Opis kafelka 3', true)}>
                      <p className="text-xs text-stone-500 leading-relaxed">{data?.mapSection?.tile3?.desc || 'Specjalistyczne programy szkoleniowe zaprojektowane w celu podnoszenia kwalifikacji...'}</p>
                   </EditableWrapper>
                </div>
             </div>
          </div>
       </section>

       {/* Services Intro */}
       <section className="px-16 py-12 bg-stone-50 border-b border-stone-100">
          <EditableWrapper onEdit={() => onEdit(['home', 'servicesIntro', 'title'], 'Nagłówek Usług', false)}>
             <h2 className="text-3xl font-bold mb-4">{data?.servicesIntro?.title || 'W czym możemy Ci pomóc?'}</h2>
          </EditableWrapper>
          <EditableWrapper onEdit={() => onEdit(['home', 'servicesIntro', 'desc'], 'Opis Usług', true)}>
             <p className="text-stone-500 max-w-xl mb-10">{data?.servicesIntro?.desc || 'Skorzystaj z naszej wiedzy i doświadczenia. Wybierz usługę, aby dowiedzieć się więcej o procesie współpracy.'}</p>
          </EditableWrapper>
          
          <div className="grid grid-cols-3 gap-4">
             {displayServices.map((service: any) => (
                <div key={service.id} className="relative aspect-video rounded-2xl overflow-hidden bg-stone-200">
                   {service.image && <img src={service.image} className="w-full h-full object-cover" />}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                      <h4 className="text-white font-bold text-sm leading-tight">{service.title}</h4>
                   </div>
                </div>
             ))}
          </div>
       </section>

       {/* FAQ */}
       <section className="px-16 py-12 bg-white border-b border-stone-100">
          <h2 className="text-3xl font-bold mb-8 text-center">FAQ</h2>
          <div className="space-y-3 max-w-2xl mx-auto">
            {data?.faq?.map((f: any, i: number) => (
              <div key={i} className="p-5 border border-stone-200 rounded-2xl bg-stone-50">
                 <EditableWrapper onEdit={() => onEdit(['home', 'faq', i, 'q'], `Pytanie ${i+1}`, false)}>
                    <p className="font-bold text-sm mb-2">{f.q || 'Pytanie...'}</p>
                 </EditableWrapper>
                 <EditableWrapper onEdit={() => onEdit(['home', 'faq', i, 'a'], `Odpowiedź ${i+1}`, true)}>
                    <p className="text-xs text-stone-500">{f.a || 'Odpowiedź...'}</p>
                 </EditableWrapper>
              </div>
            ))}
            {(!data?.faq || data.faq.length === 0) && <p className="text-center text-sm text-stone-400">Brak pytań. Dodaj je w trybie formularza.</p>}
          </div>
       </section>

       {/* Final CTA */}
       <section className="px-16 py-16 bg-orange-500 text-white rounded-b-[4rem]">
          <EditableWrapper onEdit={() => onEdit(['home', 'finalCta', 'title'], 'Nagłówek CTA', false)}>
             <h2 className="text-4xl font-black mb-4">{data?.finalCta?.title || 'Gotowy na współpracę?'}</h2>
          </EditableWrapper>
          <EditableWrapper onEdit={() => onEdit(['home', 'finalCta', 'desc'], 'Opis CTA', true)}>
             <p className="text-lg opacity-90 mb-8 max-w-lg">{data?.finalCta?.desc || 'Wypełnij formularz poniżej. Oddzwonimy lub odpiszemy w ciągu 15 minut z gotową ofertą.'}</p>
          </EditableWrapper>
          <ul className="space-y-3 mb-8">
            <EditableWrapper onEdit={() => onEdit(['home', 'finalCta', 'bullet1'], 'Punkt 1', false)}><li><CheckCircle2 size={16} className="inline mr-2 opacity-50"/> {data?.finalCta?.bullet1 || 'Bezpłatna konsultacja techniczna'}</li></EditableWrapper>
            <EditableWrapper onEdit={() => onEdit(['home', 'finalCta', 'bullet2'], 'Punkt 2', false)}><li><CheckCircle2 size={16} className="inline mr-2 opacity-50"/> {data?.finalCta?.bullet2 || 'Szybki czas realizacji (już od 48h)'}</li></EditableWrapper>
            <EditableWrapper onEdit={() => onEdit(['home', 'finalCta', 'bullet3'], 'Punkt 3', false)}><li><CheckCircle2 size={16} className="inline mr-2 opacity-50"/> {data?.finalCta?.bullet3 || 'Pełna dokumentacja zgodnie z prawem'}</li></EditableWrapper>
          </ul>
       </section>
    </div>
  );
}
function VisualContactPreview({ data, onEdit }: any) { return ( <div className="p-24 bg-white flex gap-16"><div className="w-1/2 space-y-10"><h1 className="text-6xl font-black">Kontakt</h1><EditableWrapper onEdit={() => onEdit(['contact', 'phone'], 'Telefon')}><div className="text-3xl font-bold">{data.phone}</div></EditableWrapper></div></div> ); }
function EditableWrapper({ children, onEdit }: any) { return ( <div className="relative group/edit"><div className="absolute -inset-3 border-2 border-transparent group-hover/edit:border-orange-500/50 rounded-2xl transition-all" /><button onClick={onEdit} className="absolute -top-4 -right-4 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-2xl opacity-0 group-hover/edit:opacity-100 transition-all z-30"><Edit3 size={16} /></button>{children}</div> ); }
function FormSection({ title, children }: any) { return ( <div className="bg-white p-12 rounded-[3rem] border border-stone-200 space-y-10"><h3 className="text-xs font-black uppercase tracking-[0.3em] text-orange-600 bg-orange-50 px-4 py-2 rounded-full w-fit">{title}</h3><div className="space-y-8">{children}</div></div> ); }
function Field({ label, value, onChange, multiline = false }: any) { return ( <div className="flex flex-col gap-3"><label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{label}</label>{multiline ? <textarea className="w-full p-6 bg-stone-50 border border-stone-100 rounded-3xl focus:border-orange-500 focus:bg-white outline-none min-h-[120px] transition-all" value={value || ''} onChange={(e) => onChange(e.target.value)} /> : <input type="text" className="w-full p-6 bg-stone-50 border border-stone-100 rounded-3xl focus:border-orange-500 focus:bg-white outline-none transition-all" value={value || ''} onChange={(e) => onChange(e.target.value)} />}</div> ); }

function ArrayField({ label, value, onChange }: any) {
  const textValue = Array.isArray(value) ? value.join('\n') : '';
  return (
    <div className="flex flex-col gap-3">
      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">{label} <span className="bg-stone-200 text-stone-500 px-2 py-0.5 rounded-full text-[8px]">Każda linia to nowy punkt</span></label>
      <textarea 
        className="w-full p-6 bg-stone-50 border border-stone-100 rounded-3xl focus:border-orange-500 focus:bg-white outline-none min-h-[150px] transition-all text-sm leading-relaxed" 
        value={textValue} 
        onChange={(e) => onChange(e.target.value.split('\n').filter(Boolean))} 
        placeholder="Wpisz punkt i wciśnij Enter..."
      />
    </div>
  );
}

function ImageUpload({ value, onChange }: any) {
  const [uploading, setUploading] = useState(false); const ref = useRef<HTMLInputElement>(null);
  const handleFile = async (e: any) => {
    const file = e.target.files?.[0]; if (!file) return; setUploading(true); const reader = new FileReader();
    reader.onload = async () => { try { const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: `${Date.now()}-${file.name}`, data: reader.result }) }); const data = await res.json(); onChange(data.url); } catch (err) { alert("Błąd!"); } finally { setUploading(false); } };
    reader.readAsDataURL(file);
  };
  return ( <div className="space-y-2"><label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Zdjęcie</label><div onClick={() => ref.current?.click()} className="h-40 rounded-2xl bg-stone-50 border-2 border-dashed border-stone-200 overflow-hidden relative group cursor-pointer hover:border-orange-500"><img src={value} className="w-full h-full object-cover transition-opacity group-hover:opacity-40" /><div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">{uploading ? <Loader2 className="animate-spin text-orange-500" /> : <ImageIcon className="text-stone-900" />}</div><input ref={ref} type="file" className="hidden" accept="image/*" onChange={handleFile} /></div></div> );
}
