"use client";

import { useState, use } from "react";
import Chart from "@/components/dashboard/Chart";
import CompaniesSelector from "@/components/dashboard/selector/CompanySelector";
import BackButton from "@/components/BackButton";
import { useSentimentData } from "@/hooks/useSentimentData";
import { Loader2 } from "lucide-react";
import { formatSentimentString } from "@/lib/formatter";
import AspectSelector from "@/components/dashboard/selector/AspectSelector";

interface CompanyComparisonPageProps {
  params: Promise<{ id: string }>;
}

/* TODO: Deal with the caching, so when companies changed, 
already gotten companies don't need to be retrieved again. 

- Have the companies in the state be part of the URL as well.
*/
const CompanyComparisonPage = ({ params }: CompanyComparisonPageProps) => {
  // Get data for the current user by looking up the ID in the URL
  const { id: companyId } = use(params);

  // Fetch the sentiment data based on the companies and aspect selected
  const [companies, setCompanies] = useState<string[]>([]);
  const [aspects, setAspects] = useState<string[]>([]);

  const {
    data: sentimentData,
    isLoading,
    error,
  } = useSentimentData({
    companies,
    aspect: aspects[0] || "",
    timeframe: "90d",
  });

  return (
    <div className="flex flex-col gap-4">
      <BackButton text="Go Back" link="/" />
      <h1>Sentiment for {companyId}</h1>

      <div className="flex gap-6">
        <CompaniesSelector
          companies={companies}
          handleCompaniesChange={setCompanies}
        />
        <AspectSelector aspects={aspects} handleAspectsChange={setAspects} />
      </div>

      {companies.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">
            Please select at least one company.
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Error loading data.</p>
        </div>
      ) : sentimentData ? (
        <Chart
          data={sentimentData.data}
          labels={companies}
          title={formatSentimentString(companies)}
          description={companies.join(", ")}
        />
      ) : null}
    </div>
  );
};

export default CompanyComparisonPage;
