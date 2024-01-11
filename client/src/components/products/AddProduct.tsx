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

export const AddProduct = () => {
  const { setActiveComponent, createProduct, categories } = useGlobalContext();

  const formSchema = z.object({
    name: z.string().min(3, {
      message: "Please provide all the info",
    }),
    packSize: z.string().min(3, { message: "Please provide all infor" }),
    category: z.string().min(3, { message: "Please provide all the info" }),
    mrp: z.string().min(3, { message: "Please provide all the info" }),
    image: z.string().min(3, { message: "Please provide all the info" }),
    status: z.string().min(3, { message: "Please provide all the info" }),
  });

  type ValidationSchema = z.infer<typeof formSchema>;

  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      packSize: "",
      category: "",
      mrp: "",
      status: "",
      image: "",
    },
  });
  const onSubmit: SubmitHandler<ValidationSchema> = (data: any) => {
    try {
      createProduct(data);
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
            onClick={() => setActiveComponent("product")}
          />
          <h2 className="ml-4">Add Product</h2>
        </div>
        <Form {...form}>
          <form
            className="grid grid-cols-3 gap-4 mt-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {" "}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category) => {
                          const { name, _id } = category;
                          return (
                            <div key={_id}>
                              <SelectItem value={name}>{name}</SelectItem>
                              <SelectSeparator />
                            </div>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="packSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pack Size</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mrp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MRP</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
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
