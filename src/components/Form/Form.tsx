import { ChangeEvent, FormEvent, memo, useRef, useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { handleError } from "../../utils";
import { IFormField } from "../../types";
import { Loader } from "../Loader/Loader";
import { StyledForm, StyledText } from "./Form.styled";

const FORM_STATUSES = {
  SUCCESS: "Submitted successfully",
  ERROR: "An error occurred"
};

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
    const formRef = useRef<HTMLFormElement>(null);

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
        setFormSubmitResult(FORM_STATUSES.SUCCESS);
        formRef.current?.reset();
        setFormData(initialData);
      } catch (error) {
        setFormSubmitResult(FORM_STATUSES.ERROR);
        handleError(error);
      } finally {
        setTimeout(() => {
          setFormSubmitResult("");
        }, 2000);
      }
    };

    return (
      <StyledForm ref={formRef} onSubmit={handleSubmit}>
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
        <StyledText $submitted={formSubmitResult !== FORM_STATUSES.ERROR}>
          {formSubmitResult}
        </StyledText>
      </StyledForm>
    );
  }
);
