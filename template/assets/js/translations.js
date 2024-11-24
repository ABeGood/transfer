// translations.js
const translations = {
    en: {
        hero: {
            title: 'Safe & Reliable Transportation Services in Prague and Czech Republic',
            description: 'Professional transportation services for all your needs - from airport transfers to corporate events. Available 24/7, ensuring comfortable and punctual rides across Prague and beyond.'
        },
        services: {
            title: 'Our Services',
            subtitle: 'Services',
            taxi: {
                title: 'Taxi Services',
                description: 'Professional taxi service available 24/7. Comfortable vehicles and experienced drivers for safe city travels.'
            },
            corporate: {
                title: 'Corporate Transfers',
                description: 'Reliable transportation for business professionals. Executive vehicles and priority service for corporate clients.'
            },
            // Add more translations as needed
        },
        // Add more sections as needed
    },
    cs: {
        hero: {
            title: 'Bezpečné a spolehlivé přepravní služby v Praze a České republice',
            description: 'Profesionální přepravní služby pro všechny vaše potřeby - od letištních transferů po firemní akce. K dispozici 24/7, zajišťující pohodlnou a přesnou jízdu po Praze a okolí.'
        },
        services: {
            title: 'Naše služby',
            subtitle: 'Služby',
            taxi: {
                title: 'Taxi služby',
                description: 'Profesionální taxi služba dostupná 24/7. Pohodlná vozidla a zkušení řidiči pro bezpečnou městskou přepravu.'
            },
            corporate: {
                title: 'Firemní přeprava',
                description: 'Spolehlivá přeprava pro obchodní profesionály. Exekutivní vozidla a prioritní služby pro firemní klienty.'
            },
            // Add more translations as needed
        },
        // Add more sections as needed
    },
    ru: {
        hero: {
            title: 'Безопасные и надежные транспортные услуги в Праге и Чехии',
            description: 'Профессиональные транспортные услуги для всех ваших потребностей - от трансферов из аэропорта до корпоративных мероприятий. Доступно 24/7, обеспечивая комфортные и пунктуальные поездки по Праге и за её пределами.'
        },
        services: {
            title: 'Наши услуги',
            subtitle: 'Услуги',
            taxi: {
                title: 'Услуги такси',
                description: 'Профессиональное такси доступно 24/7. Комфортабельные автомобили и опытные водители для безопасных поездок по городу.'
            },
            corporate: {
                title: 'Корпоративные трансферы',
                description: 'Надежная перевозка для бизнес-профессионалов. Представительские автомобили и приоритетное обслуживание для корпоративных клиентов.'
            },
            // Add more translations as needed
        },
        // Add more sections as needed
    }
};

// Language handler function
function handleLanguage() {
    // Get language from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang') || 'en'; // Default to English if no language specified

    // Get translation for current language
    const currentTranslations = translations[lang] || translations.en;

    // Update content
    function updateContent() {
        // Update hero section
        document.querySelector('#hero-area h1').textContent = currentTranslations.hero.title;
        document.querySelector('#hero-area .header-content p').textContent = currentTranslations.hero.description;

        // Update services section
        document.querySelector('#services .section-title-five h6').textContent = currentTranslations.services.subtitle;
        document.querySelector('#services .section-title-five h2').textContent = currentTranslations.services.title;

        // Update service items
        const serviceItems = document.querySelectorAll('.single-services');
        serviceItems[0].querySelector('h4').textContent = currentTranslations.services.taxi.title;
        serviceItems[0].querySelector('p').textContent = currentTranslations.services.taxi.description;
        serviceItems[1].querySelector('h4').textContent = currentTranslations.services.corporate.title;
        serviceItems[1].querySelector('p').textContent = currentTranslations.services.corporate.description;

        // Continue updating other sections...
    }

    // Call update function when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateContent);
    } else {
        updateContent();
    }
}

// Initialize language handler
handleLanguage();