import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Emoji search testleri", () => {
  let header, emojiListFirst, emojiListLast, inputEmoji;

  beforeEach(() => {
    render(<App />);
    header = screen.getByText(/Emoji Search/i);
    emojiListFirst = screen.getByText(/100/i);
    emojiListLast = screen.getByText(/Kissing Heart/i);
    inputEmoji = screen.getByPlaceholderText(/Search Emoji/i);
  });
  //should got header
  it("should got header", () => {
    expect(header.toBeInTheDocument);
  });
  //should got emojiList
  it("should got emojiListFirstElement", () => {
    expect(emojiListFirst.toBeInTheDocument);
  });
  it("should got emojiListLastElement", () => {
    expect(emojiListLast.toBeInTheDocument);
  });
  //should filter according to text
  it("should filter according to text", () => {
    let emojiSearch = "Wink";
    userEvent.type(inputEmoji, emojiSearch);
    let searchedElement = screen.getByText(emojiSearch);
    expect(searchedElement.toBeInTheDocument);
  });
  //when clicked , should copy
  it("should copy", () => {
    document.execCommand = jest.fn();
    userEvent.click(emojiListFirst);
    expect(document.execCommand).toBeCalledWith("copy");
    const copyEmoji = window.ClipboardData;
    expect(copyEmoji).toEqual(emojiListFirst.value);
  });
});
