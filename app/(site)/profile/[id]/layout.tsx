import UserSidebar from "@/components/userPage/UserSidebar";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  return (
    <div className="sm:container-box">
      <div className=" sm:grid sm:grid-cols-[3fr_10fr] h-[90dvh] ">
        <UserSidebar id={id} />
        {children}
      </div>
    </div>
  );
}
