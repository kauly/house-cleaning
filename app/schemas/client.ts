import * as z from 'zod';

const clientSchema = z.object({
  name: z.string({ required_error: 'O campo Nome é obrigatório' }),
  email: z
    .string({ required_error: 'O campo Email é obrigatório' })
    .email('Email inválido'),
  phone: z.string({ required_error: 'O campo Celular é obrigatório' })
});

export { clientSchema };
