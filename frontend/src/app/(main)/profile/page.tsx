import BackButton from "@/components/BackButton";
import EditUserForm from "@/components/user/EditUserForm";

const ProfilePage = () => {
  /* TODO - Replace with redux for the current user */
  const userId = "1";

  return (
    <>
      <BackButton text="Go Back" link="/" />
      <EditUserForm userId={userId} />
    </>
  );
};

export default ProfilePage;
