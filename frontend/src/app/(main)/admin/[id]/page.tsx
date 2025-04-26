"use client";

import { use } from "react";
import EditUserForm from "@/components/user/EditUserForm";

interface AdminEditPageProps {
  params: Promise<{ id: string }>;
}

const AdminEditUserPage = ({ params }: AdminEditPageProps) => {
  // Get data for the current user by looking up the ID in the URL
  const { id: userId } = use(params);

  return (
    <>
      <EditUserForm userId={userId} />
    </>
  );
};

export default AdminEditUserPage;
