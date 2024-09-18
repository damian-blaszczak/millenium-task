import { ChangeEvent, FormEvent, memo, useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { handleError } from "../../utils";
import { IFormField } from "../../types";
import { Loader } from "../Loader/Loader";
import { StyledForm, StyledText } from "./Form.styled";

export const Form = memo(
  <T extends Record<string, unknown>>({
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
    const [formSubmitResult, setFormSubmitResult] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: Number(value) || value
      }));
    };

    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      const data = {
        id: new Date().getTime(),
        ...formData,
        account: `PL${formData.account}`,
        date: String(new Date().toISOString())
      };
      try {
        await onSubmit(data);
        setFormSubmitResult("Submitted successfully");
      } catch (error) {
        setFormSubmitResult("An error occurred");
        handleError(error);
      } finally {
        setTimeout(() => {
          setFormSubmitResult("");
        }, 2000);
      }
    };

    return (
      <StyledForm onSubmit={handleSubmit}>
        {fields.map((field) => (
          <Input
            key={field.name}
            id={field.name}
            onChange={handleChange}
            {...field}
          />
        ))}
        <Button
          type="submit"
          disabled={submitting}
          text={submitting ? <Loader $size={16} /> : "Submit"}
          aria-label="Submit form"
        />
        <StyledText $submitted={Boolean(formSubmitResult)}>
          {formSubmitResult}
        </StyledText>
      </StyledForm>
    );
  }
);
