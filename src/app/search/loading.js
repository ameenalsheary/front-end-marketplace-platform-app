import LoadingIcon from "@/components/ui/loadingIcon/LoadingIcon";

export default function Loading() {
  return (
    <div className="bg-background-secondary w-full h-screen-minus-header rounded-lg flex justify-center items-center">
      <LoadingIcon />
    </div>
  );
}
