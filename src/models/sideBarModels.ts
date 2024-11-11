export type RegularSideBarItem = {
    name: string;
    url: string;
    icon: JSX.Element;
};

export type CollapsedSideBarItem = {
    name: string;
    subPaths: CollapsedSideBarSubItem[];
    icon: JSX.Element;
};

type CollapsedSideBarSubItem = {
    name: string;
    url: string;
};

export type SideBarItem = RegularSideBarItem | CollapsedSideBarItem;
