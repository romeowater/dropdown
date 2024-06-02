import { useState, useEffect, useRef } from 'react';
import CountryList from './CountryList';
import './Dropdown.css';

const Dropdown = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isSelectedOpen, setIsSelectedOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => setCountries(data));
    }, []);

    const handleCountrySelect = (country) => {
        setSelectedCountries(prevSelected =>
            prevSelected.includes(country) ?
                prevSelected.filter(c => c !== country) :
                [...prevSelected, country]
        );
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectedToggle = () => {
        setIsSelectedOpen(!isSelectedOpen);
    };

    const handleClearAll = () => {
        setSelectedCountries([]);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const displayedSelectedCountries = isSelectedOpen ? selectedCountries : selectedCountries.slice(0, 2);

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown-header" onClick={handleDropdownClick}>
                {selectedCountries.length === 0 ? 'Select countries' : `${selectedCountries.length} selected`}
            </div>
            {isOpen && (
                <div className="dropdown-content">
                    {selectedCountries.length > 0 && (
                        <>
                            <div className="selected-countries-header" onClick={handleSelectedToggle}>
                                Selected Countries {isSelectedOpen ? '▲' : '▼'}
                            </div>
                            <div className="selected-countries">
                                {displayedSelectedCountries.map(country => (
                                    <div key={country.cca3} className="selected-country">
                                        <img src={country.flags.svg} alt={country.name.common} className="country-flag" />
                                        {country.name.common}
                                    </div>
                                ))}
                                {!isSelectedOpen && selectedCountries.length > 2 && (
                                    <span className="more-selected">+{selectedCountries.length - 2} more</span>
                                )}
                            </div>
                        </>
                    )}
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search countries..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <CountryList
                        countries={filteredCountries}
                        selectedCountries={selectedCountries}
                        onCountrySelect={handleCountrySelect}
                    />
                    {selectedCountries.length > 0 && (
                        <div className="clear-all" onClick={handleClearAll}>
                            Clear All
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
