import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@/lib/types/inputTypes";

export function FormSelect({
  className,
  label,
  name,
  errorMessage,
  placeholder,
  setValue,
  value,
  arr,
}: SelectProps) {
  return (
    <div className="space-y-2 block">
      <label className={`p-1 font-medium ${errorMessage && "text-red-500"} `}>
        {label}
      </label>
      <Select
        defaultValue={value}
        onValueChange={(value) => setValue(name, value)}
      >
        <SelectTrigger className=" rounded-full  bg-muted ">
          <SelectValue className="" placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={`${className}`}>
          <SelectGroup>
            {arr.map((item, i) => (
              <SelectItem key={i} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errorMessage && (
        <p className="p-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
