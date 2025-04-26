// src/components/Sentiment/CompanySelector.tsx
import React from "react";

interface CompanySelectorProps {
  companies: string[];
  selectedCompanies: string[];
  onChange: (selected: string[]) => void;
}

const CompanySelector: React.FC<CompanySelectorProps> = ({ companies, selectedCompanies, onChange }) => {
  const handleChange = (company: string) => {
    if (selectedCompanies.includes(company)) {
      onChange(selectedCompanies.filter((item) => item !== company));
    } else {
      onChange([...selectedCompanies, company]);
    }
  };

  return (
    <div>
      <h3>Select Companies</h3>
      {companies.map((company) => (
        <label key={company}>
          <input
            type="checkbox"
            checked={selectedCompanies.includes(company)}
            onChange={() => handleChange(company)}
          />
          {company}
        </label>
      ))}
    </div>
  );
};

export default CompanySelector;
