import EditUserForm from "@/components/user/EditUserForm";

const ProfilePage = () => {
  /* TODO - Replace with redux for the current user */
  const userId = "1";

  return (
    <>
      <EditUserForm userId={userId} />
    </>
  );
};

export default ProfilePage;
