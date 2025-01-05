import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { toast, type Toast } from "react-hot-toast";
import { BiSolidErrorCircle } from "react-icons/bi";
import { GoCheckCircleFill } from "react-icons/go";

interface CustomToastProps {
  t?: Toast;
  message: string;
  description?: string;
  txId?: string;
  address?: string;
  icon?: string;
}

const ToastContent = ({ t, message, description, icon }: CustomToastProps) => {
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const [remainingTime, setRemainingTime] = useState(5000);
  const [isClosing, setIsClosing] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const Icon = icon ? (
    icon === "GoCheckCircleFill" ? (
      <GoCheckCircleFill size={24} className="text-white-500" />
    ) : (
      <BiSolidErrorCircle size={24} color="red" className="text-white" />
    )
  ) : null;

  useEffect(() => {
    if (paused) {
      clearInterval(intervalRef.current!);
      clearTimeout(timeoutRef.current!);
      return;
    }

    startTimeRef.current = Date.now() - (5000 - remainingTime);

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newRemaining = Math.max(5000 - elapsed, 0);
      const percentage = (newRemaining / 5000) * 100;

      setRemainingTime(newRemaining);
      setProgress(percentage);

      if (newRemaining <= 0) handleClose();
    };

    intervalRef.current = setInterval(updateProgress, 50);
    timeoutRef.current = setTimeout(handleClose, remainingTime);

    return () => {
      clearInterval(intervalRef.current!);
      clearTimeout(timeoutRef.current!);
    };
  }, [paused]);

  const handleClose = () => {
    if (!t) return;
    setIsClosing(true);

    clearInterval(intervalRef.current!);
    clearTimeout(timeoutRef.current!);

    setTimeout(() => toast.dismiss(t.id), 300);
  };
  if (!t) return;
  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`${
        isClosing ? "animate-shrinkOut" : t.visible ? "animate-fadeInUp" : ""
      } max-w-[300px] w-full bg-green-600 shadow-lg rounded-lg pointer-events-auto overflow-hidden`}
    >
      <div className="relative w-full h-0.5 bg-green-800">
        <div
          className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white flex-1">
            {Icon}
            <p className="font-medium text-sm">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors ml-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {description && (
          <div className="mt-2 text-white/80 text-sm whitespace-pre-line pl-8">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export const customToast = ({
  message,
  description,
  icon,
  txId,
  address,
}: CustomToastProps) => {
  return toast.custom(
    (t: Toast) => (
      <ToastContent
        t={t}
        message={message}
        description={description}
        icon={icon}
        txId={txId}
        address={address}
      />
    ),
    {
      duration: Infinity,
    }
  );
};
