"use client";

import { startTracking } from "@/core/signalRService";
import { useAppContext } from "@/providers/app.provider";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const Map = dynamic(() => import("@/components/map") , {ssr: false})

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
