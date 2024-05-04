export const errorHandling = async (
  fn: () => Promise<void>,
) => {
  try {
    await fn();
  } catch (e) {
    throw e;
  }
};