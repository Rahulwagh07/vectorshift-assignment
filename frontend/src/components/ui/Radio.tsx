interface RadioProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export const Radio = ({ value, onChange, options }: RadioProps) => {
  return (
    <div className="flex gap-4">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2">
          <input
            type="radio"
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm">{option}</span>
        </label>
      ))}
    </div>
  );
}; 