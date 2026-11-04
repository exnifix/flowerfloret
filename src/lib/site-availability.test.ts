import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { SITE_OFFLINE, offlineResponse } from "./site-availability";

describe("temporary website shutdown", () => {
  test("website stays offline until restored", () => {
    assert.equal(SITE_OFFLINE, true);
  });
  test("requests receive HTTP 404", async () => {
    const response = offlineResponse();
    assert.equal(response.status, 404);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.ok((await response.text()).includes("<h1>404</h1>"));
  });
});