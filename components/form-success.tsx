"use client";

import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";

interface SuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: SuccessProps) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-2 gap-x-2 flex rounded-md items-center text-emerald-500 ">
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
