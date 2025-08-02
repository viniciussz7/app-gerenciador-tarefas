//backend\src\@types\express\index.d.ts
export interface UserPayload {
    id: string;
    email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload
    }
  }
}
