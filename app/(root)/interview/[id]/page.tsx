import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getInterviewById } from "@/lib/general.action";
import { getRandomInterviewCover } from "@/lib/utils";
import DisplayTechIcons from "@/app/components/DisplayTechIcons";
import Agent from "@/app/components/Agent";
import { getCurrentUser } from "@/lib/auth.action";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);
  if (!interview) redirect("/");
  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{interview.role}</h3>
          </div>
          <DisplayTechIcons techStack={interview.techstack} />
        </div>
        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user?.name || ""}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        // feedbackId={feedback?.id}
      />
    </>
  );
};

export default page;
