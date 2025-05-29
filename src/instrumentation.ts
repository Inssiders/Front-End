export async function register() {
  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    if (process.env.NEXT_RUNTIME === "nodejs") {
      const { startServer } = await import("./mocks/server");
      startServer();
    }
  }
}
