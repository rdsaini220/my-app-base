import * as z from 'zod';

export const personalInfoSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
});


export type PersonalInfoSchemaType = typeof personalInfoSchema;
