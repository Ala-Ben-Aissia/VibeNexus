import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { inngest } from "@/inngest/client";

export const appRouter = createTRPCRouter({
  invoke: baseProcedure
    .input(
      z.object({
        email: z.email(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await inngest.send({
        name: "test/transcript-event",
        data: { email: input.email },
      });
      return { success: true, eventId: result.ids[0] };
    }),
  sayHello: baseProcedure
    .input(
      z.object({
        msg: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `Hello ${opts.input.msg}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
