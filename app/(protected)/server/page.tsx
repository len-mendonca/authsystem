import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await currentUser();
  console.log(user?.name);

  return (
    <div className="w-[600px]">
      <UserInfo user={user} label="⌨️Server Component" />
    </div>
  );
};
export default ServerPage;
