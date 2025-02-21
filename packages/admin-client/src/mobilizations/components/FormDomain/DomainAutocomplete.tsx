import React, { useState } from "react";

const DomainAutocomplete = ({ name, domains }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState(domains);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedIndex(-1);
    
    if (value.includes(".")) {
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
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      completeSelection(suggestions[selectedIndex]);
    }
  };

  const completeSelection = (suggestion) => {
    const parts = inputValue.split(".");
    parts[parts.length - 1] = suggestion;
    setInputValue(parts.join("."));
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  return (
    <div>
      <input 
        type="text"
        name={name}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Digite um domínio..."
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
