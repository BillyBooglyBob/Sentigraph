"use client";

import { useState, useEffect, use } from "react";
import Chart from "@/components/dashboard/Chart";
import sentiments from "@/data/sentiments";
import CompaniesSelector from "@/components/dashboard/selector/CompanySelector";
import BackButton from "@/components/BackButton";

interface CompanyComparisonPageProps {
  params: Promise<{ id: string }>;
}

/* TODO: Deal with the caching, so when companies changed, 
already gotten companies don't need to be retrieved again. */
const CompanyComparisonPage = ({ params }: CompanyComparisonPageProps) => {
  // Get data for the current user by looking up the ID in the URL
  const { id: companyId } = use(params);

  const [companies, setCompanies] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the sentiment data based on company ID
    // setSentimentData(fetchedData);
  }, [companyId]);

  return (
    <div className="flex flex-col gap-4">
      <BackButton text="Go Back" link="/" />
      <h1>Sentiment for {companyId}</h1>

      <div className="w-20">
        <CompaniesSelector
          companies={companies}
          handleCompaniesChange={setCompanies}
        />
      </div>

      <Chart data={sentiments} />
    </div>
  );
};

export default CompanyComparisonPage;
