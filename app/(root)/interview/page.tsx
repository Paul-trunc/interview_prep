import Agent from "@/app/components/Agent";
import { getCurrentUser } from "@/lib/auth.action";
import React from "react";
//refer to Agent @ components/Agent.tsx
const page = async () => {
  const user = await getCurrentUser();
  return (
    <>
      <h3>Interview Preparation</h3>

      <Agent userName={user?.name} userId={user?.id} type="generate" />
    </>
  );
};

export default page;
