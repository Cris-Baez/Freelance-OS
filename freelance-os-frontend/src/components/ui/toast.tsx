"use client";

import * as ToastPrimitives from "@radix-ui/react-toast";
import { Check, AlertCircle } from "lucide-react";

export const ToastProvider = ToastPrimitives.Provider;

export function Toast({ title, description, type = "success" }: { title: string; description?: string; type?: "success" | "error" }) {
  return (
    <ToastPrimitives.Root className="border p-4 rounded bg-white dark:bg-gray-800 flex items-start space-x-2 shadow">
      {type === "success" && <Check className="w-5 h-5 text-green-500" />}
      {type === "error"   && <AlertCircle className="w-5 h-5 text-red-500" />}
      <div>
        <ToastPrimitives.Title className="font-bold">{title}</ToastPrimitives.Title>
        {description && <ToastPrimitives.Description>{description}</ToastPrimitives.Description>}
      </div>
      <ToastPrimitives.Action asChild altText="Dismiss">
        <button className="ml-auto text-gray-500">Cerrar</button>
      </ToastPrimitives.Action>
    </ToastPrimitives.Root>
  );
}

export function Toaster() {
  return (
    <ToastProvider swipeDirection="right">
      <ToastPrimitives.Viewport className="fixed bottom-4 right-4 space-y-2 w-80 z-50" />
    </ToastProvider>
  );
}
