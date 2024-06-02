import './CountryList.css';

const CountryList = ({ countries, selectedCountries, onCountrySelect }) => {
    console.log(countries)
    return (
        <div className="country-list">
            {countries.map(country => (
                <div key={country.cca3} className="country-item" onClick={() => onCountrySelect(country)}>
                    <input
                        type="checkbox"
                        checked={selectedCountries.includes(country)}
                        readOnly
                    />
                    <img src={country.flags.svg} alt={country.name.common} className="country-flag" />
                    {country.name.common}
                </div>
            ))}
        </div>
    );
};

export default CountryList;
