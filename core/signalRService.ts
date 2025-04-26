import * as signalR from "@microsoft/signalr";
import { Location } from "@/providers/app.provider";

export let connection: signalR.HubConnection | null = null;

export const startSignalRConnection = async (
  setProgress: (value: number) => void,
  addLocation: (location: Location) => void
) => {
  if (connection) return;

  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://websocket-api.classbon.com/hub")
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Error)
    .build();

  try {
    await connection.start();
    console.log("SignalR connected");
  } catch (err) {
    console.log("SignalR connection error:", err);
  }

  connection.on("ReceiveProgress", (message: string) => {
    try {
      console.log(message);
      const progressValue = parseInt(message, 10);
      setProgress(progressValue);
    } catch (err) {
      console.error("Error parsing data", err);
    }
  });

  connection.on("ReceiveLocation", (message: any) => {
    try {
      const location = message as Location;
      addLocation(location);
    } catch (error) {
      console.error("Error parsing location message:", error);
    }
  });
};

export const startProgress = async () => {
  if (connection?.state === signalR.HubConnectionState.Connected) {
    try {
      await connection.invoke("StartLongRunningTask");
    } catch (err) {
      console.log("SignalR send message error:" + err);
    }
  }
};

export const startTracking = async () => {
  if (connection?.state === signalR.HubConnectionState.Connected) {
    try {
      await connection.invoke("StartTracking");
    } catch (err) {
      console.log("SignalR send message error:" + err);
    }
  }
};
