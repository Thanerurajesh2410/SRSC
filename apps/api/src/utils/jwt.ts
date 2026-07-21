import jwt, { Secret, SignOptions } from "jsonwebtoken";

export interface JwtPayload {
    userId: string;
    email: string;
    roleId: string;
}

export const generateAccessToken = (payload: JwtPayload): string => {
    const secret: Secret = process.env.JWT_SECRET!;

    const options: SignOptions = {
        expiresIn: "1d" as const,
    };

    return jwt.sign(payload, secret, options);
};

export const verifyAccessToken = (
    token: string
): JwtPayload => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET as string
    ) as JwtPayload;
};