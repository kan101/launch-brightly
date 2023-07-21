// @ts-nocheck
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import DataTable from "../sortable/DataTable.vue";

describe("DataTable.vue Implementation Test", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(DataTable, {});
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("tests components are diplayed correctly", () => {
    expect(wrapper.findComponent({ name: "DataTableHeader" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "DataTableRow" }).exists()).toBe(true);
  });
  
});
