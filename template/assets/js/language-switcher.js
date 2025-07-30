// Define the LanguageSwitcher component
const LanguageSwitcher = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const timeoutRef = React.useRef(null);

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
        return urlParams.get('lang') || 'cs';
    };

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    // Cleanup timeout on unmount
    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const currentLang = getCurrentLanguage();
    const currentLanguage = languages[currentLang] || languages.cs;

    return React.createElement(
        'li',  // Changed from 'div' to 'li' to match other nav items
        {
            className: 'nav-item',  // Removed 'relative' and custom positioning
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave
        },
        [
            React.createElement(
                'a',
                {
                    href: '#',
                    className: 'page-scroll',  // Match the class of other nav links
                    onClick: (e) => {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    },
                    style: {
                        cursor: 'pointer'
                    }
                },
                // `🌐 ${currentLanguage}`
                `${currentLanguage}`
            ),
            isOpen && React.createElement(
                'div',
                {
                    className: 'language-dropdown',  // Added specific class for styling
                    style: {
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        zIndex: 1000,
                        minWidth: '150px'
                    }
                },
                React.createElement(
                    'ul',
                    {
                        className: 'sub-menu',
                        style: {
                            display: 'block',
                            background: 'white',
                            borderRadius: '5px',
                            padding: '10px 0',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                            listStyle: 'none',
                            margin: 0
                        }
                    },
                    Object.entries(languages).map(([code, label]) =>
                        React.createElement(
                            'li',
                            {
                                key: code,
                                style: {
                                    borderBottom: code === 'ru' ? 'none' : '1px solid rgba(0,0,0,0.05)'
                                }
                            },
                            React.createElement(
                                'a',
                                {
                                    href: '#',
                                    className: `nav-link ${currentLang === code ? 'active' : ''}`,
                                    style: {
                                        padding: '12px 16px',
                                        display: 'block',
                                        color: currentLang === code ? '#155bd5' : '#333',
                                        fontSize: '14px',
                                        transition: 'background-color 0.15s ease',
                                        textDecoration: 'none'
                                    },
                                    onMouseEnter: (e) => {
                                        if (currentLang !== code) {
                                            e.target.style.backgroundColor = 'rgba(0,0,0,0.05)';
                                        }
                                    },
                                    onMouseLeave: (e) => {
                                        e.target.style.backgroundColor = 'transparent';
                                    },
                                    onClick: (e) => {
                                        e.preventDefault();
                                        handleLanguageChange(code);
                                    }
                                },
                                `${label}`
                            )
                        )
                    )
                )
            )
        ]
    );
};