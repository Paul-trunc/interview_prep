"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const AuthFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up"
        ? z.string().min(4, { message: "Name must contain 4 characters" })
        : z.string().optional(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must contain 8 characters" }),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = AuthFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        console.log("SIGN UP", values);
        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        console.log("SIGN IN", values);
        toast.success("Logged in successfully.");
      }
    } catch (error) {
      console.log(values);
      toast.error(`there was an error ${error}`);
    }
  }

  const isSign = type === "sign-in";
  console.log(isSign);
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">InterviewPrep</h2>
        </div>
        <h3>Job Interview Practice with AI powered Tools</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSign && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your Email"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your Password"
              type="password"
            />
            <Button className="btn" type="submit">
              {isSign ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSign ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            href={!isSign ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSign ? "Sign In" : "Create an Account"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
