"use client";

import { useState } from "react";
import CompanySelector from "@/components/dashboard/selector/CompanySelector";
import Chart from "@/components/dashboard/Chart";
import sentiments from "@/data/sentiments";

const SentimentComparisonPage = () => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  return (
    <div>
      <h1>Sentiment Comparison</h1>

      <CompanySelector
        companies={["Company A", "Company B", "Company C"]} // Replace with actual company list
        selectedCompanies={selectedCompanies}
        onChange={setSelectedCompanies}
      />

      <Chart data={sentiments} />
    </div>
  );
};

export default SentimentComparisonPage;
