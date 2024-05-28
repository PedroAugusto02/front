export interface SubMenu {
    title: string;
    link: string;
  }
  
  export interface Menu {
    title: string;
    submenus: SubMenu[];
    expanded: boolean;
  }
  