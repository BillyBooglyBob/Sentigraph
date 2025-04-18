import DashboardCard from "@/components/dashboard/DashboardCard";

import CompaniesTable from "@/components/companies/CompaniesTable";

import { columns } from "@/components/companies/columns";
import companies from "@/data/companies";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-5">
        <DashboardCard
          title="Sentiment Value"
          value={0.38}
          date="20 June 2001 - 12 April 2023"
        />
        <DashboardCard
          title="Posts Analysed"
          value={3290}
          date="20 June 2001 - 12 April 2023"
        />
      </div>
      <div>
        <CompaniesTable columns={columns} data={companies}/>
      </div>
    </div>
  );
}
