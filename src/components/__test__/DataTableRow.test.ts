// @ts-nocheck
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import dayjs from "dayjs";
import { shallowMount } from "@vue/test-utils";
import DataTableRow from "../sortable/DataTableRow.vue";

describe("DataTableRow.vue Implementation Test", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(DataTableRow, {
      propsData: {
        rowData: [
          {
            id: "1234",
            name: "Vue Project",
            description: "Vue Project Description",
            edition: "Vue 3.2",
            time_of_screenshot: "1687894535",
          },
        ],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("checks elements and data are diplayed correctly", () => {
    expect(wrapper.findAll("tr").length).toEqual(1);
    expect(wrapper.findAll("td").length).toEqual(5);
    expect(wrapper.findAll("td").at(0).text()).toMatch("1234");
    
    expect(wrapper.findAll("td").at(1).text()).toMatch("Vue Project");
    expect(wrapper.findAll("td").at(2).text()).toMatch(
      "Vue Project Description"
    );
    expect(wrapper.findAll("td").at(3).text()).toMatch("Vue 3.2");
    expect(wrapper.findAll("td").at(4).text()).toMatch(
      dayjs.unix(Number("1687894535")).format("DD MMM, YYYY hh:mm:ss A")
    );
  });
});
