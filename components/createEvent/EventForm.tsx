"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema } from "@/lib/types/zod";
import { z } from "zod";
import FormInput from "../FormComps/FormInput";
import FormButton from "../FormComps/FormButton";
import { FormSelect } from "../FormComps/FormSelect";
import { CalendarComp } from "../FormComps/CalendarComp";
import { useState } from "react";
import FormTextarea from "../FormComps/FormTextarea";
import { useUploadThing } from "@/lib/uploadthing";
import { FileUploader } from "../FormComps/ImageUploader";
import { createEvent } from "@/actions/EventActions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function EventForm({ userId }: { userId: string }) {
  const router = useRouter();
  const { register, formState, handleSubmit, setValue, getValues, reset } =
    useForm<z.infer<typeof createEventSchema>>({
      resolver: zodResolver(createEventSchema),
      defaultValues: {
        name: "",
        category: "",
        location: "",
        price: 0,
        description: "",
        tickets: 1,
        image: "",
      },
    });
  const [startDate, setStartDate] = useState<Date>();
  const [startDateError, setStartDateError] = useState<string | null>(null);
  const [endDateError, setEndDateError] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<Date>();
  const [files, setFiles] = useState<File[]>([]);

  const { startUpload } = useUploadThing("imageUploader");

  async function onSubmit(data: z.infer<typeof createEventSchema>) {
    if (!startDate || !endDate) {
      setStartDateError("Please select start date");
      setEndDateError("Please select end date");
      return;
    }

    if (startDate.getTime() > endDate.getTime()) {
      setEndDateError("End date cannot be before start date");
      return;
    }

    if (startDate.getTime() < Date.now()) {
      setStartDateError("Start date cannot be in the past");
      return;
    }

    const uploadedImages = await startUpload(files);
    const event = await createEvent({
      data: {
        ...data,
        author: userId,
        startDate: startDate as Date,
        endDate: endDate as Date,
        image: uploadedImages?.at(0)?.url as string,
      },
    });

    if (event?.error) {
      toast({
        title: "Error",
        description: event.error as string,
        variant: "destructive",
      });
    }

    if (event?.success) {
      toast({
        title: "Success",
        description: event.success as string,
        variant: "success",
      });
      reset();
      router.push("/");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 items-start  gap-x-12 gap-y-6 "
    >
      <FormInput
        errorMessage={formState.errors.name?.message}
        register={{ ...register("name") }}
        placeholder="Event Title"
        label="Event Name"
      />
      <FormSelect
        name="category"
        setValue={setValue}
        errorMessage={formState.errors.category?.message}
        register={{ ...register("category") }}
        label="Event Category"
        placeholder="Select Event Category"
        arr={[
          { value: "music", label: "Music" },
          { value: "sport", label: "Sport" },
          { value: "art", label: "Art" },
          { value: "movies", label: "Movies" },
          { value: "programming", label: "Programming" },
          { value: "food", label: "Food" },
          { value: "technology", label: "Technology" },
          { value: "other", label: "Other" },
        ]}
      />

      <FormInput
        label="Price"
        type="number"
        register={{
          ...register("price", {
            valueAsNumber: true,
          }),
        }}
        errorMessage={formState.errors.price?.message}
        placeholder="Free"
      />

      <FormInput
        label="Tickets"
        type="number"
        placeholder="Tickets quantity"
        register={{ ...register("tickets", { valueAsNumber: true }) }}
        errorMessage={formState.errors.tickets?.message}
      />

      <CalendarComp
        date={startDate as Date}
        setDate={setStartDate as () => void}
        dateError={startDateError}
        label="Start date"
      />

      <CalendarComp
        date={endDate as Date}
        dateError={endDateError}
        setDate={setEndDate as () => void}
        label="End date"
      />

      <FormInput
        label="Event Location"
        boxClassName="md:col-span-2"
        register={{ ...register("location") }}
        errorMessage={formState.errors.location?.message}
        placeholder="Event Location"
      />

      <FormTextarea
        register={{ ...register("description") }}
        label="Description"
        placeholder="Description"
        errorMessage={formState.errors.description?.message}
      />

      <FileUploader
        setFiles={setFiles}
        imageUrl={getValues("image")}
        errorMessage={formState.errors.image?.message}
        onFieldChange={(url: string) => setValue("image", url)}
      />
      <FormButton
        classname="col-span-2 rounded-full"
        isSubmitting={formState.isSubmitting}
        content="Create Event"
        glow={true}
      />
    </form>
  );
}
