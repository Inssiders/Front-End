export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    if (process.env.NODE_ENV === "development") {
      const { startServer } = await import("./mocks/server");
      startServer();
    }
  }
}
