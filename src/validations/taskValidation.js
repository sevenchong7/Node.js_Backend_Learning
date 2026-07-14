const {
    z
} = require("zod");

const taskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(255, "Title cannot exceed 255 characters"),

    description: z
        .string()
        .trim()
        .max(1000, "Description cannot exceed 1000 characters")
        .optional()
});

const updateTaskSchema = z.object({
    id: z
        .number()
        .int(),
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(255, "Title cannot exceed 255 characters"),

    description: z
        .string()
        .trim()
        .max(1000, "Description cannot exceed 1000 characters")
        .optional()
})

const taskPaginationSchema = z.object({
    page: z.coerce
        .number()
        .int()
        .positive()
        .default(1),
    limit: z.coerce
        .number()
        .int()
        .positive()
        .max(100)
        .default(10),
    title: z
        .string()
        .trim()
        .max(255, "Description cannot exceed 255 characters")
        .optional()
})

module.exports = {
    taskSchema,
    updateTaskSchema,
    taskPaginationSchema
};