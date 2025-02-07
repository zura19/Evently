import { Checkbox } from "../ui/checkbox";

export default function CheckboxList({
  arr,
  value,
  setValue,
}: {
  arr: { value: string; label: string }[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  function handleChange(item: { value: string; label: string }) {
    if (value.includes(item.value)) {
      setValue((prev) =>
        prev.replace(!prev.includes("-") ? item.value : `-${item.value}`, "")
      );
    } else {
      setValue((prev) =>
        prev.length === 0 ? item.value : `${prev}-${item.value}`
      );
    }
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-y-4">
      {arr.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <Checkbox
            value={item.value}
            onCheckedChange={() => {
              handleChange(item);
            }}
            checked={value.includes(item.value)}
            id={item.value}
          />
          <label
            htmlFor={item.value}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
}
