export async function register() {
  if (process.env.API_MOCKING === "enabled") {
    if (process.env.NEXT_RUNTIME === "nodejs") {
      const { startServer } = await import("./mocks/server");
      startServer();
    }
  }
}
