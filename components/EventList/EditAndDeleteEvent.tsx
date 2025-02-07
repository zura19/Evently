"use client";
// prettier-ignore
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription, 
AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { deleteEventAction } from "@/actions/EventActions";
import { toast } from "@/hooks/use-toast";

export default function EditAndDeleteEvent({ eventId }: { eventId: string }) {
  const deleteEvent = async () => {
    const event = await deleteEventAction(eventId);

    if (event.error) {
      toast({
        title: "Error",
        description: event.error as string,
        variant: "destructive",
      });
      return;
    }

    if (event.success) {
      toast({
        title: "Success",
        description: event.success as string,
        variant: "success",
      });
      return;
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="absolute flex flex-col z-50 top-2 right-2 text-sm rounded-md font-medium opacity-0 group-hover:opacity-100 group-hover:-translate-y  text-primary-foreground add-transition-500">
          <Button className="size-8 rounded-full" size={"icon"}>
            <Trash2 className="hover:text-red-500 add-transition-300" />
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            with this action you will permanently delete this event.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteEvent}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
