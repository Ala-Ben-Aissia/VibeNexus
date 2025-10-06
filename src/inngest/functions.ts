import { inngest } from "./client";

export const generateTranscript = inngest.createFunction(
  { id: "generate-transcript" },
  { event: "test/transcript-event" },
  async ({ event, step }) => {
    // mimic the thinking process step
    await step.sleep("thinking...", "3s");
    // mimic the download process step
    await step.sleep("downloading...", "10s");
    // mimic a transcript process step
    await step.sleep("transcripting...", "7s");

    if (!event.data?.email) {
      throw new Error("Email is required in event data");
    }

    return {
      message: `Hello ${event.data.email}! I am glad to transcript your video...`,
    };
  },
);
