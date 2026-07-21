const {
    z
} = require("zod");

const logoutSchema = z.object({
    refreshToken: z
        .string()
        .trim()
        .max(255, "Description cannot exceed 255 characters"),
});

module.exports = loginSchema;