import FontPickerPage from "../browser/fontPicker/FontPickerPage";
import {NavbarContext} from "../browser/fontPicker/FontPickerPage";
import {GITHUB_LINK} from "../browser/productConstants";
import React from "react";
import {FaGithub} from "react-icons/fa6";
import {MdOutlineFeedback} from "react-icons/md";

export {getServerSideProps} from "../browser/fontPicker/FontPickerPage";
export default (props: Parameters<typeof FontPickerPage>[0]) => {
  return <NavbarContext.Provider value={{extraMenuItems: [
    {
      icon: <MdOutlineFeedback />,
      label: "Feedback",
      href: "https://github.com/mrbirddev/fontsensei/issues/new",
      target: "_blank",
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      href: GITHUB_LINK,
      target: "_blank",
    }
  ]}}>
    <FontPickerPage {...props} />
  </NavbarContext.Provider>;
};
