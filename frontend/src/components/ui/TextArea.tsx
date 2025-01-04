interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TextArea = ({ value, onChange, placeholder }: TextAreaProps) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  );
}; 

