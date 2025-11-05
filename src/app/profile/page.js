import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import { customerService } from "@/services/customer.service";
import CustomImage from "@/components/ui/CustomImage";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

export default async function ProfilePage() {
  const res = await customerService.getCustomer({
    fields: "firstName lastName email profileImage role",
  });
  const customer = res.data;

  const email = customer.email;
  const maskedEmail = email.replace(/(.{5}).+(@.+)/, "$1****$2");
  const admin = customer.role === "admin";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center gap-2 bg-background py-3 rounded-md shadow-sm">
        <div className="w-20 bg-background-secondary shadow-sm rounded-full">
          <CustomImage
            src={customer.profileImage}
            fallback="/images/profile-image-placeholder.png"
            width={400}
            height={400}
            alt="Profile image"
            priority
            className="w-full rounded-full"
          />
        </div>
        <div className="flex flex-col items-center text-center select-none">
          <p className="text-lg font-semibold text-foreground">
            {customer.firstName} {customer.lastName}{" "}
            {admin && (
              <VerifiedUserIcon className="text-blue-500" fontSize="small" />
            )}
          </p>
          {admin && (
            <div>
              role: <span className="font-semibold">{customer.role}</span>
            </div>
          )}
          <p className="text-sm text-muted-foreground">{maskedEmail}</p>
        </div>
      </div>

      <ThemeSwitcher />
    </div>
  );
}
