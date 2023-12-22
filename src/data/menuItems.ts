import { IMenuItem } from "@app/types/appTypes";

export const marineMenuItemsNested: IMenuItem[] = [
  {
    title: "Underwriting",
    icon: "la:edit-solid",
    items: [
      {
        title: "Marine",
        items: [
          {
            title: "Single Transit Policies",
            path: "/private/marine/underwriting/single_transit_policies",
          },
          {
            title: "Open Cover Policies",
            path: "/private/marine/underwriting/open_cover_policies",
          },
        ],
      },
      { title: "Fire", path: "/private/fire/policies" },
    ],
  },
  {
    title: "Reporting",
    icon: "carbon:report-data",
    items: [
      {
        title: "Marine",
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
      {
        title: "Fire",
        items: [
          {
            title: "Active Policies",
            path: "/private/fire/reporting/active_policies",
          },
          {
            title: "Revoked Policies",
            path: "/private/fire/reporting/revoked_policies",
          },
        ],
      },
      {
        title: "Motor",
        items: [
          {
            title: "Pending Policies",
            path: "/private/motor/reporting/pending_policies",
          },
          {
            title: "Approved Policies",
            path: "/private/motor/reporting/approved_policies",
          },
          {
            title: "Cancelled Policies",
            path: "/private/motor/reporting/cancelled_policies",
          },
        ],
      },
    ],
  },
];

export const marineMenuItems: IMenuItem[] = [
  {
    title: "Dashboard",
    path: "/private/marine/dashboard",
    icon: "iconoir:dashboard-dots",
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
        title: "Open Cover Policies",
        path: "/private/marine/underwriting/open_cover_policies",
      },
    ],
  },
  {
    title: "Reporting",
    icon: "carbon:report-data",
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
];

export const marineSettings: IMenuItem[] = [
  {
    title: "Marine",
    icon: "iconamoon:settings-thin",
    items: [
      {
        title: "Ratings",
        path: "/private/marine/settings/ratings",
      },
      {
        title: "Interests",
        path: "/private/marine/settings/interests",
      },
      {
        title: "Cover Types",
        path: "/private/marine/settings/cover_types",
      },
      {
        title: "Policy Extensions",
        path: "/private/marine/settings/policy_extensions",
      },
      { title: "Ports", path: "/private/marine/settings/ports" },
      {
        title: "Shipping Types",
        path: "/private/marine/settings/shipping_types",
      },
      {
        title: "Carriers",
        path: "/private/marine/settings/carriers",
      },
      {
        title: "Exchange Rates",
        path: "/private/marine/settings/exchange_rates",
      },
    ],
  },
];

export const fireMenuItems: IMenuItem[] = [
  {
    title: "Dashboard",
    path: "/private/fire/dashboard",
    icon: "iconoir:dashboard-dots",
  },
  {
    title: "Policies",
    icon: "la:edit-solid",
    path: "/private/fire/policies",
  },
  {
    title: "Reporting",
    icon: "carbon:report-data",
    items: [
      {
        title: "Active Policies",
        path: "/private/fire/reporting/active_policies",
      },
      {
        title: "Revoked Policies",
        path: "/private/fire/reporting/revoked_policies",
      },
    ],
  },
];

export const fireSettings: IMenuItem[] = [
  {
    title: "Fire",
    icon: "iconamoon:settings-thin",
    items: [
      {
        title: "Risk Classes",
        path: "/private/fire/settings/risk_classes",
      },
      {
        title: "Peril Classes",
        path: "/private/fire/settings/peril_classes",
      },
      {
        title: "Peril Rating",
        path: "/private/fire/settings/peril_rating",
      },
      {
        title: "Excess Rates",
        path: "/private/fire/settings/excess_rates",
      },
      { title: "Excesses", path: "/private/fire/settings/excesses" },
      {
        title: "Discount Rate",
        path: "/private/fire/settings/discount_rate",
      },
      {
        title: "Discounts",
        path: "/private/fire/settings/discounts",
      },
      {
        title: "Exchange Rate",
        path: "/private/fire/settings/exchange_rate",
      },
    ],
  },
];

export const motorMenuItems: IMenuItem[] = [
  {
    title: "Dashboard",
    path: "/private/motor/dashboard",
    icon: "iconoir:dashboard-dots",
  },
  {
    title: "Policies",
    icon: "la:edit-solid",
    items: [
      {
        title: "Underwrite",
        path: "/private/motor/policies",
      },
      {
        title: "All NCD",
        path: "/private/motor/policies/ncd",
      },
    ],
  },
  {
    title: "Endorsement",
    icon: "la:edit-solid",
    items: [
      {
        title: "Add Endorsement",
        path: "/private/motor/policies/endorsement/new",
      },
      {
        title: "All Endorsements",
        path: "/private/motor/policies/endorsement",
      },
    ],
  },

  {
    title: "Reporting",
    icon: "carbon:report-data",
    items: [
      {
        title: "Pending Policies",
        path: "/private/motor/reporting/pending_policies",
      },
      {
        title: "Approved Policies",
        path: "/private/motor/reporting/approved_policies",
      },
      {
        title: "Cancelled Policies",
        path: "/private/motor/reporting/cancelled_policies",
      },
    ],
  },
  {
    title: "Tarrifs",
    icon: "la:edit-solid",
    items: [
      {
        title: "Add Tarrif",
        path: "/private/motor/tarrifs/add",
      },
      {
        title: "All Tarrifs",
        path: "/private/motor/tarrifs/list",
      },
    ],
  },
];

export const generalMenuItems: IMenuItem[] = [
  {
    title: "Customer Mgt.",
    icon: "streamline:information-desk-customer",
    items: [
      {
        title: "Customers",
        path: "/private/general/customer_mgt/customers",
      },
      {
        title: "Customer Categories",
        path: "/private/general/customer_mgt/customer_categories",
      },
      {
        title: "Customer Types",
        path: "/private/general/customer_mgt/customer_types",
      },
      {
        title: "Identification Types",
        path: "/private/general/customer_mgt/identification_types",
      },
      {
        title: "Occupations",
        path: "/private/general/customer_mgt/occupations",
      },
    ],
  },
  {
    title: "User Management",
    icon: "fluent:people-20-regular",
    items: [
      { title: "Users", path: "/private/general/user_management/users" },
      { title: "Roles", path: "/private/general/user_management/roles" },
      {
        title: "Permissions",
        path: "/private/general/user_management/permissions",
      },
    ],
  },
  {
    title: "Institution Mgt.",
    icon: "carbon:building",
    items: [
      {
        title: "Institutions",
        path: "/private/general/institution_mgt/institutions",
      },
      {
        title: "Branches",
        path: "/private/general/institution_mgt/branches",
      },
      {
        title: "Institution Types",
        path: "/private/general/institution_mgt/institution_types",
      },
    ],
  },
  {
    title: "Utilities",
    icon: "fluent:data-usage-settings-20-regular",
    items: [
      {
        title: "Countries",
        path: "/private/general/utilities/countries",
      },
      {
        title: "Currencies",
        path: "/private/general/utilities/currencies",
      },
      { title: "Banks", path: "/private/general/utilities/banks" },
      {
        title: "Financial Interest",
        path: "/private/general/utilities/financial_interest",
      },
    ],
  },
  // {
  //   title: "Settings",
  //   icon: "clarity:cog-line",
  //   items: [
  //     {
  //       title: "Marine",
  //       items: [
  //         {
  //           title: "Ratings",
  //           path: "/private/general/settings/ratings",
  //         },
  //         {
  //           title: "Interests",
  //           path: "/private/general/settings/interests",
  //         },
  //         {
  //           title: "Cover Types",
  //           path: "/private/general/settings/cover_types",
  //         },
  //         {
  //           title: "Policy Extensions",
  //           path: "/private/general/settings/policy_extensions",
  //         },
  //         { title: "Ports", path: "/private/general/settings/ports" },
  //         {
  //           title: "Shipping Types",
  //           path: "/private/general/settings/shipping_types",
  //         },
  //         {
  //           title: "Carriers",
  //           path: "/private/general/settings/carriers",
  //         },
  //         {
  //           title: "Countries",
  //           path: "/private/general/settings/countries",
  //         },
  //         {
  //           title: "Exchange Rates",
  //           path: "/private/general/settings/exchange_rates",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Fire",
  //       items: [
  //         {
  //           title: "Risk Classes",
  //           path: "/private/general/settings/risk_classes",
  //         },
  //         {
  //           title: "Peril Classes",
  //           path: "/private/general/settings/peril_classes",
  //         },
  //         {
  //           title: "Peril Rating",
  //           path: "/private/general/settings/peril_rating",
  //         },
  //         {
  //           title: "Excess Rates",
  //           path: "/private/general/settings/excess_rates",
  //         },
  //         { title: "Excesses", path: "/private/general/settings/excesses" },
  //         {
  //           title: "Discount Rate",
  //           path: "/private/general/settings/discount_rate",
  //         },
  //         {
  //           title: "Discounts",
  //           path: "/private/general/settings/discounts",
  //         },
  //         {
  //           title: "Exchange Rate",
  //           path: "/private/general/settings/exchange_rate",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
