import {
  HomeIcon,
  TicketIcon,
  UserIcon,
  MapPinIcon,
  ArchiveBoxIcon,
  BuildingOffice2Icon,
  FlagIcon,
  GlobeAltIcon,
  FilmIcon,
  LanguageIcon,
  TableCellsIcon,
  RectangleStackIcon,
  IdentificationIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

export const ITEMS_PER_PAGE = 10;

export const navLinks = [
  {
    label: 'Home',
    route: '/',
    icon: HomeIcon,
  },
  {
    label: 'Actors',
    route: '/actor',
    icon: TicketIcon,
  },
  {
    label: 'Addresses',
    route: '/address',
    icon: MapPinIcon,
  },
  {
    label: 'Categories',
    route: '/category',
    icon: TableCellsIcon,
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
    label: 'Films',
    route: '/film',
    icon: FilmIcon,
  },
  {
    label: 'Inventory',
    route: '/inventory',
    icon: RectangleStackIcon,
  },
  {
    label: 'Languages',
    route: '/language',
    icon: LanguageIcon,
  },
  {
    label: 'Rentals',
    route: '/rental',
    icon: BanknotesIcon,
  },
  {
    label: 'Staff',
    route: '/staff',
    icon: IdentificationIcon,
  },
];
