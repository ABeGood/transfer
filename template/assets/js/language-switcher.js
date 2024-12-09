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
        }, 300); // Small delay to prevent accidental closing
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
        'div',
        {
            className: 'nav-item relative',
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            style: {
                padding: '0 8px'  // Add padding to increase hit area
            }
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
                    },
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        padding: '11px 16px',  // Increased padding for better hit area
                        cursor: 'pointer'
                    }
                },
                `🌐 ${currentLanguage}`
            ),
            isOpen && React.createElement(
                'div',
                {
                    style: {
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        paddingTop: '2px',  // Add gap between trigger and dropdown
                        zIndex: 1000
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
                            minWidth: '150px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                            minHeight: 'fit-content',
                        }
                    },
                    Object.entries(languages).map(([code, label]) =>
                        React.createElement(
                            'li',
                            {
                                key: code,
                                style: {
                                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                                }
                            },
                            React.createElement(
                                'a',
                                {
                                    href: '#',
                                    className: `nav-link ${currentLang === code ? 'active' : ''}`,
                                    style: {
                                        padding: '12px 16px',  // Increased padding for better hit area
                                        display: 'block',
                                        color: currentLang === code ? '#155bd5' : '#333',
                                        fontSize: '14px',
                                        transition: 'background-color 0.15s ease',
                                        ':hover': {
                                            backgroundColor: 'rgba(0,0,0,0.05)'
                                        }
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
            )
        ]
    );
};