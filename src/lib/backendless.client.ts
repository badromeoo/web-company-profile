import Backendless from 'backendless';

const APP_ID = process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID!;
const API_KEY = process.env.NEXT_PUBLIC_BACKENDLESS_JS_API_KEY!;

// Create a flag to track initialization
let isInitialized = false;

if (typeof window !== 'undefined' && !isInitialized) {
  Backendless.initApp(APP_ID, API_KEY);
  isInitialized = true; // Set the flag to true after initialization
}

export default Backendless;