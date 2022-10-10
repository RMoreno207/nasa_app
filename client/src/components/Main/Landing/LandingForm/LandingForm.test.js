import React from "react";
import { shallow } from "enzyme";
import LandingForm from "./LandingForm";

describe("LandingForm", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<LandingForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
