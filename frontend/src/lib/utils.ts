export const generateVariableHandles = (text: string): string[] => {
  const variableRegex = /{{\s*(\w+)\s*}}/g;
  const matches = [];
  let match;

  while ((match = variableRegex.exec(text)) !== null) {
    matches.push(match[1]);
  }

  return matches;
};
