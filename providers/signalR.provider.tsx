"use client";

import { startSignalRConnection } from "@/core/signalRService";
import { useEffect } from "react";
import { useAppContext } from "./app.provider";

const SignalRProvider = () => {

    const app = useAppContext();
  useEffect(() => {
    startSignalRConnection(app.setProgress);
  }, []);

  return null;
};

export default SignalRProvider;
