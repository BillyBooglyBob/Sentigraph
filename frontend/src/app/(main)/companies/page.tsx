import BackButton from "@/components/BackButton";
import DataTable from "@/components/DataTable";
import { DataTableColumns } from "@/components/companies/DataTableColumns";
import companies from "@/data/companies";

const CompaniesPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <DataTable columns={DataTableColumns} data={companies} />
    </>
  );
};

export default CompaniesPage;
