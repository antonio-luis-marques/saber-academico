import { z } from "zod";

export const schemaAll = z.object({
    username: z.string().min(1, "Campo obrigatório"), // Obrigatório
    password: z.string().min(1, "O título não pode estar vazio"), // Obrigatório
    confirmPassword: z.string().min(1, "A descrição não pode estar vazia"), // Obrigatório
  });