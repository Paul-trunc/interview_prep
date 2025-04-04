// import React from "react";
// import { Input } from "@/components/ui/input";
// import {
//   FormItem,
//   FormLabel,
//   FormControl,
//   //   FormDescription,
//   FormMessage,
// } from "@/components/ui/form";
// import { Controller, FieldValues, Path } from "react-hook-form";

// interface FormFieldProps<T extends FieldValues> {
//   control: Control<T>;
//   name: Path<T>;
//   label: string;
//   placeholder: string;
//   type?: "text" | "email" | "password" | "file";
// }

// const FormField = ({
//   control,
//   name,
//   label,
//   placeholder,
//   type = "text",
// }: FormFieldProps<T>) => (
//   <Controller
//     name={name}
//     control={control}
//     render={({ field }) => (
//       <FormItem>
//         <FormLabel className="label">{label}</FormLabel>
//         <FormControl>
//           <Input
//             className="input"
//             placeholder={placeholder}
//             type={type}
//             {...field}
//           />
//         </FormControl>
//         {/* <FormDescription>This is your public display name.</FormDescription> */}
//         <FormMessage />
//       </FormItem>
//     )}
//   />
// );

// export default FormField;

import React from "react";
import { Input } from "@/components/ui/input";
import {
  FormItem,
  FormLabel,
  FormControl,
  // FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Controller,
  FieldValues,
  Path,
  Control,
  RegisterOptions,
} from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>; // Type of react-hook-form control
  name: Path<T>; // Path of the field within the form data
  label: string;
  placeholder: string;
  type?: "text" | "email" | "password" | "file";
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  rules = { required: "This field is required" } as Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >, // Default rule with adjusted type
}: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={rules} // Pass validation rules
    render={({ field, fieldState }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          <Input
            className="input"
            placeholder={placeholder}
            type={type}
            {...field}
          />
        </FormControl>
        {/* <FormDescription>This is your public display name.</FormDescription> */}
        <FormMessage>{fieldState?.error?.message}</FormMessage>
      </FormItem>
    )}
  />
);

export default FormField;
