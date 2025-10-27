import ProfileSidebar from "@/components/ProfileSidebar";

export default function ProfileLayout({ children }) {
  return (
    <div className="bg-background-secondary">
      <div className="container">
        <div className="py-4 lg:py-6 min-h-screen-minus-header grid grid-cols-[auto_1fr] gap-2">
          <div className="sticky top-[calc(80px+16px)] lg:top-[calc(80px+24px)] self-start">
            <ProfileSidebar />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
