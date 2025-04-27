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

  // Filter the sentiments based on the selected aspects
  // Get the data, labels and colors for the chart
  const data = [
    {
      date: "2023-01-01",
      CustomerService: 0.8,
      ProductQuality: 0.6,
      Delivery: 0.7,
    },
    {
      date: "2023-02-01",
      CustomerService: 0.7,
      ProductQuality: 0.5,
      Delivery: 0.6,
    },
    {
      date: "2023-03-01",
      CustomerService: 0.9,
      ProductQuality: 0.8,
      Delivery: 0.7,
    },
    {
      date: "2023-04-01",
      CustomerService: 0.6,
      ProductQuality: 0.7,
      Delivery: 0.8,
    },
    {
      date: "2023-05-01",
      CustomerService: 0.7,
      ProductQuality: 0.6,
      Delivery: 0.9,
    },
    {
      date: "2023-06-01",
      CustomerService: 0.8,
      ProductQuality: 0.7,
      Delivery: 0.6,
    },
    {
      date: "2023-07-01",
      CustomerService: 0.9,
      ProductQuality: 0.8,
      Delivery: 0.7,
    },
    {
      date: "2023-08-01",
      CustomerService: 0.6,
      ProductQuality: 0.5,
      Delivery: 0.6,
    },
    {
      date: "2023-09-01",
      CustomerService: null,
      ProductQuality: 0.6,
      Delivery: 0.7,
    },
    {
      date: "2023-10-01",
      CustomerService: null,
      ProductQuality: 0.7,
      Delivery: 0.8,
    },
    {
      date: "2023-11-01",
      CustomerService: null,
      ProductQuality: 0.8,
      Delivery: 0.7,
    },
    {
      date: "2023-12-01",
      CustomerService: 0.6,
      ProductQuality: 0.5,
      Delivery: 0.6,
    },
    {
      date: "2024-01-01",
      CustomerService: 0.7,
      ProductQuality: 0.6,
      Delivery: 0.7,
    },
  ];
  const colors = ["#3b82f6", "#10b981", "#f59e0b"]; // blue, green, amber
  const labels = ["Customer Service", "Product Quality", "Delivery"];

  return (
    <div className="flex flex-col gap-4">
      <BackButton text="Go Back" link="/" />
      <h1>Sentiment for {companyId}</h1>

      <CompaniesSelector
        companies={companies}
        handleCompaniesChange={setCompanies}
      />

      <Chart
        data={data}
        labels={labels}
        colors={colors}
        title="Sentiment for Amazon"
        description={labels.join(", ")}
      />
    </div>
  );
};

export default CompanyComparisonPage;
