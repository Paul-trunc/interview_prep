import Agent from "@/app/components/Agent";
import React from "react";
//refer to Agent @ components/Agent.tsx
const page = () => {
  return (
    <>
      <h3>Interview Preparation</h3>

      <Agent userName="You" userId="user1" type="generate" />
    </>
  );
};

export default page;
