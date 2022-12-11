import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ActionNotification from "./ActionNotification";
import { MessageStatus } from "../../types/fact";

describe("ActionNotification", () => {
  let messageArr: Array<MessageStatus> = ["success", "error"];

  messageArr.forEach((message) => {
    test(`properly show ${message} description`, () => {
      let testDescription = "test";
      render(
        <>
          <ActionNotification
            msgStatus={message}
            description={testDescription}
          />
        </>
      );
      expect(screen.getByText(testDescription)).toBeTruthy();
      expect(screen.getByText(testDescription).id).toBe(`${message}_msg`);
    });
  });
});
