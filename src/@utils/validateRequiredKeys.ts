export function validateRequiredKeys(obj: any) {
  for (let key in obj) {
    if (obj[key] === undefined) {
      throw new Error(
        `${key} is required to initialize the logger class instance`,
      );
    }
  }
}
