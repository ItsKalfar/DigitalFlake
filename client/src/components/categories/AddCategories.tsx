import { Input } from "../forms/Input";
import { Button } from "../Button";
import { MoveLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "../Select";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGlobalContext } from "../../context/GlobalContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../forms/Form";

export const AddCategories = () => {
  const { setActiveComponent, createCategory } = useGlobalContext();

  const formSchema = z.object({
    name: z.string().min(3, {
      message: "Please provide valid name",
    }),
    description: z.string().min(3, { message: "Please provide description" }),
    status: z.string().min(3, { message: "Please provide status" }),
  });

  type ValidationSchema = z.infer<typeof formSchema>;

  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "",
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data: any) => {
    try {
      createCategory(data);
      form.reset();
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  return (
    <div className="w-3/4 relative h-[calc(100vh-70px)] items-start py-4 px-4">
      <div className="h-full p-6 shadow-xl rounded-md">
        <div className="flex items-center justify-start">
          <MoveLeft
            className="scale-80 mt-0.5"
            onClick={() => setActiveComponent("category")}
          />
          <h2 className="ml-4">Add Category</h2>
        </div>
        <Form {...form}>
          <form
            className="grid grid-cols-3 gap-4 mt-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desciption</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectSeparator />
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="rounded-3xl absolute bottom-10 right-[200px]"
              variant="outline"
              onClick={() => setActiveComponent("category")}
            >
              Cancel
            </Button>
            <Button
              className="rounded-3xl absolute bottom-10 right-20"
              type="submit"
            >
              Confirm
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
