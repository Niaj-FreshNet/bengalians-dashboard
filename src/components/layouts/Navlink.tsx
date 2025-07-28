import { CiFolderOn, CiSettings } from 'react-icons/ci';
import { FaUsers } from 'react-icons/fa';
import { FaCalculator, FaShop, } from 'react-icons/fa6';

import { GiNewspaper } from 'react-icons/gi';
import { GoPlus, GoPlusCircle, GoReport } from 'react-icons/go';


import { LuCalendarDays } from 'react-icons/lu';
import { MdDetails, MdOutlineCategory, MdOutlinePayments } from 'react-icons/md';
import { PiNewspaperThin } from 'react-icons/pi';
import { RiDashboardFill } from 'react-icons/ri';



export const navLink = [
  {
    name: "My Profile",
    href: "/dashboard",
    icon: RiDashboardFill,
  },

  {
    name: "Order History",
    href: "/dashboard/order-list",
    icon: LuCalendarDays,
  },

  {
    name: "Password Change",
    href: "/dashboard/password",
    icon: CiSettings,
  }

];


export const AdminNavLink = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: RiDashboardFill,
  },
  {
    name: "Category",
    href: "#",
    icon: MdOutlineCategory,
    subItems: [
      {
        name: 'Add Category',
        href: '/admin/add-category',
        icon: GoPlusCircle,
      },
      {
        name: "Category List",
        href: "/admin/category-list",
        icon: MdOutlineCategory,
      },
      {
        name: "Add Material",
        href: '/admin/add-material',
        icon: GoPlus
      },
      {
        name: "Material List",
        href: '/admin/material-list',
        icon: CiFolderOn,
      }
    ]

  },

  {
    name: "Product",
    href: "#",
    icon: FaShop,
    subItems: [

      {
        name: "Add Product",
        href: "/admin/add-product",
        icon: GoPlus,

      },
      {

        name: "Product List",
        href: "/admin/product-list",
        icon: FaShop,
      },
    ]
  },
  // {
  //   name: "Locations",
  //   href: "#",
  //   icon: CiLocationOn,
  //   subItems: [
  //     {
  //       name: "Add Location",
  //       href: "/admin/add-location",
  //       icon: MdOutlineAddLocationAlt,
  //     },
  //     {
  //       name: "All Location",
  //       href: "/admin/all-location",
  //       icon: GrMapLocation,
  //     },
  //   ],
  // },
  {
    name: "Orders",
    href: "/admin/order-list",
    icon: MdOutlinePayments
  },
  {
    name: "Manual Sales",
    href: "#",
    icon: GoPlusCircle,
    subItems: [
      
      {
        name: "Add Sales",
        href: "/admin/add-sales",
        icon: GoPlus,
      },
      {
        name: "Bulk Sales",
        href: "/admin/bulk-sales",
        icon: GoPlusCircle,
      },
      
      {
        name: "Sale List",
        href: '/admin/sale-list',
        icon: MdDetails
      },
      {
        name: "Sales Report",
        href: '/admin/sales-report',
        icon: GoReport,
      }
    ]
  },
  {
    name: "Expenses",
    href: "#",
    icon: GoPlusCircle,
    subItems: [
      
      {
        name: "Add Expense",
        href: "/admin/add-expense",
        icon: GoPlus,
      },
      {
        name: "Expense List",
        href: '/admin/expense-list',
        icon: MdDetails
      },
      {
        name: "Expenses Report",
        href: '/admin/expense-report',
        icon: GoReport,
      }
    ]
  },
  {
    name: "Blog",
    href: "#",
    icon: PiNewspaperThin,
    subItems: [
      { name: "Add Blogs", href: "/admin/add-blog", icon: GoPlus },
      { name: "All Blogs", href: "/admin/all-blog", icon: GiNewspaper },
    ],
  },
  {
    name: "Review",
    href: "/admin/reviews",
    icon: FaUsers,
  },
  {
    name: "Ledger",
    href: "/admin/ledger",
    icon: FaCalculator,
  },
  {
    name: "Customer List",
    href: "/admin/customer-list",
    icon: FaUsers,
  },
  // {
  //   name:"Shop Payment",
  //   href: "/admin/shop-payment",
  //   icon: MdOutlinePayments
  // },
  {
    name: "Profile",
    href: "/admin/admin-profile",
    icon: CiSettings
  },
  {
    name: "Password Change",
    href: "/admin/password",
    icon: CiSettings,
  }

];
