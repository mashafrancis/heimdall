import { clsx } from 'clsx'
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpDown,
  BarChart3,
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clipboard,
  Cloudy,
  Coffee,
  CreditCard,
  File,
  FileText,
  Globe,
  HelpCircle,
  Hexagon,
  Image as ImageIcon,
  KeyIcon,
  Layers,
  Layout,
  LayoutGrid,
  Loader2,
  LogOut,
  type LucideProps,
  MoreVertical,
  PieChart,
  Pizza,
  Plus,
  PlusCircle,
  Radio,
  RotateCw,
  Settings,
  Trash,
  Twitter,
  Users2,
  Wallet,
  Webhook,
  X,
} from 'lucide-react'

export interface ThemeSwitchProps extends LucideProps {
  resolvedTheme?: 'light' | 'dark'
}

const arrowRotationMap = {
  up: 'rotate-180',
  right: '-rotate-90',
  down: 'rotate-0',
  left: 'rotate-90',
  'top-right': '-rotate-135',
}

interface ArrowIconProps {
  direction: 'up' | 'right' | 'down' | 'left' | 'top-right'
  size?: number
  className?: string
}

export function ArrowIcon({
  direction,
  size = 32,
  className,
  ...props
}: ArrowIconProps) {
  return (
    <svg
      className={clsx(className, 'transform', arrowRotationMap[direction])}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.101 5.5V23.1094L9.40108 17.4095L8.14807 18.6619L15.9862 26.5L23.852 18.6342L22.5996 17.3817L16.8725 23.1094V5.5H15.101Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const Icons = {
  logo: ({ ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      fill="#0074a6"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        d="M96,96v64H40V40H160V96Zm64,0v64H96v56H216V96Z"
        opacity="0.2"
      ></path>
      <path d="M216,88H168V40a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8V160a8,8,0,0,0,8,8H88v48a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V96A8,8,0,0,0,216,88ZM48,152V48H152V88H96a8,8,0,0,0-8,8v56Zm104-48v48H104V104Zm56,104H104V168h56a8,8,0,0,0,8-8V104h40Z"></path>
    </svg>
  ),
  bell: Bell,
  clipboard: Clipboard,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  webhook: Webhook,
  page: File,
  media: ImageIcon,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  addCircle: PlusCircle,
  warning: AlertTriangle,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  cloudy: Cloudy,
  circle: Circle,
  home: LayoutGrid,
  reports: BarChart3,
  monitor: Globe,
  radio: Radio,
  reload: RotateCw,
  chart: PieChart,
  income: Wallet,
  expenses: Hexagon,
  investments: Coffee,
  balance: ArrowUpDown,
  subscriptions: Layers,
  layout: Layout,
  key: KeyIcon,
  logout: LogOut,
  arrowNext: ({ ...props }: LucideProps) => (
    <svg
      width="16"
      height="8"
      viewBox="0 0 16 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        id="Vector 1"
        d="M0 4H14M14 4L11.5 1M14 4L11.5 7"
        stroke="#212330"
        strokeWidth="2"
      />
    </svg>
  ),
  user: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="532"
      height="532"
      viewBox="0 0 532 532"
      {...props}
    >
      <g>
        <g>
          <circle cx="270.759" cy="260.92941" r="86.34897" fill="#a0616a" />
          <polygon
            points="199.2879 366.61365 217.2879 320.61365 310.2879 306.61365 320.28003 408.44043 226.28003 410.44043 199.2879 366.61365"
            fill="#a0616a"
          />
        </g>
        <path
          d="M357.94449,276.8613c-1.12067,4.48965-3.38602,15.17972-6.9238,15.23233-2.89023,.04208-5.65668-46.33466-2.76953-54.00568,3.31638-8.81271-5.39886-19.96062-11.96411-25.6832-11.80423-10.2894-38.00696,11.80466-64.65118,1.79587-.70633-.26482-.56558-.23502-8.97934-3.59174-25.88966-10.32974-27.2506-10.62788-28.73386-10.77521-12.55046-1.24167-27.86705,9.02844-34.12146,21.55038-6.50168,13.01653-1.06937,24.18106-7.18346,55.67184-.71246,3.67065-1.83138,8.90216-3.59174,8.97934-3.21819,.14029-6.3605-17.04846-7.18346-21.55038-3.44792-18.86186-6.7722-37.04675,0-57.46771,.73878-2.22729,5.29158-10.49458,14.36693-26.93799,13.0744-23.68825,19.65018-35.57709,21.55038-37.7132,13.62859-15.32624,38.43575-29.30734,59.26357-23.34626,10.52704,3.01299,8.63953,7.85691,21.55038,12.57105,23.00821,8.40057,43.00476-1.87303,46.69254,5.3876,1.9537,3.84602-3.51236,7.01686-3.59174,14.36693-.13593,12.6114,15.81424,16.25575,25.14212,28.73386,5.01447,6.70819,13.59753,6.78012-8.87228,96.78212l.00003,.00003Z"
          fill="#2f2e41"
        />
      </g>
      <path
        d="M464.92017,442.61035c-3.48022,3.91016-7.09009,7.74023-10.83008,11.48047-50.23999,50.23926-117.04004,77.90918-188.09009,77.90918-61.40991,0-119.63989-20.66992-166.75-58.71973-.03003-.01953-.05005-.04004-.07983-.07031-6.25-5.03906-12.30005-10.39941-18.14014-16.05957,.10986-.87988,.22998-1.75,.35986-2.61035,.82007-5.7998,1.73022-11.33008,2.75-16.41992,8.3501-41.71973,118.22021-85.51953,121.08008-86.66016,.04004-.00977,.06006-.01953,.06006-.01953,0,0,14.14014,52.12012,74.72998,51.4502,41.27002-.4502,33.27002-51.4502,33.27002-51.4502,0,0,.5,.09961,1.43994,.2998,11.91992,2.53027,94.68018,20.70996,127.33008,45.52051,9.94995,7.55957,17.08984,23.66016,22.21997,42.85938,.21997,.82031,.42993,1.66016,.65015,2.49023Z"
        fill="#a0a0a0"
      />
      <path
        d="M454.09009,77.91016C403.8501,27.6709,337.05005,0,266,0S128.15015,27.6709,77.90991,77.91016C27.67017,128.15039,0,194.9502,0,266c0,64.85059,23.05005,126.16016,65.29004,174.57031,4.03003,4.62988,8.23999,9.13965,12.61987,13.52051,1.03003,1.0293,2.07007,2.05957,3.12012,3.05957,5.84009,5.66016,11.89014,11.02051,18.14014,16.05957,.02979,.03027,.0498,.05078,.07983,.07031,47.11012,38.0498,105.3401,58.71973,166.75001,58.71973,71.05005,0,137.8501-27.66992,188.09009-77.90918,3.73999-3.74023,7.34985-7.57031,10.83008-11.48047,43.36987-48.71973,67.07983-110.83984,67.07983-176.61035,0-71.0498-27.66992-137.84961-77.90991-188.08984Zm10.17993,362.20996c-7.86987,8.9502-16.33008,17.37012-25.33008,25.18066-17.06982,14.84961-36.06982,27.5293-56.55981,37.62988-7.19019,3.5498-14.56006,6.7793-22.1001,9.66992-29.29004,11.24023-61.08008,17.39941-94.28003,17.39941-32.04004,0-62.76001-5.73926-91.18994-16.23926-11.67017-4.30078-22.94995-9.41016-33.78003-15.26074-1.59009-.85938-3.16992-1.72949-4.73999-2.61914-8.26001-4.68066-16.25-9.79004-23.91992-15.31055-10.98999-7.87988-21.3501-16.58984-30.98022-26.03027-5.3999-5.29004-10.55981-10.7998-15.48975-16.5293C26.09009,391.77051,2,331.65039,2,266,2,120.43066,120.42993,2,266,2s264,118.43066,264,264c0,66.66016-24.82983,127.62012-65.72998,174.12012Z"
        fill="#3f3d56"
      />
    </svg>
  ),
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 186.69 190.5"
      {...props}
    >
      <g transform="translate(1184.583 765.171)">
        <path
          clipPath="none"
          mask="none"
          d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
          fill="#4285f4"
        />
        <path
          clipPath="none"
          mask="none"
          d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
          fill="#34a853"
        />
        <path
          clipPath="none"
          mask="none"
          d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
          fill="#fbbc05"
        />
        <path
          d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
          fill="#ea4335"
          clipPath="none"
          mask="none"
        />
      </g>
    </svg>
  ),
  themeSwitch: ({ resolvedTheme, ...props }: ThemeSwitchProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-5 w-5 text-gray-800 dark:text-gray-200"
      {...props}
    >
      {resolvedTheme === 'dark' ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      )}
    </svg>
  ),
  twitter: Twitter,
  check: Check,
  users: Users2,
  frequency: ({ ...props }: LucideProps) => (
    <svg
      id="root"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      {...props}
    >
      <circle cx="8.00039" cy="8.00039" r="1.6" fill="#646E87" />
      <circle cx="8" cy="8" r="7.5" stroke="#D5D9E3" />
      <circle cx="8.0002" cy="8.0002" r="4.3" stroke="#939DB8" />
    </svg>
  ),
  wordpress: ({ ...props }: LucideProps) => {
    return (
      <svg
        {...props}
        width={20}
        height={20}
        fill="#000000"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        enableBackground="new 0 0 512 512"
        xmlSpace="preserve"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <g>
            {' '}
            <path d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472 c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"></path>{' '}
            <path d="M128,256c0,50.625,29.438,94.438,72.156,115.156l-61.078-167.25C131.969,219.828,128,237.438,128,256z"></path>{' '}
            <path d="M258.266,267.203l-38.422,111.594c11.469,3.359,23.594,5.203,36.172,5.203c14.891,0,29.188-2.594,42.5-7.281 c-0.344-0.547-0.656-1.094-0.906-1.75L258.266,267.203z"></path>{' '}
            <path d="M342.406,249.547c0-15.828-5.688-26.797-10.547-35.312c-6.484-10.547-12.562-19.453-12.562-30.016 c0-11.766,8.906-22.703,21.5-22.703c0.547,0,1.094,0.062,1.641,0.109C319.672,140.75,289.344,128,256.016,128 c-44.734,0-84.078,22.953-106.953,57.688c3,0.109,5.828,0.172,8.234,0.172c13.391,0,34.141-1.641,34.141-1.641 c6.875-0.391,7.688,9.719,0.781,10.562c0,0-6.906,0.797-14.656,1.219l46.625,138.625l28.016-84L232.25,196 c-6.891-0.422-13.422-1.219-13.422-1.219c-6.891-0.422-6.078-10.953,0.828-10.562c0,0,21.125,1.641,33.703,1.641 c13.375,0,34.125-1.641,34.125-1.641c6.891-0.391,7.703,9.719,0.797,10.562c0,0-6.906,0.797-14.641,1.219l46.266,137.562 l12.766-42.656C339.156,274.281,342.406,260.5,342.406,249.547z"></path>{' '}
            <path d="M369.203,207.766c0,12.969-2.438,27.562-9.75,45.828l-39.078,113.031C358.406,344.438,384,303.219,384,256 c0-22.266-5.672-43.172-15.672-61.422C368.875,198.688,369.203,203.047,369.203,207.766z"></path>{' '}
          </g>{' '}
        </g>
      </svg>
    )
  },
  teams: ({ ...props }: LucideProps) => (
    <svg
      fill="#000000"
      {...props}
      className=" h-5 w-5 fill-black dark:fill-white"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M824.2 699.9a301.55 301.55 0 0 0-86.4-60.4C783.1 602.8 812 546.8 812 484c0-110.8-92.4-201.7-203.2-200-109.1 1.7-197 90.6-197 200 0 62.8 29 118.8 74.2 155.5a300.95 300.95 0 0 0-86.4 60.4C345 754.6 314 826.8 312 903.8a8 8 0 0 0 8 8.2h56c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5A226.62 226.62 0 0 1 612 684c60.9 0 118.2 23.7 161.3 66.8C814.5 792 838 846.3 840 904.3c.1 4.3 3.7 7.7 8 7.7h56a8 8 0 0 0 8-8.2c-2-77-33-149.2-87.8-203.9zM612 612c-34.2 0-66.4-13.3-90.5-37.5a126.86 126.86 0 0 1-37.5-91.8c.3-32.8 13.4-64.5 36.3-88 24-24.6 56.1-38.3 90.4-38.7 33.9-.3 66.8 12.9 91 36.6 24.8 24.3 38.4 56.8 38.4 91.4 0 34.2-13.3 66.3-37.5 90.5A127.3 127.3 0 0 1 612 612zM361.5 510.4c-.9-8.7-1.4-17.5-1.4-26.4 0-15.9 1.5-31.4 4.3-46.5.7-3.6-1.2-7.3-4.5-8.8-13.6-6.1-26.1-14.5-36.9-25.1a127.54 127.54 0 0 1-38.7-95.4c.9-32.1 13.8-62.6 36.3-85.6 24.7-25.3 57.9-39.1 93.2-38.7 31.9.3 62.7 12.6 86 34.4 7.9 7.4 14.7 15.6 20.4 24.4 2 3.1 5.9 4.4 9.3 3.2 17.6-6.1 36.2-10.4 55.3-12.4 5.6-.6 8.8-6.6 6.3-11.6-32.5-64.3-98.9-108.7-175.7-109.9-110.9-1.7-203.3 89.2-203.3 199.9 0 62.8 28.9 118.8 74.2 155.5-31.8 14.7-61.1 35-86.5 60.4-54.8 54.7-85.8 126.9-87.8 204a8 8 0 0 0 8 8.2h56.1c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5 29.4-29.4 65.4-49.8 104.7-59.7 3.9-1 6.5-4.7 6-8.7z"></path>{' '}
      </g>
    </svg>
  ),
  typescript: () => (
    <svg
      viewBox="0 0 32 32"
      className="h-4 w-4 fill-black dark:fill-white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path d="M0 16v16h32v-32h-32zM25.786 14.724c0.813 0.203 1.432 0.568 2.005 1.156 0.292 0.312 0.729 0.885 0.766 1.026 0.010 0.042-1.38 0.974-2.224 1.495-0.031 0.021-0.156-0.109-0.292-0.313-0.411-0.599-0.844-0.859-1.505-0.906-0.969-0.063-1.594 0.443-1.589 1.292-0.005 0.208 0.042 0.417 0.135 0.599 0.214 0.443 0.615 0.708 1.854 1.245 2.292 0.984 3.271 1.635 3.88 2.557 0.682 1.031 0.833 2.677 0.375 3.906-0.51 1.328-1.771 2.234-3.542 2.531-0.547 0.099-1.849 0.083-2.438-0.026-1.286-0.229-2.505-0.865-3.255-1.698-0.297-0.323-0.87-1.172-0.833-1.229 0.016-0.021 0.146-0.104 0.292-0.188s0.682-0.396 1.188-0.688l0.922-0.536 0.193 0.286c0.271 0.411 0.859 0.974 1.214 1.161 1.021 0.542 2.422 0.464 3.115-0.156 0.281-0.234 0.438-0.594 0.417-0.958 0-0.37-0.047-0.536-0.24-0.813-0.25-0.354-0.755-0.656-2.198-1.281-1.651-0.714-2.365-1.151-3.010-1.854-0.406-0.464-0.708-1.010-0.88-1.599-0.12-0.453-0.151-1.589-0.057-2.042 0.339-1.599 1.547-2.708 3.281-3.036 0.563-0.109 1.875-0.068 2.427 0.068zM18.276 16.063l0.010 1.307h-4.167v11.839h-2.948v-11.839h-4.161v-1.281c0-0.714 0.016-1.307 0.036-1.323 0.016-0.021 2.547-0.031 5.62-0.026l5.594 0.016z"></path>{' '}
      </g>
    </svg>
  ),
  javascript: () => (
    <svg
      fill="#fff"
      className="h-4 w-4 fill-black dark:fill-white"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path d="M0 0h32v32h-32zM29.38 24.37c-0.234-1.464-1.188-2.688-4.005-3.833-0.979-0.458-2.073-0.781-2.396-1.521-0.12-0.438-0.141-0.677-0.063-0.938 0.203-0.865 1.219-1.12 2.021-0.88 0.521 0.161 1 0.557 1.302 1.198 1.38-0.901 1.38-0.901 2.339-1.5-0.359-0.557-0.536-0.802-0.781-1.036-0.839-0.943-1.958-1.422-3.776-1.38l-0.943 0.12c-0.901 0.219-1.76 0.698-2.281 1.339-1.516 1.719-1.078 4.719 0.76 5.964 1.818 1.359 4.479 1.656 4.823 2.938 0.318 1.563-1.161 2.063-2.625 1.88-1.078-0.24-1.677-0.781-2.339-1.781l-2.438 1.401c0.276 0.641 0.599 0.917 1.078 1.479 2.318 2.339 8.12 2.219 9.161-1.339 0.036-0.12 0.318-0.943 0.099-2.198zM17.401 14.708h-2.995c0 2.583-0.016 5.151-0.016 7.74 0 1.641 0.083 3.151-0.182 3.615-0.443 0.917-1.573 0.802-2.089 0.641-0.526-0.26-0.797-0.62-1.104-1.141-0.089-0.141-0.151-0.26-0.172-0.26l-2.432 1.5c0.406 0.839 1 1.563 1.766 2.021 1.141 0.682 2.672 0.901 4.276 0.542 1.042-0.302 1.943-0.922 2.411-1.88 0.682-1.24 0.536-2.76 0.531-4.464 0.016-2.74 0-5.479 0-8.24z"></path>{' '}
      </g>
    </svg>
  ),
  htmlLogo: () => (
    <svg
      className="h-4 w-4 fill-black dark:fill-white"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M6.32 5.5l1.759 19.774 7.893 2.226 7.948-2.226L25.68 5.5H6.32zm15.537 6.449H12.59l.207 2.488h8.854l-.687 7.479-4.937 1.361v.014h-.055l-4.978-1.375-.303-3.821h2.406l.179 1.925 2.695.728 2.708-.728.303-3.136h-8.415l-.645-7.341h12.155l-.22 2.406z"></path>
      </g>
    </svg>
  ),
}
