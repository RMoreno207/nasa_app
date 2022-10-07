import React from "react";
import { shallow } from "enzyme";
import LandingList from "./LandingList";

describe("LandingList", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<LandingList />);
    expect(wrapper).toMatchSnapshot();
  });
});
