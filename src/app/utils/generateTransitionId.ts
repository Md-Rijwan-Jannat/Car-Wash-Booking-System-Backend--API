export const generateTransactionId = (): string => {
  const randomNum = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
  const timestamp = Date.now();
  return `TNX-${timestamp}-${randomNum}`;
};
