import BackButton from "@/components/BackButton";
import DataTable from "@/components/data-table/DataTable";
import { DataTableColumns } from "@/components/admin/DataTableColumns";
import users from "@/data/users";
import UserDataFormModal from "@/components/admin/DataFormModal";

const AdminPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <DataTable
        columns={DataTableColumns}
        data={users}
        DataModal={UserDataFormModal}
      />
    </>
  );
};

export default AdminPage;
