import React, { useState } from "react";

const DomainAutocomplete = ({ name, initialValue, domains }) => {
  const [inputValue, setInputValue] = useState(initialValue || "");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedIndex(-1);
    
    if (value.includes(".")) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [subdomain, root] = value.split(".").slice(-2);
      setSuggestions(domains.filter(domain => domain.startsWith(root)));
    } else {
      setSuggestions(domains.filter(domain => domain.startsWith(value)));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === "Escape") {
      setSuggestions([])
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      completeSelection(suggestions[selectedIndex]);
    }
  };

  const completeSelection = (suggestion) => {
    const parts = inputValue.split(".");
    const prefix = parts.slice(0, 1).join(".");

    const newValue = prefix ? `${prefix}.${suggestion}` : suggestion;

    setInputValue(newValue);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  return (
    <div className="domain-autocomplete">
      <input 
        type="text"
        name={name}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Digite um domínio personalizado"
        onBlur={() => setSuggestions([])}
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li 
              key={suggestion} 
              onClick={() => completeSelection(suggestion)}
              style={{ backgroundColor: index === selectedIndex ? "#ddd" : "transparent" }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DomainAutocomplete;
