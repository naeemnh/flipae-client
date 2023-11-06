"use client";

import { useEffect } from "react";
import toast, {Toaster, useToasterStore} from "react-hot-toast";

export default function Flash() {
  const { toasts } = useToasterStore();
  
  useEffect(() => {
    toasts
      .filter(t => t.visible)
      .filter((_, i) => i>= 1)
      .filter(t => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <Toaster position="bottom-right" reverseOrder={false} />
  )
}