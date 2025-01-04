import { Text } from '../ui/Text';
import { TextArea } from '../ui/TextArea';
import { Select } from '../ui/Select';
import { Radio } from '../ui/Radio';
import { Button } from '../ui/Button';
import { NodeFieldRadio, NodeFieldSelect, NodeFieldType } from '../../types/node';
import {TextEditor} from '../ui/TextEditor';
export const RenderField = (
  field: NodeFieldType, 
  value: any, 
  onChange: (value: any) => void
) => {
  switch (field.type) {
    case 'text':
    case 'number':
      return (
        <Text
          type={field.type}
          value={value || field.initialValue || ''}
          onChange={onChange}
          placeholder={field?.placeholder}
        />
      );

    case 'textNode':
      return (
        <TextEditor
          value={value || ''}
          onChange={onChange}
          placeholder={field.placeholder}
        />
      );

    case 'textArea':
      return (
        <TextArea
          value={value || ''}
          onChange={onChange}
          placeholder={field.placeholder}
        />
      );

    case 'select':
      const selectField = field as NodeFieldSelect;
      return (
        <Select
          value={value}
          onChange={onChange}
          options={selectField.options}
          initialValue={selectField.initialValue}
        />
      );

    case 'radio':
      const radioField = field as NodeFieldRadio;
      return (
        <Radio
          value={value}
          onChange={onChange}
          options={radioField.options}
        />
      );

    case 'button':
      return (
        <Button
          icon={field.icon}
          text={field.text}
          variant={field.variant}
          onClick={() => onChange(true)}
        />
      );

    default:
      return (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      );
  }
}; 