"use client";

import { startTracking } from "@/core/signalRService";
import { useAppContext } from "@/providers/app.provider";
import { useEffect } from "react";

export default function MapPage() {
  const appContext = useAppContext();
  useEffect(() => {
    startTracking();
  }, []);
  return (
    <>
      <Map locations={appContext.locations} />
    </>
  );
}
