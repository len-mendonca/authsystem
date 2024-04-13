"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface ErrorProps {
  message?: string;
}

export const FormError = ({ message }: ErrorProps) => (
  <div className="bg-destructive/15 p-2 gap-x-2 flex rounded-md items-center  ">
    <ExclamationTriangleIcon className="h-4 w-4" />
    <p>{message}</p>
  </div>
);
