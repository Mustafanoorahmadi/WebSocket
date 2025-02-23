"use client";
import { startProgress } from "@/core/signalRService";
import { useAppContext } from "@/providers/app.provider";
import { Progress } from "@nextui-org/progress";
import { Button } from "@nextui-org/button";

export default function ProgressPage() {
  const appContext = useAppContext();

  return (
    <>
      <Progress
        size="md"
        color="primary"
        showValueLabel={true}
        className="max-w-md"
        value={appContext.progress}
      />

      <Button className="mt-5" onClick={() => startProgress()}>
        Start Long Runing Process
      </Button>
    </>
  );
}
