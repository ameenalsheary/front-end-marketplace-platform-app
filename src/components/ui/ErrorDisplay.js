"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "./Button";

export default function ErrorDisplay(props) {
  const { srcImage, error, description, buttonText, ButtonVariant, eventHandler, href, onClick } = props;
  const router = useRouter();

  let onClickFunction;

  switch (eventHandler) {
    case "GO_BACK":
      onClickFunction = () => window.history.back();
      break;
    case "GO_TO":
      onClickFunction = () => {
        if (href) router.push(href);
      };
      break;
    default:
      onClickFunction = onClick;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-1.5">
      <Image
        src={srcImage}
        width={256}
        height={256}
        priority
        alt=""
        className="w-28"
      />

      <h1 className="text-lg text-center font-semibold">{error}</h1>

      <p className="text-sm text-center max-w-sm">{description}</p>

      <Button variant={ButtonVariant || "error"} onClick={onClickFunction}>{buttonText}</Button>
    </div>
  );
}
