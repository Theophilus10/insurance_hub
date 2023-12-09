export const marineMenuItems = [
  {
    title: "Basics",
    menus: [
      {
        title: "Dashboard",
        icon: "radix-icons:dashboard",
        path: "/private/marine/dashboard",
      },
      {
        title: "Underwriting",
        icon: "la:edit-solid",
        items: [
          {
            title: "Single Transit Policies",
            path: "/private/marine/underwriting/single_transit_policies",
          },
          {
            title: "Double Cover Policies",
            path: "/private/marine/underwriting/double_cover_policies",
          },
        ],
      },
      {
        title: "Reporting",
        icon: "carbon:report",
        items: [
          {
            title: "Pending Policies",
            path: "/private/marine/reporting/pending_policies",
          },
          {
            title: "Approved Policies",
            path: "/private/marine/reporting/approved_policies",
          },
          {
            title: "Cancelled Policies",
            path: "/private/marine/reporting/cancelled_policies",
          },
        ],
      },
    ],
  },

  {
    title: "System Setups",
    menus: [
      {
        title: "Agents",
        icon: "material-symbols-light:real-estate-agent-outline-sharp",
        path: "/private/marine/agents",
      },
      {
        title: "Customer Mgt.",
        icon: "streamline:information-desk-customer",
        items: [
          {
            title: "Customers",
            path: "/private/marine/customer_mgt/customers",
          },
          {
            title: "Customer Categories",
            path: "/private/marine/customer_mgt/customer_categories",
          },
          {
            title: "Customer Types",
            path: "/private/marine/customer_mgt/customer_types",
          },
          {
            title: "Identification Types",
            path: "/private/marine/customer_mgt/identification_types",
          },
          {
            title: "Occupations",
            path: "/private/marine/customer_mgt/occupations",
          },
        ],
      },
      {
        title: "User Management",
        icon: "fluent:people-20-regular",
        items: [
          { title: "Users", path: "/private/marine/user_management/users" },
          { title: "Roles", path: "/private/marine/user_management/roles" },
          {
            title: "Permissions",
            path: "/private/marine/user_management/permissions",
          },
        ],
      },
      {
        title: "Institution Mgt.",
        icon: "pixelarticons:buildings",
        items: [
          {
            title: "Institutions",
            path: "/private/marine/institution_mgt/institutions",
          },
          {
            title: "Institution Types",
            path: "/private/marine/institution_mgt/institution_types",
          },
        ],
      },
      {
        title: "General",
        icon: "clarity:cog-line",
        items: [
          {
            title: "Ratings",
            path: "/private/marine/general/ratings",
          },
          { title: "Interests", path: "/private/marine/general/interests" },
          { title: "Cover Types", path: "/private/marine/general/cover_types" },
          {
            title: "Policy Extensions",
            path: "/private/marine/general/policy_extensions",
          },
          { title: "Ports", path: "/private/marine/general/ports" },
          {
            title: "Shipping Types",
            path: "/private/marine/general/shipping_types",
          },
          { title: "Carriers", path: "/private/marine/general/carriers" },
          { title: "Countries", path: "/private/marine/general/countries" },
          {
            title: "Exchange Rates",
            path: "/private/marine/general/exchange_rates",
          },
          { title: "Currencies", path: "/private/marine/general/currencies" },
          { title: "Banks", path: "/private/marine/general/banks" },
          {
            title: "Financial Interest",
            path: "/private/marine/general/financial_interest",
          },
        ],
      },
    ],
  },
];

export const fireMenuItems = [
  {
    title: "Basics",
    menus: [
      // {
      //   title: "Dashboard",
      //   icon: "radix-icons:dashboard",
      //   path: "/private/marine/dashboard",
      // },
      {
        title: "Policies",
        icon: "la:edit-solid",
        path: '/private/fire/policies'
        // items: [
        //   {
        //     title: "Single Transit Policies",
        //     path: "/private/marine/underwriting/single_transit_policies",
        //   },
        //   {
        //     title: "Double Cover Policies",
        //     path: "/private/marine/underwriting/double_cover_policies",
        //   },
        // ],
      },
      {
        title: "Reporting",
        icon: "carbon:report",
        items: [
          {
            title: "Active Policies",
            path: "/private/fire/reporting/active_policies",
          },
          {
            title: "Revoked Policies",
            path: "/private/fire/reporting/revoked_policies",
          },
          // {
          //   title: "Cancelled Policies",
          //   path: "/private/marine/reporting/cancelled_policies",
          // },
        ],
      },
    ],
  },

  {
    title: "System Setups",
    menus: [
      // {
      //   title: "Agents",
      //   icon: "material-symbols-light:real-estate-agent-outline-sharp",
      //   path: "/private/marine/agents",
      // },
      {
        title: "Customer Mgt.",
        icon: "streamline:information-desk-customer",
        items: [
          {
            title: "Customers",
            path: "/private/fire/customer_mgt/customers",
          },
          {
            title: "Customer Categories",
            path: "/private/fire/customer_mgt/customer_categories",
          },
          {
            title: "Customer Types",
            path: "/private/fire/customer_mgt/customer_types",
          },
          {
            title: "Identification Types",
            path: "/private/fire/customer_mgt/identification_types",
          },
          {
            title: "Occupations",
            path: "/private/fire/customer_mgt/occupations",
          },
        ],
      },
      {
        title: "User Management",
        icon: "fluent:people-20-regular",
        items: [
          { title: "Users", path: "/private/fire/user_management/users" },
          { title: "Roles", path: "/private/fire/user_management/roles" },
          {
            title: "Permissions",
            path: "/private/fire/user_management/permissions",
          },
        ],
      },
      {
        title: "Institution Mgt.",
        icon: "pixelarticons:buildings",
        items: [
          {
            title: "Institutions",
            path: "/private/fire/institution_mgt/institutions",
          },
          {
            title: "Institution Types",
            path: "/private/fire/institution_mgt/institution_types",
          },
        ],
      },
      {
        title: "General",
        icon: "clarity:cog-line",
        items: [
          {
            title: "Ratings",
            path: "/private/marine/general/ratings",
          },
          { title: "Risk  Classes", path: "/private/marine/general/interests" },
          { title: "Peril Classes", path: "/private/marine/general/cover_types" },
          {
            title: "Peril Rating",
            path: "/private/marine/general/policy_extensions",
          },
          { title: "Excess Rating", path: "/private/marine/general/ports" },
          {
            title: "Excesses",
            path: "/private/marine/general/shipping_types",
          },
          { title: "Discounts Rate", path: "/private/marine/general/carriers" },
          { title: "Discounts", path: "/private/marine/general/countries" },
          {
            title: "Exchange Rates",
            path: "/private/marine/general/exchange_rates",
          },
          { title: "Currencies", path: "/private/marine/general/currencies" },
          { title: "Banks", path: "/private/marine/general/banks" },
          {
            title: "Financial Interest",
            path: "/private/marine/general/financial_interest",
          },
        ],
      },
    ],
  },
];