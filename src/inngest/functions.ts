import { inngest } from "./client";

export const generateTranscript = inngest.createFunction(
  { id: "generate-transcript" },
  { event: "test/transcript-event" },
  async ({ event, step }) => {
    // mimick the thinking process step
    await step.sleep("thinking...", "3s");
    // mimick the download process step
    await step.sleep("downloading...", "10s");
    // mimick a transcript process step
    await step.sleep("transcripting...", "7s");

    return {
      message: `Hello ${event.data.email}!, I am gald to transcript your video...`,
    };
  },
);
