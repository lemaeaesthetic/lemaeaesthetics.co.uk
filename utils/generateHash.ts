export const generateHash = (toHash: unknown) =>
  Buffer.from(JSON.stringify(toHash)).toString("base64");
