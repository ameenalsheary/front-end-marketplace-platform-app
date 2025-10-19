import ProfileSidebar from "@/components/ProfileSidebar";

export default function ProfileLayout({ children }) {
  return (
    <div className="bg-background-secondary">
      <div className="container">
        <div className="py-4 h-screen-minus-header grid grid-cols-[auto_1fr] gap-2">
          <div className="">
            <ProfileSidebar />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
