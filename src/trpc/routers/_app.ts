import { z } from 'zod';

import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
  invoke: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { text } = input;
      // Call the Inngest function with the text
      const response = await inngest.send({
        name: 'test/hello.world2',
        data: { email: input.text },
      });
      return response;
    }),
  createAI: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;