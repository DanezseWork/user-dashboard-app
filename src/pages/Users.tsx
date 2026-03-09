import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

type Framework = {
  label: string;
  value: string;
};

const frameworks: Framework[] = [
  { label: "Next.js", value: "next" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt", value: "nuxt" },
];

export function Users() {
  const [date, setDate] = React.useState<Date>();
  const [selectedFramework, setSelectedFramework] =
    React.useState<Framework | null>(null);

  const dialogContentRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>

      <DialogContent ref={dialogContentRef}>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>Create a User</DialogDescription>
        </DialogHeader>

        <form action="">
          <div className="flex flex-col gap-2">
            <Input name="name" placeholder="Name" />
            <Input name="email" placeholder="Email" />

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!date}
                  className="justify-start gap-2 text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>

            <Combobox
              items={frameworks}
              value={selectedFramework}
              onValueChange={setSelectedFramework}
              itemToStringValue={(framework) => framework.label}
            >
              <ComboboxInput placeholder="Select a framework" />
              <ComboboxContent portalContainer={dialogContentRef}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(framework) => (
                    <ComboboxItem key={framework.value} value={framework}>
                      {framework.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
