import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default", () => {
  const blog = {
    title: "testTitle",
    author: "testAuthor",
    url: "testUrl",
    likes: "0",
    id: "id",
  };
  const likeClick = jest.fn();
  const deleteBlog = jest.fn();

  render(<Blog blog={blog} likeClick={likeClick} deleteBlog={deleteBlog} />);

  const testUrl = screen.queryByText("testUrl");
  expect(testUrl).toBeNull();
  const testTitle = screen.queryByText("testTitle");
  expect(testTitle).toBeDefined();
});

test(" checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
  const blog = {
    title: "testTitle",
    author: "testAuthor",
    url: "testUrl",
    likes: "0",
    id: "id",
  };

  const user = userEvent.setup();
  const likeClick = jest.fn();
  const deleteBlog = jest.fn();

  render(<Blog blog={blog} likeClick={likeClick} deleteBlog={deleteBlog} />);
  const viewButton = screen.getByText("view");
  await user.click(viewButton);
  const testUrl = screen.queryByText("testUrl");
  expect(testUrl).toBeDefined();
  const testTitle = screen.queryByText("testTitle");
  expect(testTitle).toBeDefined();
});

test(" if the like button is clicked twice, the event handler the component received as props is called twice.", async () => {
  const blog = {
    title: "testTitle",
    author: "testAuthor",
    url: "testUrl",
    likes: "0",
    id: "id",
  };

  const user = userEvent.setup();
  const likeClick = jest.fn();
  const deleteBlog = jest.fn();

  render(<Blog blog={blog} likeClick={likeClick} deleteBlog={deleteBlog} />);
  const viewButton = screen.getByText("view");
  await user.click(viewButton);
  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);
  expect(likeClick.mock.calls).toHaveLength(2);
});
