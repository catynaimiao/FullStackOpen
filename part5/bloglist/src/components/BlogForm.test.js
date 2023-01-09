import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("he form calls the event handler it received as props with the right details when a new blog is created", async () => {
  const addBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm addBlog={addBlog} />);

  const inputs = screen.getAllByRole("textbox");
  const createButton = screen.getByText("create");

  await user.type(inputs[0], "testTitle");
  await user.type(inputs[1], "testAuthor");
  await user.type(inputs[2], "testUrl");
  await user.click(createButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe("testTitle");
  expect(addBlog.mock.calls[0][0].author).toBe("testAuthor");
  expect(addBlog.mock.calls[0][0].url).toBe("testUrl");
});
