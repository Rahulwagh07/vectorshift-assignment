interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  initialValue?: string;
}

export const Select = ({ value, onChange, options, initialValue }: SelectProps) => {
  return (
    <select
      value={value || initialValue || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}; 