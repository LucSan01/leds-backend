declare global {
  namespace Express {
    interface Request {
      user?: any; // Preferably replace 'any' with your User type
    }
  }
}
