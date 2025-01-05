import React, { useState, useEffect, useCallback, useRef } from "react";
import { generateVariableHandles } from "../../lib/utils";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  value: initialValue,
  onChange,
  placeholder,
}) => {
  const [value, setValue] = useState<string>(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [width, setWidth] = useState<number>(150);
  const [processedVariables, setProcessedVariables] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const autoResize = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 300);
      textareaRef.current.style.height = `${newHeight}px`;
      textareaRef.current.style.overflowY =
        newHeight === 300 ? "auto" : "hidden";

      const lines = textareaRef.current.value.split("\n").length;
      const textLength = textareaRef.current.value.length;

      if (lines > 1 || textLength > 50) {
        const newWidth = Math.min(150 + lines * 20 + textLength / 20, 400);
        setWidth(newWidth);
      }
    }
  }, [width]);

  const handleVariableSpaces = (text: string): string => {
    const variables = generateVariableHandles(text);

    variables.forEach((variable) => {
      if (!processedVariables.has(variable)) {
        const variableRegex = new RegExp(`{{\\s*${variable}\\s*}}`, "g");
        text = text.replace(variableRegex, `  {{${variable}}}  `);
        setProcessedVariables((prev) => new Set(prev).add(variable));
      }
    });

    return text;
  };

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      let text = event.target.value;

      text = handleVariableSpaces(text);

      setValue(text);
      onChange(text);

      autoResize();
    },
    [onChange, autoResize, processedVariables]
  );

  return (
    <div className="relative min-w-[150px] max-w-[400px]">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        placeholder={placeholder}
        className="custom-textarea w-full text-sm border border-gray-200 rounded px-2 py-1.5 
       min-h-[30px] resize-none focus:outline-none focus:ring-1 focus:ring-blue-500;
      max-height: 200px;"
        rows={1}
        style={{
          width: `${width}px`,
          minWidth: "200px",
          maxHeight: "250px",
        }}
      />
    </div>
  );
};
