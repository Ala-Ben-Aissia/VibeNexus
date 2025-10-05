import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  sayHello: baseProcedure
    .input(
      z.object({
        msg: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `Hello ${opts.input.msg}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
