export class ItsNotABugItsAFeatureError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ItsNotABugItsAFeatureError";
  }
}
