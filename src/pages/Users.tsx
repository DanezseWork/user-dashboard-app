import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

type Job = {
  label: string;
  value: string;
};

const jobs: Job[] = [
  { label: "Manager", value: "manager" },
  { label: "Admin", value: "admin" },
  { label: "Staff", value: "staff" },
];

export function Users() {
  const [date, setDate] = React.useState<Date>();
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const dialogContentRef = React.useRef<HTMLDivElement | null>(null);
  const [errorMessages, setErrorMessages] = React.useState({
    name: "",
    email: "",
    date: "",
    role: "",
  });

  function addUser(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const role = formData.get("role");
    let nameMessage = "";
    let dateMessage = "";
    let emailMessage = "";
    let roleMessage = "";
    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (typeof name !== "string" || name === "") {
      nameMessage = "Name is required";
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      nameMessage = "Name should be letters only";
    }

    if (typeof email !== "string" || email === "") {
      emailMessage = "Email is required";
    } else if (!emailPattern.test(email)) {
      emailMessage = "Enter a valid Email";
    }

    if (date == undefined) {
      dateMessage = "Date is required";
    }

    if (role == "") {
      roleMessage = "Role is required";
    }

    setErrorMessages({
      name: nameMessage,
      email: emailMessage,
      date: dateMessage,
      role: roleMessage,
    });

    console.log("Form Submitted");
  }

  function handleClose() {
    setErrorMessages({
      name: "",
      email: "",
      date: "",
      role: "",
    });
  }

  return (
    <Dialog onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>

      <DialogContent ref={dialogContentRef}>
        <FieldSet>
          <FieldLegend>Add User</FieldLegend>
          <FieldDescription>Create a User</FieldDescription>
          <form action={addUser}>
            <FieldGroup>
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  name="name"
                  placeholder="Name"
                  className={errorMessages.name && "border-destructive"}
                />
                <FieldError>{errorMessages.name}</FieldError>
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  name="email"
                  placeholder="Email"
                  className={errorMessages.email && "border-destructive"}
                />
                <FieldError>{errorMessages.email}</FieldError>
              </Field>
              <Field>
                <FieldLabel>Joined Date</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!date}
                      className={`justify-start gap-2 text-left font-normal data-[empty=true]:text-muted-foreground ${errorMessages.date && "border-destructive"}`}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Joined Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                    />
                  </PopoverContent>
                </Popover>
                <FieldError>{errorMessages.date}</FieldError>
              </Field>
              <Field>
                <FieldLabel>Job Role</FieldLabel>
                <Combobox
                  items={jobs}
                  value={selectedJob}
                  onValueChange={setSelectedJob}
                  itemToStringValue={(job) => job.label}
                >
                  <ComboboxInput
                    placeholder="Job Role"
                    name="role"
                    className={errorMessages.role && "border-destructive"}
                  />
                  <ComboboxContent portalContainer={dialogContentRef}>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                      {(job) => (
                        <ComboboxItem key={job.value} value={job}>
                          {job.label}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                <FieldError>{errorMessages.role}</FieldError>
              </Field>
              <Field>
                <div className="flex gap-2 items-center pb-4">
                  <Checkbox />
                  <FieldLabel>Receive Email Notifications</FieldLabel>
                </div>
              </Field>
            </FieldGroup>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <DialogClose asChild>
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </FieldSet>
      </DialogContent>
    </Dialog>
  );
}
