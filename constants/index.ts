import {
  HomeIcon,
  TicketIcon,
  UserIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOffice2Icon,
  FlagIcon,
  GlobeAltIcon,
  FilmIcon,
  LanguageIcon,
  TableCellsIcon,
  RectangleStackIcon,
  IdentificationIcon,
  BanknotesIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

export const ITEMS_PER_PAGE = 10;

export const navLinks = [
  {
    label: 'Home',
    route: '/',
    icon: HomeIcon,
  },
  {
    label: 'Films',
    route: '/film',
    icon: FilmIcon,
  },
  {
    label: 'Actors',
    route: '/actor',
    icon: TicketIcon,
  },
  {
    label: 'Categories',
    route: '/category',
    icon: TableCellsIcon,
  },
  {
    label: 'Languages',
    route: '/language',
    icon: LanguageIcon,
  },
  {
    label: 'Addresses',
    route: '/address',
    icon: MapPinIcon,
  },
  {
    label: 'Cities',
    route: '/city',
    icon: BuildingOffice2Icon,
  },
  {
    label: 'Countries',
    route: '/country',
    icon: FlagIcon,
  },
  {
    label: 'Customers',
    route: '/customer',
    icon: UserIcon,
  },

  {
    label: 'Inventory',
    route: '/inventory',
    icon: ClipboardDocumentListIcon,
  },
  {
    label: 'Payments',
    route: '/payment',
    icon: CurrencyDollarIcon,
  },
  // {
  //   label: 'Rentals',
  //   route: '/rental',
  //   icon: BanknotesIcon,
  // },
  {
    label: 'Staff',
    route: '/staff',
    icon: IdentificationIcon,
  },
  {
    label: 'Stores',
    route: '/store',
    icon: BuildingStorefrontIcon,
  },
];
