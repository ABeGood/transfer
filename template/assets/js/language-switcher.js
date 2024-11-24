// Define the LanguageSwitcher component
const LanguageSwitcher = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const languages = {
        en: 'English',
        cs: 'Česky',
        ru: 'Русский'
    };

    const handleLanguageChange = (langCode) => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('lang', langCode);
        window.location.href = currentUrl.toString();
    };

    // Get current language from URL
    const getCurrentLanguage = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lang') || 'en';
    };

    const currentLang = getCurrentLanguage();
    const currentLanguage = languages[currentLang] || languages.en;

    return React.createElement(
        'div',
        {
            className: 'nav-item relative',
            onMouseEnter: () => setIsOpen(true),
            onMouseLeave: () => setIsOpen(false)
        },
        [
            React.createElement(
                'a',
                {
                    href: '#',
                    className: 'nav-link page-scroll',
                    onClick: (e) => {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }
                },
                `🌐 ${currentLanguage}`
            ),
            isOpen && React.createElement(
                'ul',
                {
                    className: 'sub-menu',
                    style: {
                        display: 'block',
                        position: 'absolute',
                        background: 'white',
                        borderRadius: '5px',
                        padding: '10px 0',
                        minWidth: '150px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        zIndex: 1000
                    }
                },
                Object.entries(languages).map(([code, label]) =>
                    React.createElement(
                        'li',
                        { key: code },
                        React.createElement(
                            'a',
                            {
                                href: '#',
                                className: `nav-link ${currentLang === code ? 'active' : ''}`,
                                style: {
                                    padding: '8px 16px',
                                    display: 'block',
                                    color: currentLang === code ? '#155bd5' : '#333',
                                    fontSize: '14px'
                                },
                                onClick: (e) => {
                                    e.preventDefault();
                                    handleLanguageChange(code);
                                }
                            },
                            `${code === 'en' ? '🇬🇧' : code === 'cs' ? '🇨🇿' : '🇷🇺'} ${label}`
                        )
                    )
                )
            )
        ]
    );
};