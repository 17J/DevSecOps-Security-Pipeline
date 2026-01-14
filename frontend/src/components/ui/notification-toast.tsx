
import React, { useEffect } from "react";
import { toast } from "sonner";

interface NotificationToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  type = "success",
  duration = 3000,
  isOpen,
  onOpenChange,
}) => {
  useEffect(() => {
    if (isOpen) {
      toast[type](message, {
        duration,
        onDismiss: () => onOpenChange(false),
      });
    }
  }, [isOpen, message, type, duration, onOpenChange]);

  return null;
};
