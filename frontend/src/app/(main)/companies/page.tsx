"use client";

import BackButton from "@/components/BackButton";
import DataTable from "@/components/data-table/DataTable";
import { CompanyDataTableColumns } from "@/components/companies/DataTableColumns";
import companies from "@/data/companies";
import CompaniesDataFormModal from "@/components/companies/DataFormModal";

const CompaniesPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <DataTable
        columns={CompanyDataTableColumns}
        data={companies}
        DataModal={CompaniesDataFormModal}
      />
    </>
  );
};

export default CompaniesPage;
