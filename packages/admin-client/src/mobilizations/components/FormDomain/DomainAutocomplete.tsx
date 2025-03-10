import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";


const DomainAutocompleteStyled = styled.div`
  position: relative;
  flex: 1;

  input {
    width: 100%;
    padding: 10px 20px;
  }

  ul {
    position: absolute;
    width: 100%;
    border-top: 1px solid #c7c7c7;
    list-style-type: none;
    margin: 0;
    padding: 0;
    background-color: white;

    max-height: 200px;
    overflow: auto;
    
    li {
      padding: 10px 20px;

      &:hover, &.active {
        background-color: #c7c7c7;
      }
    }
  }
  
  .help-text {
    font-size: 14px;
  }
`


const DomainAutocomplete = ({ name, initialValue, domains, helpText }) => {
  const [inputValue, setInputValue] = useState(initialValue || "");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef(null); // Ref para a div do autocomplete

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
    let newValue = prefix ? `${prefix}.${suggestion}` : suggestion;

    if (suggestion.startsWith(inputValue)) {
      newValue = suggestion;
    }

    setInputValue(newValue);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleClickOutside = (evt) => {
    if (containerRef.current && !containerRef.current.contains(evt.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <DomainAutocompleteStyled ref={containerRef}>
      <input
        type="text"
        name={name}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Digite um domínio personalizado"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              onClick={() => completeSelection(suggestion)}
              className={`${index === selectedIndex ? "active" : ""}`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {helpText && <span className="help-text">{helpText}</span>}
    </DomainAutocompleteStyled>
  );
};

export default DomainAutocomplete;
