"use client";

import { useState, useEffect, use } from "react";
import Chart from "@/components/dashboard/Chart";
import AspectSelector from "@/components/dashboard/selector/AspectSelector";
import sentiments from "@/data/sentiments";

interface CompanyPageProps {
  params: Promise<{ id: string }>;
}

/* TODO: Deal with the caching, so when aspects changed, 
already gotten aspects don't need to be retrieved again. */
const CompanyPage = ({ params }: CompanyPageProps) => {
  // Get data for the current user by looking up the ID in the URL
  const { id: companyId } = use(params);

  const [aspects, setAspects] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the sentiment data based on company ID
    // setSentimentData(fetchedData);
  }, [companyId]);

  return (
    <div className="flex flex-col gap-4">
      <h1>Sentiment for {companyId}</h1>

      <div className="w-20">
        <AspectSelector aspects={aspects} handleAspectsChange={setAspects} />
      </div>

      <Chart data={sentiments} />
    </div>
  );
};

export default CompanyPage;
