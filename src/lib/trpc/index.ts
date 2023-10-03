import {
  privateProcedure,
  publicProcedure,
  router,
} from './trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return 'world'
  })
})

export type AppRouter = typeof appRouter