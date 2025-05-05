import { namespace } from "../../noteApp/frontendNoteApp/noteApp/.expo/types/router";
// env.d.ts
declare namespace Nodejs {
  interface ProcessEnv {
    MONGO_URI: string;
  }
}
