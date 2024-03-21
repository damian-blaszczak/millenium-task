export interface IFormField {
  label: string;
  type: string;
  name: string;
  min?: number;
  required?: boolean;
  hidden?: boolean;
  placeholder?: string;
}
