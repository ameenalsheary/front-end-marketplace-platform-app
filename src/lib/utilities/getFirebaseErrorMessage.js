// Helper function to map Firebase error codes to user-friendly messages
export function getFirebaseErrorMessage(error) {
  const code = error?.code || "";
  const message = error?.message || "";

  const errorMap = {
    "auth/invalid-verification-code": "The code you entered is incorrect. Please try again",
    "auth/missing-verification-code": "You must enter a verification code",
    "auth/code-expired": "The code has expired. Please request a new one",
    "auth/user-disabled": "This user account has been disabled. Please contact support",
    "auth/invalid-phone-number": "The phone number is invalid or incorrectly formatted",
    "auth/too-many-requests": "Too many attempts. Please wait and try again later",
    "auth/network-request-failed": "Network error. Please check your internet connection",
    "auth/session-expired": "Your session has expired. Please start again",
    "auth/internal-error": "An internal error occurred. Please try again",
    "auth/invalid-verification-id": "Invalid verification ID. Please restart the verification process",
    "auth/quota-exceeded": "SMS quota exceeded. Try again later",
    "auth/app-not-authorized": "App not authorized. Check Firebase configuration",
    "auth/missing-phone-number": "Phone number is required",
  };

  // If the code is recognized
  if (errorMap[code]) return errorMap[code];

  // Fallback for unknown messages (optional logic for developers or logs)
  console.warn("Unhandled Firebase Error:", code, message);

  // Default fallback message
  return "Something went wrong, Please try again";
}
