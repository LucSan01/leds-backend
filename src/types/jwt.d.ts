
import { JwtPayload } from "jsonwebtoken";

export interface CustomizedJwtPayload extends JwtPayload{
    id: string
}