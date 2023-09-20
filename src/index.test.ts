/**
 * @jest-environment jsdom
 */

"use strict";
import { describe, expect, test } from "@jest/globals";
import NextSelect from "./";
import { Config } from "./types";
import { OptionOptional } from "./types/store";

describe("NextSelect Module", () => {
  test("constructor", () => {
    document.body.innerHTML = '<select id="test"></select>';

    const nextSelect = new NextSelect({
      select: "#test",
    });
    expect(nextSelect).toBeInstanceOf(NextSelect);
  });

  test("multiple - do not render deselect all with no selected options", () => {
    document.body.innerHTML = `<select id="test" multiple>
        <option data-placeholder="true"></option>
        <option id="1" value="1">One</option>
        <option id="2" value="2">Two</option>
        <option id="3" value="3">Two</option>
    </select>`;

    const options: OptionOptional[] = [
      {
        id: "1",
        value: "1",
        text: "One",
      },
      {
        id: "2",
        value: "2",
        text: "Two",
      },
      {
        id: "3",
        value: "3",
        text: "Three",
      },
    ];
    const config: Config = {
      select: "#test",
      settings: {
        allowDeselect: true,
      },
      data: options,
    };

    const nextSelect = new NextSelect(config);
    expect(nextSelect.store.getSelectType()).toEqual("multiple");
    expect(nextSelect.getSelected()).toHaveLength(0);
    expect(nextSelect.render.main.deselect.main.classList).toContain(
      nextSelect.render.classes.hide,
    );
  });
  test("multiple - render deselect all option with selected options", () => {
    document.body.innerHTML = `<select id="test" multiple>
        <option data-placeholder="true"></option>
        <option id="1" value="1">One</option>
        <option id="2" value="2">Two</option>
        <option id="3" value="3">Two</option>
    </select>`;

    const options: OptionOptional[] = [
      {
        id: "1",
        value: "1",
        text: "One",
        selected: true,
      },
      {
        id: "2",
        value: "2",
        text: "Two",
        selected: true,
      },
      {
        id: "3",
        value: "3",
        text: "Three",
      },
    ];
    const config: Config = {
      select: "#test",
      settings: {
        allowDeselect: true,
      },
      data: options,
    };

    const nextSelect = new NextSelect(config);
    expect(nextSelect.store.getSelectType()).toEqual("multiple");
    expect(nextSelect.getSelected()).toHaveLength(2);
    expect(nextSelect.render.main.deselect.main.classList).not.toContain(
      nextSelect.render.classes.hide,
    );
  });
});
