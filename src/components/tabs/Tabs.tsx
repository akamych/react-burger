import { Dispatch, SetStateAction } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Tabs.module.css";
import { Ingredient_tabs_keys } from "../../types/Ingredient.type";

export type TabsPropsType = {
  value: string;
  text: string;
};

type possibleTabsKeys = Ingredient_tabs_keys;

type propsType = {
  tabs: TabsPropsType[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<possibleTabsKeys>>;
};

const Tabs = (props: propsType) => {
  const { activeTab, setActiveTab, tabs } = props;
  const handleClick = (key: string): void => {
    setActiveTab(key as possibleTabsKeys);
  };
  console.log({ tabs, activeTab });
  return (
    <nav className={styles.tabs_nav}>
      {Array.isArray(tabs) && tabs.length
        ? tabs.map((tab: TabsPropsType, index: number) => (
            <Tab
              key={index}
              value={tab.value}
              active={activeTab === tab.value}
              onClick={handleClick}
            >
              {tab.text}
            </Tab>
          ))
        : null}
    </nav>
  );
};

export default Tabs;
