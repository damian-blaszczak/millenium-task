import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "./Input";
import styled from "styled-components";
import { Button } from "./Button";
import { handleError } from "../utils";
import { IFormField } from "../types";
import { Loader } from "./Loader";

const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 400px;
  align-items: center;
`;

const StyledText = styled.p<{ $submitted: boolean | undefined }>`
  color: ${({ $submitted }) => ($submitted ? "green" : "red")};
  position: absolute;
  bottom: -${({ theme }) => theme.space.xl + theme.space.md}px;
  opacity: ${({ $submitted }) => ($submitted === undefined ? "0" : "1")};
  transition: opacity 300ms ease;
`;

export const Form = <T extends Record<string, unknown>>({
  onSubmit,
  submitting,
  initialData,
  fields
}: {
  onSubmit: (values: T) => Promise<void>;
  submitting: boolean;
  initialData: T;
  fields: IFormField[];
}) => {
  const [formData, setFormData] = useState(initialData);
  const [formSubmitted, setFormSubmitted] = useState<boolean | undefined>(
    undefined
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: Number(value) || value
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = {
      id: new Date().getTime(),
      ...formData,
      account: `PL${formData.account}`,
      date: String(new Date().toISOString())
    };
    onSubmit(data)
      .then(() => setFormSubmitted(true))
      .catch((error) => {
        setFormSubmitted(false);
        handleError(error);
      })
      .finally(() => {
        setTimeout(() => {
          setFormSubmitted(undefined);
        }, 2000);
      });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {fields.map((field) => (
        <Input key={field.name} onChange={handleChange} {...field} />
      ))}
      <Button
        type="submit"
        disabled={submitting}
        text={submitting ? <Loader $size={16} /> : "Submit"}
      />
      <StyledText $submitted={formSubmitted}>
        {formSubmitted === undefined
          ? ""
          : formSubmitted
          ? "Submitted successfully"
          : "An error occurred"}
      </StyledText>
    </StyledForm>
  );
};
