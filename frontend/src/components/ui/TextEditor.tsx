import React, { useEffect, useState, useRef } from 'react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({ value, onChange, placeholder }) => {
  const [displayParts, setDisplayParts] = useState<{ type: 'text' | 'variable', content: string }[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputHeight, setInputHeight] = useState('38px');
  const displayRef = useRef<HTMLDivElement>(null);

  const parseContent = (text: string) => {
    const parts: { type: 'text' | 'variable', content: string }[] = [];
    let lastIndex = 0;
    const regex = /{{\s*(\w+)\s*}}/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }
      parts.push({ type: 'variable', content: match[1] });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return parts;
  };

  useEffect(() => {
    setDisplayParts(parseContent(value));
  }, [value]);

  useEffect(() => {
    if (displayRef.current) {
      const height = displayRef.current.offsetHeight;
      setInputHeight(`${Math.max(38, height)}px`);
    }
  }, [displayParts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
 

  return (
    <div className="relative min-w-[100px] max-w-[200px]">
      <div 
        className={`
          relative border border-slate-200 rounded-md overflow-hidden
          ${isFocused ? 'ring-2 ring-blue-200 border-blue-500' : ''}
        `}
        style={{ minHeight: inputHeight }}
      >
        <div 
          ref={displayRef}
          className="p-2 w-full whitespace-pre-wrap break-words"
        >
          {displayParts.map((part, index) => (
            part.type === 'variable' ? (
              <span
                key={index}
                className="inline-block px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-600 font-mono text-sm mr-1 mb-1"
              >
              {part.content} 
              </span>
            ) : (
              <span key={index} className="inline-block mr-1 mb-1">{part.content}</span>
            )
          ))}
          <span className="invisible">&nbsp;</span>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="absolute top-0 left-0 w-full h-full outline-none bg-transparent p-2 text-transparent caret-black"
        />
      </div>
    </div>
  );
}; 