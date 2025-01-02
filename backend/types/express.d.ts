declare namespace Express {
  export interface User {
    id: string; // Assuming user ID is a CUID or UUID
    email: string;
    username: string;
  }
  export interface Request {
    user?: {
      id: string; // The type of the user ID (string for CUIDs)
      email: string;
      username: string;
    };
  }
}
