import ProfileSidebar from "@/components/ui/ProfileSidebar";

export default function ProfileLayout({ children }) {
  return (
    <div className="bg-background-secondary">
      <div className="container">
        <div className="py-4 lg:py-6 min-h-screen-minus-header grid grid-cols-[auto_1fr] gap-2">
          <ProfileSidebar />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
