// @ts-nocheck
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import DataTableHeader from "../sortable/DataTableHeader.vue";
import { nextTick } from "vue";

describe("DataTableHeader.vue Implementation Test", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(DataTableHeader);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("tests column labels are diplayed correctly", () => {
    const columns = [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "description", label: "Descriptions" },
      { key: "edition", label: "Editions" },
      { key: "time", label: "Time of Screenshot" },
    ];

    expect(wrapper.findAll("tr").length).toEqual(1);
    expect(wrapper.findAll("th").length).toEqual(5);

    expect(wrapper.findAll("th").at(0).find("span").text()).toMatch(columns[0].label);
    expect(wrapper.findAll("th").at(1).find("span").text()).toMatch(columns[1].label);
    expect(wrapper.findAll("th").at(2).find("span").text()).toMatch(columns[2].label);
    expect(wrapper.findAll("th").at(3).find("span").text()).toMatch(columns[3].label);
    expect(wrapper.findAll("th").at(4).find("span").text()).toMatch(columns[4].label);
  });

  it("tests filter input is toggled on search icon click", async () => {
    wrapper.find("#filter-icon").trigger("click");
    await nextTick(); 
    expect(wrapper.find("#filter-input").exists()).toBe(true);

    wrapper.find("#filter-icon").trigger("click");
    await nextTick();
    expect(wrapper.find("#filter-input").exists()).toBe(false);
  });
});
