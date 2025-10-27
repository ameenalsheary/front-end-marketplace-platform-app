import { customerService } from "@/services/customer.service";
import CustomImage from "@/components/ui/CustomImage";

export default async function ProfilePage() {
  const res = await customerService.getCustomer({
    fields: "firstName lastName email profileImage role",
  });
  const customer = res.data;

  const email = customer.email;
  const maskedEmail = email.replace(/(.{5}).+(@.+)/, "$1****$2");

  return (
    <div>
      <div className="flex flex-col items-center gap-2 bg-background py-4 rounded-md shadow-sm">
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
            {customer.firstName} {customer.lastName}
          </p>
          <p className="font-semibold text-primary">{customer.role}</p>
          <p className="text-sm text-muted-foreground">{maskedEmail}</p>
        </div>
      </div>
    </div>
  );
}
