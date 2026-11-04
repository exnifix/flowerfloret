import { describe, expect, test } from "bun:test";
import { SITE_OFFLINE, offlineResponse } from "./site-availability";

describe("temporary website shutdown", () => {
  test("website stays offline until restored", () => {
    expect(SITE_OFFLINE).toBe(true);
  });
  test("requests receive HTTP 404", async () => {
    const response = offlineResponse();
    expect(response.status).toBe(404);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.text()).toContain("<h1>404</h1>");
  });
});