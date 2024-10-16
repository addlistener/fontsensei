import FontPickerPage from "../../browser/fontPicker/FontPickerPage";
import {NavbarContext} from "../../browser/fontPicker/FontPickerPage";
import React from "react";
import {FontPickerPageContext} from "@fontsensei/components/fontPickerCommon";
import {getExtraMenuItems} from "../../browser/fontPicker/landingComponents";
import EmbeddedToolbar from "./EmbeddedToolbar";
import {useI18n} from "@fontsensei/locales";

export {getServerSideProps} from "../../browser/fontPicker/FontPickerPage";
export default (props: Parameters<typeof FontPickerPage>[0]) => {
  const t = useI18n();
  return <NavbarContext.Provider value={{
    shouldHide: true,
    extraMenuItems: getExtraMenuItems(t),
    noSwitchLocaleHint: true,
  }}>
    <FontPickerPageContext.Provider value={{
      Toolbar: EmbeddedToolbar,
      basePath: '/embed'
    }}>
      <FontPickerPage {...props} />
    </FontPickerPageContext.Provider>
  </NavbarContext.Provider>;
};
