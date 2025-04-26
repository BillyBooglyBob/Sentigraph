import BackButton from "@/components/BackButton";
import DataTable from "@/components/DataTable";
import { DataTableColumns } from "@/components/admin/DataTableColumns";
import users from "@/data/users";

const AdminPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <DataTable columns={DataTableColumns} data={users} />
    </>
  );
};

export default AdminPage;
