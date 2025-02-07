import { InputProps } from "@/lib/types/inputTypes";
import { Input } from "../ui/input";

export default function FormInput({
  placeholder,
  className,
  type = "text",
  label,
  errorMessage,
  register,
  boxClassName,
}: InputProps) {
  return (
    <div className={`space-y-2 ${boxClassName}`}>
      <label
        htmlFor={label}
        className={`p-1 font-medium ${errorMessage && "text-red-500"} `}
      >
        {label}
      </label>

      <Input
        id={label}
        {...register}
        className={`rounded-full bg-muted ${className}`}
        placeholder={placeholder}
        type={type}
      />

      {errorMessage && (
        <p className="p-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
