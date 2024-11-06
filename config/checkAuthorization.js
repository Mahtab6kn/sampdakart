import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function checkAuthorization(request) {
  const token = await getToken({ req: request, secret });

  if (!token) {
    return "Unauthorized";
  }

  return token.role === "admin" ? true : false;
}
