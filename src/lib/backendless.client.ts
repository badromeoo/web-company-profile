import Backendless from 'backendless';

const APP_ID = process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID!;
const API_KEY = process.env.NEXT_PUBLIC_BACKENDLESS_JS_API_KEY!;


let isInitialized = false;

if (typeof window !== 'undefined' && !isInitialized) {
  Backendless.initApp(APP_ID, API_KEY);
  isInitialized = true; 
}

export default Backendless;