import { InputProps } from "@/lib/types/inputTypes";
import { Textarea } from "../ui/textarea";

export default function FormTextarea({
  placeholder,
  className,
  type = "text",
  label,
  errorMessage,
  register,
}: InputProps) {
  return (
    <div className="space-y-2 ">
      <label
        htmlFor={label}
        className={`p-1 font-medium ${errorMessage && "text-red-500"} `}
      >
        {label}
      </label>

      <Textarea
        rows={10}
        id={label}
        {...register}
        className={`bg-muted h-full ${className}`}
        placeholder={placeholder}
        type={type}
      />

      {errorMessage && (
        <p className="p-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
