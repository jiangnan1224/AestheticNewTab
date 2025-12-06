import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

const SEARCH_ENGINES = {
    google: {
        name: 'Google',
        url: 'https://www.google.com/search?q=',
        icon: 'https://www.google.com/s2/favicons?domain=google.com&sz=128'
    },
    baidu: {
        name: 'Baidu',
        url: 'https://www.baidu.com/s?wd=',
        icon: 'https://www.google.com/s2/favicons?domain=baidu.com&sz=128'
    },
    bing: {
        name: 'Bing',
        url: 'https://www.bing.com/search?q=',
        icon: 'https://www.google.com/s2/favicons?domain=bing.com&sz=128'
    },
    duckduckgo: {
        name: 'DuckDuckGo',
        url: 'https://duckduckgo.com/?q=',
        icon: 'https://www.google.com/s2/favicons?domain=duckduckgo.com&sz=128'
    },
    zhihu: {
        name: 'Zhihu',
        url: 'https://www.zhihu.com/search?type=content&q=',
        icon: 'https://www.google.com/s2/favicons?domain=zhihu.com&sz=128'
    }
};

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [engine, setEngine] = useState(() => {
        return localStorage.getItem('default_search_engine') || 'google';
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            const searchUrl = SEARCH_ENGINES[engine].url + encodeURIComponent(query);
            window.location.href = searchUrl;
        }
    };

    const handleEngineSelect = (engineKey) => {
        setEngine(engineKey);
        localStorage.setItem('default_search_engine', engineKey);
        setIsDropdownOpen(false);
    };

    return (
        <form onSubmit={handleSearch} className="w-full max-w-2xl mb-4 relative z-30">
            <div className="relative group flex items-center">
                {/* Search Engine Selector */}
                <div className="absolute left-2 z-40" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <img
                            src={SEARCH_ENGINES[engine].icon}
                            alt={SEARCH_ENGINES[engine].name}
                            className="w-6 h-6 rounded-full shadow-sm"
                        />
                        <ChevronDown className="w-3 h-3 text-white/50" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 py-1 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                            {Object.entries(SEARCH_ENGINES).map(([key, data]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => handleEngineSelect(key)}
                                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-left"
                                >
                                    <img
                                        src={data.icon}
                                        alt={data.name}
                                        className="w-5 h-5 rounded-full"
                                    />
                                    <span className="flex-1 text-sm text-white font-medium">{data.name}</span>
                                    {engine === key && (
                                        <Check className="w-4 h-4 text-blue-400" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="block w-full pl-20 pr-4 py-3.5 bg-black/20 hover:bg-black/30 
                     border border-white/10 rounded-full 
                     text-white placeholder-white/70 focus:outline-none focus:bg-black/40 
                     focus:ring-2 focus:ring-white/20 focus:border-transparent backdrop-blur-xl
                     transition-all duration-300 shadow-lg text-lg"
                    placeholder={`Search ${SEARCH_ENGINES[engine].name}...`}
                />
            </div>
        </form>
    );
};

export default SearchBar;
