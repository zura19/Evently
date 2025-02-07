"use client";
import { Upload } from "lucide-react";
// prettier-ignore
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageSchema } from "@/lib/types/zod";
import { z } from "zod";
import FormButton from "../FormComps/FormButton";
import { useState } from "react";
import { FileUploader } from "../FormComps/ImageUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUserAction } from "@/actions/userModel";
import { toast } from "@/hooks/use-toast";

export default function UploaderIcon({
  iconSize,
  userId,
}: {
  iconSize: number;
  userId: string;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");
  const [isOpen, setIsOpen] = useState(false);

  const { setValue, getValues, formState, handleSubmit, reset } = useForm<
    z.infer<typeof imageSchema>
  >({
    resolver: zodResolver(imageSchema),
  });

  const onSubmit = async (data: z.infer<typeof imageSchema>) => {
    console.log(data);
    const uploadedImages = await startUpload(files);
    const update = await updateUserAction(userId, {
      image: uploadedImages?.at(0)?.url as string,
    });

    if (update.error) {
      toast({
        title: "Error",
        description: (update.error as string) || "Something went wrong",
        variant: "destructive",
      });
      return;
    }

    if (update.success) {
      toast({
        title: "Success",
        description: "Image uploaded successfully",
        variant: "success",
      });
      setIsOpen(false);
      reset();
      return;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        asChild
        className="absolute w-full h-full inset-0  rounded-full flex justify-center items-center group"
      >
        <div>
          <Upload
            className="absolute group-hover:opacity-100 opacity-0 z-20 text-white cursor-pointer add-transition-500"
            size={iconSize}
          />
          <p className="absolute group-hover:opacity-100 top-[66%] text-sm font-medium opacity-0 z-20 text-white cursor-pointer add-transition-500">
            Upload Image
          </p>
          <div className="absolute inset-0 z-10 cursor-pointer  bg-black opacity-0 group-hover:opacity-40 w-full h-full rounded-full add-transition-500"></div>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Upload a new image for your profile
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <FileUploader
            setFiles={setFiles}
            imageUrl={getValues("image")}
            errorMessage={formState.errors.image?.message}
            onFieldChange={(url: string) => setValue("image", url)}
          />
          <FormButton
            content="Upload"
            glow={true}
            isSubmitting={formState.isSubmitting}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
