export interface SubMenu {
    title: string;
    link: string;
    icon: string;
  }
  
  export interface Menu {
    title: string;
    submenus: SubMenu[];
    expanded: boolean;
  }
  