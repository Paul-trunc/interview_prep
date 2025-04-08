import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import Image from "next/image";
// import { dummyInterviews } from "@/constants";
import InterviewCard from "../components/InterviewCard";
import { getCurrentUser } from "@/lib/auth.action";
import {
  getInterviewByUserId,
  getLatestInterviews,
} from "@/lib/general.action";

const page = async () => {
  //calling the Interview component
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  // const userInterviews = await getInterviewByUserId(user?.id!);
  // const latestInterviews = await getLatestInterviews({ userId: user?.id! });

  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-primary-100">
            Get Interview-Ready for AI-Powered Practice
          </h2>
          <p className="text-primary-200">
            Practice Real Interview Questions & get instant feedback with AI.
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* Your Interviews Section */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="flex flex-wrap gap-6 interview-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      {/* Take an Interview Section */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>

        <div className="interview-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>There are no new Interviews available.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
