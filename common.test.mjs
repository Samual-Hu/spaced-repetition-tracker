import { getRevisionDates, getUserIds } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("Revision dates are calculated correctly", () => {
  const result = getRevisionDates("2026-07-19");

  assert.deepEqual(result, [
    {
      label: "1 week",
      date: "2026-07-26",
    },
    {
      label: "1 month",
      date: "2026-08-19",
    },
    {
      label: "3 months",
      date: "2026-10-19",
    },
    {
      label: "6 months",
      date: "2027-01-19",
    },
    {
      label: "1 year",
      date: "2027-07-19",
    },
  ]);
});
