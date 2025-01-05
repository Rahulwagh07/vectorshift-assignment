import { useRef, useEffect } from "react";

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TextArea = ({ value, onChange, placeholder }: TextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY = newHeight === 200 ? "auto" : "hidden";
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        adjustHeight();
      }}
      placeholder={placeholder}
      className="custom-textarea w-full min-w-[200px] text-sm border border-gray-200 rounded px-2 py-1.5 
    min-h-[30px] resize-none focus:outline-none focus:ring-1 focus:ring-blue-500;
  max-height: 200px;"
      rows={1}
    />
  );
};
