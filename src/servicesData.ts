export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullContent: string;
  steps?: string[];
  features?: string[];
  featuresTitle?: string;
  priceInfo?: string;
  icon: string;
  legalBasis?: string;
  usefulInfo?: string[];
  usefulInfoTitle?: string;
  requiredDocuments?: string[];
  requirementsTitle?: string;
  requirementsGroups?: {
    title: string;
    items: string[];
  }[];
  closingNote?: string;
  serviceArea?: string[];
  legalSafety?: string[];
  subtitle?: string;
  extraNote?: string;
  image?: string;
  gallery?: string[];
}

export const services: Service[] = [
  {
    id: 'uzgodnienia-ppoz',
    title: 'Uzgodnienia PPOŻ',
    shortDescription: 'Profesjonalne uzgodnienia przeciwpożarowe dla instalacji PV powyżej 6.5kW.',
    icon: 'ShieldCheck',
    fullContent: 'Zapraszamy do podjęcia współpracy z zakresu projektów i uzgodnień przeciwpożarowych instalacji fotowoltaicznych. W ramach współpracy oferujemy sporządzenie dokumentacji projektowej, uzgodnienia przeciwpożarowego oraz przygotowania zgłoszenia do PSP. Dzięki naszemu doświadczeniu oraz indywidualnemu podejściu wypracowaliśmy prosty proces postępowania uzgodnienia instalacji PV. W ramach usługi oferujemy bezpłatne konsultacje.',
    steps: [
      'Wypełnienie i wysłanie arkusza na mail: biuro.projektpv@gmail.com',
      'Weryfikacja kompletności przesłanej dokumentacji przez nasz zespół',
      'Przygotowanie kompletu dokumentów: schematu elektrycznego, projektu technicznego oraz wzoru zgłoszeniowego do PSP',
      'Wysyłka uzgodnionej dokumentacji na Twój adres e-mail wraz z instrukcją dalszego postępowania'
    ],
    features: [
      'Obowiązkowe dla każdej instalacji powyżej 6.5kW',
      'Zawiadomienie organów PSP w cenie usługi',
      'Szybki czas realizacji i bezpłatne konsultacje',
      'Pomoc na każdym etapie'
    ],
    usefulInfo: [
      'Uzgodnieniu podlegają wszystkie instalacje fotowoltaiczne o mocy powyżej 6.5kW, niezależnie od miejsca montażu modułów lub falownika.',
      'Domki jednorodzinne oraz instalacje gruntowe nie wymagają stosowania dodatkowych zabezpieczeń „przeciwpożarowych”, typu: PROJOY, SANTON itp.…',
      'Rozbudowa instalacji fotowoltaicznej np.: z 5kW na 9kW wymaga uzgodnienia przeciwpożarowego oraz aktualizacji w OSD.',
      'Zgłoszenia przyłączenia mikroinstalacji może dokonać Inwestor lub Wykonawca.',
      'Instalację PV należy oznaczyć zgodnie z normą PN-EN 60364-7-712.'
    ],
    legalBasis: 'Prawo budowlane art. 29 pkt. 4 ust. 3 lit. c: Nie wymaga decyzji o pozwoleniu na budowę oraz zgłoszenia, o którym mowa w art. 30, wykonywanie robót budowlanych polegających na: instalowaniu pomp ciepła, wolno stojących kolektorów słonecznych, urządzeń fotowoltaicznych o mocy zainstalowanej elektrycznej nie większej niż 50 kW z zastrzeżeniem, że do urządzeń fotowoltaicznych o mocy zainstalowanej elektrycznej większej niż 6,5 kW stosuje się obowiązek uzgodnienia z rzeczoznawcą do spraw zabezpieczeń przeciwpożarowych pod względem zgodności with wymaganiami ochrony przeciwpożarowej, zwany dalej „uzgodnieniem pod względem ochrony przeciwpożarowej”, projektu tych urządzeń oraz zawiadomienia organów Państwowej Straży Pożarnej, o którym mowa w art. 56 ust. 1a.',
    priceInfo: 'Konkurencyjne ceny ustalane indywidualnie.',
    image: '/assets/services/oferta/ppoz.webp'
  },
  {
    id: 'projekty-pv-sol',
    title: 'Projekty PV*SOL',
    shortDescription: 'Zaawansowane projekty i wizualizacje w PV*SOL Premium oraz SolarEdge Designer.',
    icon: 'Layout',
    fullContent: 'Specjalizujemy się w projektowaniu nowoczesnych instalacji fotowoltaicznych z wykorzystaniem profesjonalnego oprogramowania PV*SOL. Narzędzie to umożliwia tworzenie szczegółowych modeli 3D oraz przeprowadzanie zaawansowanych analiz technicznych, dzięki którym już na etapie projektowym można precyzyjnie określić parametry pracy przyszłej instalacji.\n\nW ramach realizowanych opracowań wykonujemy kompleksowe wizualizacje rozmieszczenia modułów fotowoltaicznych, analizę zacienienia oraz optymalizację konfiguracji systemu pod kątem maksymalnej produkcji energii. Każdy projekt uwzględnia indywidualne warunki lokalizacji, orientację budynku, kąt nachylenia dachu oraz rzeczywiste warunki nasłonecznienia.',
    steps: [
      'Zebranie niezbędnych informacji (arkusz udostępniamy mailowo biuro.projektpv@gmail.com)',
      'Weryfikacja danych, przygotowanie koncepcji rozłożenia modułów i zwrócenie uwagi na ewentualne straty wynikające z zacienienia',
      'Dobór optymalnych rozwiązań / konsultacje techniczne',
      'Wysyłka gotowego projektu z logo Twojej firmy !'
    ],
    gallery: [
      '/assets/services/oferta/pvsol.webp',
      '/assets/services/oferta/farmy.webp',
      '/assets/services/oferta/konstrukcja.webp',
      '/assets/services/oferta/przylaczenie.webp'
    ],
    image: '/assets/services/oferta/pvsol.webp'
  },
  {
    id: 'analiza-konstrukcyjna',
    title: 'Analiza konstrukcyjna',
    shortDescription: 'Ekspertyzy techniczne nośności dachu pod instalację PV.',
    icon: 'Construction',
    fullContent: 'Wykonujemy specjalistyczne ekspertyzy techniczne nośności konstrukcji dachowych przeznaczonych pod montaż instalacji fotowoltaicznych. Celem opracowania jest szczegółowa ocena stanu technicznego dachu oraz określenie jego zdolności do bezpiecznego przenoszenia dodatkowych obciążeń wynikających z montażu modułów fotowoltaicznych, konstrukcji wsporczych oraz oddziaływań środowiskowych, takich jak śnieg i wiatr.\n\nNa podstawie przeprowadzonych obliczeń statyczno-wytrzymałościowych analizujemy parametry konstrukcyjne obiektu, weryfikujemy nośność poszczególnych elementów oraz określamy dopuszczalne obciążenia użytkowe. Ekspertyza pozwala jednoznacznie ocenić możliwość instalacji systemu fotowoltaicznego oraz wskazać ewentualne wymagania dotyczące wzmocnienia konstrukcji.',
    image: '/assets/services/oferta/konstrukcja.webp'
  },
  {
    id: 'grant-oze',
    title: 'Grant OZE BGK',
    shortDescription: 'Kompletna dokumentacja projektowa dla uzyskania GRANTU OZE.',
    icon: 'FileText',
    fullContent: 'Oferujemy usługę przygotowania dokumentacji projektowej dla uzyskania grantu. Projekt uzgodniony jest z rzeczoznawcą ds. zabezpieczeń przeciwpożarowych – jest to jeden z wymogów programu. Poprawnie przygotowana dokumentacja jest jednym z załączników do wniosku. Dzięki naszemu doświadczeniu możesz być pewien o pozytywną decyzję.',
    usefulInfo: [
      'Grant OZE przysługuje inwestorowi realizującemu przedsięwzięcie polegające na zakupie, montażu, budowie lub modernizacji instalacji OZE.',
      'Wysokość grantu wynosi 50 proc. kosztów netto całego przedsięwzięcia.',
      'Program przeznaczony jest dla właścicieli lub zarządców budynków wielorodzinnych.',
      'Wniosek o przyznanie grantu OZE można składać w BGK do 30 czerwca 2026 r.'
    ],
    requiredDocuments: [
      'dokumentację projektową instalacji',
      'dokumenty potwierdzające umocowanie osób podpisujących wniosek do reprezentowania inwestora oraz wzór podpisów złożonych na wniosku.'
    ],
    image: '/assets/services/oferta/bgk.webp'
  },
  {
    id: 'farmy-fotowoltaiczne',
    title: 'Farmy fotowoltaiczne',
    shortDescription: 'Dokumentacja dla farm PV, magazynów energii i obiektów przemysłowych.',
    icon: 'Zap',
    fullContent: 'Oferujemy kompleksowe opracowanie dokumentacji technicznej i formalnej niezbędnej do realizacji farm fotowoltaicznych. Wspieramy inwestorów na każdym etapie procesu inwestycyjnego – od koncepcji i analiz wstępnych, poprzez przygotowanie dokumentacji projektowej, aż po uzyskanie wymaganych uzgodnień i pozwoleń.',
    featuresTitle: 'W zakres naszych usług wchodzi:',
    features: [
      'Przygotowanie koncepcji projektowych',
      'Wnioski o warunki przyłączenia do sieci elektroenergetycznej',
      'Decyzja o warunkach zabudowy',
      'Projekt budowlany',
      'Wizualizacje farm fotowoltaicznych w programie PV*SOL/CAD'
    ],
    image: '/assets/services/oferta/farmy.webp'
  },
  {
    id: 'czyste-powietrze',
    title: 'Dofinansowanie Czyste Powietrze',
    shortDescription: 'Kompleksowe wnioski o dofinansowanie na wymianę źródła ciepła i termomodernizację.',
    icon: 'Home',
    fullContent: 'Oferujemy kompleksową usługę przygotowania i złożenia wniosku do programu Czyste Powietrze. Wspomagamy firmy instalacyjne oraz osoby prywatne, które chcą pozyskać jak największe dofinansowanie. Przygotowaną dokumentację składamy w Twoim imieniu lub Twojego klienta!',
    featuresTitle: 'Wsparcie finansowe możesz otrzymać na:',
    features: [
      'Wymianę starego pieca na nowoczesne źródło ciepła',
      'Audyt energetyczny budynku',
      'Ocieplenie ścian, stropu, podłogi',
      'Wymianę okien, drzwi, bramy garażowej',
      'Instalację CO (centralne ogrzewanie) i CWU',
      'Wentylację mechaniczną z odzyskiem ciepła',
      'Mikroinstalację fotowoltaiczną'
    ],
    usefulInfo: [
      'Działamy na terenie całego kraju. Pomagamy pozyskać najbardziej atrakcyjne formy dotacji.',
      'Audyt energetyczny pozwoli Ci uzyskać informacje, jak najskuteczniej ocieplić budynek, wybrać najlepsze źródło ciepła i uzyskać maksymalną dotację, a następnie płacić niższe rachunki za ogrzewanie.'
    ],
    image: '/assets/services/oferta/czyste_powietrze.webp'
  },
  {
    id: 'moje-cieplo',
    title: 'Dofinansowanie Moje Ciepło',
    shortDescription: 'Wnioski na zakup i montaż pomp ciepła w nowych budynkach jednorodzinnych.',
    icon: 'Thermometer',
    fullContent: 'Oferujemy kompleksową usługę przygotowania i złożenia wniosku do programu Moje Ciepło. Wspomagamy firmy instalacyjne oraz osoby prywatne w pozyskaniu maksymalnego dofinansowania. Przygotowaną dokumentację składamy w Twoim imieniu do klienta!',
    featuresTitle: 'Współfinansowaniu inwestycji podlega:',
    features: [
      'zakup/montaż gruntowych pomp ciepła – pompy ciepła grunt/woda, woda/woda z osprzętem, zbiornikiem akumulacyjnym/buforowym, zbiornikiem ciepłej wody użytkowej z osprzętem;',
      'zakup/montaż pompy ciepła typu powietrze/powietrze (w systemie centralnym obsługujący cały budynek) z osprzętem;',
      'zakup/montaż pompy ciepła typu powietrze/woda z osprzętem, zbiornikiem akumulacyjnym/buforowym, zbiornikiem cwu z osprzętem.'
    ],
    usefulInfo: [
      'Program dotyczy nowych budynków mieszkalnych jednorodzinnych.',
      'W budynku nie może znajdować się źródło ciepła na paliwo stałe.',
      'Dofinansowanie dotyczy zakupu i montażu nowych pomp ciepła.',
      'Działamy na terenie całego kraju.'
    ],
    image: '/assets/services/oferta/moje_cieplo.webp'
  },
  {
    id: 'moj-prad',
    title: 'Dofinansowanie Mój Prąd 6.0',
    shortDescription: 'Wsparcie finansowe dla instalacji PV, magazynów energii i ciepła.',
    icon: 'Sun',
    fullContent: 'Już 02.09.2024 startuje szósta edycja programu Mój Prąd. Oferujemy kompleksową usługę przygotowania i złożenia dokumentacji, abyś uzyskał jak najwyższe dofinansowanie. Składamy wniosek za Ciebie!',
    featuresTitle: 'Maksymalne poziomy dofinansowania:',
    features: [
      'Instalacja PV: do 7 000 zł',
      'Magazyn energii elektrycznej: do 16 000 zł',
      'Magazyn ciepła: do 5 000 zł'
    ],
    requirementsTitle: 'Wymogi dla zgłoszeń instalacji:',
    requirementsGroups: [
      {
        title: 'Przed 1 sierpnia 2024:',
        items: [
          'Brak wymogu magazynu energii lub ciepła',
          'Instalacje o mocy od 2 kW do 10 kW',
          'Dofinansowanie: tylko PV do 6 000 zł, PV z osprzętem do 7 000 zł'
        ]
      },
      {
        title: 'Od 1 sierpnia 2024:',
        items: [
          'Obowiązkowy magazyn energii elektrycznej lub ciepła',
          'Instalacje o mocy od 2 kW do 20 kW',
          'Maksymalne dofinansowanie na instalację PV: 7 000 zł'
        ]
      }
    ],
    usefulInfo: [
      'Magazyn energii elektrycznej: do 16 000 zł dofinansowania.',
      'Magazyn ciepła: do 5 000 zł dofinansowania.',
      'Dofinansowanie nie może przekroczyć 50% kosztów kwalifikowanych inwestycji.',
      'Przykład: Dla instalacji PV 8 kW z magazynem energii (16 000 zł) i zasobnikiem CWU (5 000 zł) dotacja wyniesie 28 000 zł.',
      'Program Mój Prąd 6.0 promuje autokonsumpcję energii poprzez magazynowanie.'
    ],
    closingNote: 'Program Mój Prąd 6.0 oferuje atrakcyjne wsparcie finansowe dla inwestycji w instalacje fotowoltaiczne, dostosowane do zmieniających się wymogów technologicznych i ekologicznych. Więcej informacji znajdziesz na stronie programu Mój Prąd oraz w nadchodzących publikacjach dotyczących szczegółowych warunków naboru.',
    image: '/assets/services/oferta/moj_prad.webp'
  },
  {
    id: 'termowizja-dron',
    title: 'Termowizja z drona',
    shortDescription: 'Diagnostyka instalacji fotowoltaicznych i szczelności budynków.',
    icon: 'Plane',
    fullContent: 'Inspekcja kamerą termowizyjną wykorzystywana jest w różnych branżach. Nasza firma specjalizuje się w badaniach stanu paneli fotowoltaicznych, linii elektroenergetycznych, oceną szczelności cieplnej budynków itp. Dzięki profesjonalnemu dronowi możemy dokonać kontroli technicznej w miejscach trudno dostępnych.',
    featuresTitle: 'Badanie termowizyjne pozwala na wykrycie:',
    features: [
      'Uszkodzenia mechaniczne paneli i pęknięcia',
      'Zanieczyszczenia zalegające na panelach powodujące straty',
      'Hot-spoty – nadmiernie nagrzewające się obszary',
      'Ocena szczelności cieplnej budynków (nieszczelne okna, dach)',
      'Badanie linii elektroenergetycznych'
    ],
    serviceArea: [
      'Województwo Mazowieckie (Warszawa +/- 100km)',
      'Województwo Dolnośląskie (Wrocław +/- 100km)',
      'Województwo Wielkopolskie (Kalisz +/- 100km)',
      'Przy większych instalacjach dojazd do ustalenia indywidualnego.'
    ],
    legalSafety: [
      'Wszystkie loty z udziałem UAV (Bezzałogowych Statków Powietrznych) odbywają się z zachowaniem obowiązującego prawa, jak również najwyższych standardów bezpieczeństwa. Piloci posiadają właściwe uprawnienia, doświadczenie oraz zapewniają uzyskanie niezbędnych zgód od instytucji zarządzających przestrzenią powietrzną.',
      'W każdym przypadku to piloci podejmują decyzję o wykonaniu przelotu nad obiektem budowlanym. Biorą pod uwagę warunki meteorologiczne, możliwości techniczne sprzętu, otoczenie prawne jak też preferencje Klienta. W sytuacji zagrożenia pilot ma prawo odmówić wykonania lotu. Szanujemy prawo i dbamy o bezpieczeństwo.'
    ],
    usefulInfo: [
      'Cennik usług ustalany jest indywidualnie zależnie od zakresu oraz specyfikacji pomiarów termowizyjnych.'
    ],
    gallery: [
      '/assets/services/oferta/termowizja.webp',
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579824208460-6b6f0e5b7b95?q=80&w=1000&auto=format&fit=crop'
    ],
    image: '/assets/services/oferta/termowizja.webp'
  },
  {
    id: 'przylaczenie-pv',
    title: 'Przyłączenie fotowoltaiki',
    shortDescription: 'Przygotowanie dokumentacji zgłoszeniowej do Zakładu Energetycznego.',
    icon: 'Link',
    fullContent: 'Oferujemy kompleksową usługę przygotowania i złożenia wniosku wraz z niezbędnymi załącznikami o przyłączenie mikroinstalacji fotowoltaicznej do sieci.',
    featuresTitle: 'Podłączenie do sieci w 4 krokach:',
    steps: [
      'Prawidłowe wypełnienie wniosku',
      'Przygotowanie schematu elektrycznego',
      'Dołączenie wymaganych załączników',
      'Wysyłka do Zakładu Energetycznego'
    ],
    image: '/assets/services/oferta/przylaczenie.webp'
  },
  {
    id: 'projekt-stacja-ev',
    title: 'Projekt - Stacja ładowania',
    shortDescription: 'Projekt zasilania stacji ładowania pojazdów elektrycznych.',
    icon: 'BatteryCharging',
    fullContent: 'Oferujemy kompleksowe opracowanie projektów stacji ładowania pojazdów elektrycznych (EV), obejmujące zarówno rozwiązania dla klientów indywidualnych, jak i inwestycji komercyjnych oraz publicznych. Projektujemy nowoczesne i bezpieczne instalacje dostosowane do aktualnych wymagań technicznych, przepisów prawa oraz standardów operatorów sieci elektroenergetycznych.\n\nKażdy projekt przygotowywany jest indywidualnie, z uwzględnieniem warunków przyłączeniowych, lokalizacji oraz charakteru obiektu. Zapewniamy rozwiązania zgodne z obowiązującymi normami, gwarantujące bezpieczną i niezawodną eksploatację stacji ładowania.\n\nIstotnym elementem projektu jest spełnienie wymagań formalnych i technicznych związanych z dopuszczeniem stacji ładowania do użytkowania, w tym wytycznych Urzędu Dozoru Technicznego (UDT). W zależności od typu urządzenia i sposobu jego użytkowania, przygotowujemy dokumentację niezbędną do procesu odbioru, zgłoszeń oraz uzyskania wymaganych dopuszczeń eksploatacyjnych.',
    usefulInfo: [
      'Wykonanie punktu ładowania (odpłatnego lub nie) wymaga dokumentacji do UDT i Badania Technicznego Wstępnego.',
      'Każde urządzenie o mocy powyżej 3,7 kW świadczące usługę ładowania musi zostać odebrane przez UDT.',
      'Zadaniem UDT jest sprawdzenie zgodności dokumentacji z wymaganiami technicznymi (Rozporządzenie oraz art. 13 ustawy).'
    ],
    image: '/assets/services/oferta/stacja_ev.webp'
  },
  {
    id: 'ekspertyza-stacja-ev',
    title: 'Ekspertyza - Stacja ładowania',
    shortDescription: 'Ekspertyza określająca możliwość instalacji punktu ładowania pojazdów elektrycznych',
    icon: 'ClipboardCheck',
    fullContent: 'Oferujemy wykonywanie specjalistycznych ekspertyz technicznych stacji ładowania pojazdów elektrycznych (EV), obejmujących ocenę stanu technicznego instalacji, analizę bezpieczeństwa użytkowania oraz weryfikację zgodności z obowiązującymi normami i przepisami.\n\nW ramach opracowania przeprowadzamy szczegółową analizę układów zasilania, zabezpieczeń elektrycznych, parametrów pracy urządzeń oraz poprawności wykonania instalacji. Oceniamy również warunki przyłączeniowe, jakość wykonania połączeń, dobór elementów systemu oraz ich zgodność z dokumentacją projektową i wymaganiami producentów.\n\nIstotnym elementem ekspertyzy jest ocena bezpieczeństwa eksploatacji w kontekście wymagań Urzędu Dozoru Technicznego (UDT) oraz innych przepisów regulujących użytkowanie infrastruktury ładowania. W razie potrzeby wskazujemy nieprawidłowości, potencjalne zagrożenia oraz rekomendacje dotyczące modernizacji lub dostosowania instalacji do obowiązujących wymagań.\n\nEkspertyza dopuszczalności instalacji prywatnego punktu ładowania do 11 kW wykonywana jest przez uprawnionego projektanta instalacji elektrycznych. Na podstawie dostarczonej dokumentacji, wizji lokalnej oraz wywiadu z zarządcą budynku zostają ocenione możliwości techniczne budynku w związku z montażem prywatnego punktu ładowania.',
    image: '/assets/services/oferta/ekspertyza_ev.webp'
  },
  {
    id: 'zwiekszenie-mocy',
    title: 'Zwiększenie mocy przyłączeniowej',
    shortDescription: 'Kompleksowy proces zwiększenia mocy przyłączeniowej budynku.',
    icon: 'TrendingUp',
    fullContent: 'Oferujemy usługę zwiększenia mocy przyłączeniowej. Przygotujemy niezbędną dokumentację w celu złożenia zawiadomienia do Zakładu Energetycznego. Przeprowadzimy za Ciebie cały proces.',
    steps: [
      'Złożenie wniosku o określenie warunków przyłączenia',
      'Uzyskanie warunków przyłączenia',
      'Zawarcie umowy o przyłączenie',
      'Realizacja postanowień umowy',
      'Zawarcie lub aktualizacja umowy regulującej dostarczanie energii'
    ],
    extraNote: 'Ważne jest, aby moc zainstalowana instalacji fotowoltaicznej nie przekroczyła mocy przyłączeniowej, ponieważ wiąże się to z odrzuceniem wniosku o przyłączenie mikroinstalacji. Przed montażem instalacji fotowoltaicznej lub jej rozbudową, należy zweryfikować moc przyłączeniową budynku.\n\nZwiększenie mocy przyłączeniowej może wiązać się z modernizacją instalacji elektrycznej. Zakres prac opisany jest w wydanych przez Zakład Energetyczny „Warunkach Przyłączenia”. Na wszystkie zmiany w instalacji elektrycznej wymagany jest projekt, który powinien przygotować uprawniony projektant branży elektrycznej.',
    usefulInfoTitle: 'Ważne informacje:',
    usefulInfo: [
      'Jeżeli będziesz próbować pobierać moc większą niż moc przyłączeniowa, zadziała zabezpieczenie główne (bezpiecznik). Nie będziesz mógł wtedy korzystać z prądu do czasu wymiany lub uruchomienia tego zabezpieczenia.'
    ],
    image: '/assets/services/oferta/zwiekszenie_mocy.webp'
  }
];
