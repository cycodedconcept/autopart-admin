import { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
  className?: string;
}

export const BrowserBotIcon = ({
  color = "#525866",
  size = 20,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      opacity="0.4"
      d="M2.28796 8.125H17.7115C18.1001 8.125 18.2945 8.125 18.4165 8.24656C18.5385 8.36814 18.539 8.56139 18.5403 8.94781C18.5414 9.26873 18.5414 9.60339 18.5414 9.95239V10.0476C18.5414 11.8732 18.5414 13.3071 18.3909 14.4266C18.2366 15.5739 17.9141 16.4841 17.199 17.1992C16.4838 17.9144 15.5735 18.2369 14.4264 18.3911C13.3069 18.5417 11.873 18.5416 10.0474 18.5416H9.95201C8.12643 18.5416 6.69255 18.5417 5.57303 18.3911C4.42582 18.2369 3.51561 17.9144 2.80044 17.1992C2.08528 16.4841 1.76275 15.5739 1.60851 14.4266C1.458 13.3071 1.45801 11.8732 1.45801 10.0476V9.95231C1.45801 9.60348 1.45801 9.26873 1.45906 8.94781C1.46032 8.56139 1.46096 8.36814 1.58291 8.24656C1.70486 8.125 1.89923 8.125 2.28796 8.125Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.95216 1.45801H10.0474C11.8729 1.458 13.3069 1.45799 14.4264 1.60851C15.5736 1.76275 16.4839 2.08527 17.1991 2.80044C17.9142 3.51561 18.2367 4.42581 18.391 5.57303C18.4096 5.71166 18.4259 5.85512 18.4402 6.00356C18.4786 6.40226 18.4979 6.60161 18.3739 6.73815C18.2499 6.87468 18.0423 6.87468 17.6272 6.87468H2.37238C1.95726 6.87468 1.74971 6.87468 1.6257 6.73815C1.5017 6.60161 1.52091 6.40226 1.55936 6.00355C1.57366 5.85512 1.58999 5.71166 1.60863 5.57303C1.76287 4.42581 2.0854 3.51561 2.80056 2.80044C3.51573 2.08527 4.42594 1.76275 5.57316 1.60851C6.69266 1.45799 8.12657 1.458 9.95216 1.45801ZM5.82552 3.33301C5.36529 3.33301 4.99219 3.70611 4.99219 4.16635C4.99219 4.62658 5.36529 4.99967 5.82552 4.99967H5.83301C6.29325 4.99967 6.66635 4.62658 6.66635 4.16635C6.66635 3.70611 6.29325 3.33301 5.83301 3.33301H5.82552ZM8.32552 4.16635C8.32552 3.70611 8.69858 3.33301 9.15883 3.33301H9.16633C9.62658 3.33301 9.99966 3.70611 9.99966 4.16635C9.99966 4.62658 9.62658 4.99967 9.16633 4.99967H9.15883C8.69858 4.99967 8.32552 4.62658 8.32552 4.16635Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.45801 15.4167C6.45801 13.4607 8.04367 11.875 9.99968 11.875C11.9557 11.875 13.5414 13.4607 13.5414 15.4167C13.5414 15.7618 13.8212 16.0417 14.1664 16.0417C14.5115 16.0417 14.7914 15.7618 14.7914 15.4167C14.7914 12.7703 12.646 10.625 9.99968 10.625C7.35331 10.625 5.20801 12.7703 5.20801 15.4167C5.20801 15.7618 5.48784 16.0417 5.83301 16.0417C6.17819 16.0417 6.45801 15.7618 6.45801 15.4167ZM11.0309 14.4361C11.275 14.192 11.275 13.7962 11.0309 13.5522C10.7868 13.3082 10.391 13.3082 10.1469 13.5522L8.96843 14.7308C8.72435 14.9748 8.72435 15.3705 8.96843 15.6146C9.21251 15.8587 9.60826 15.8587 9.85226 15.6146L11.0309 14.4361Z"
      fill={color}
    />
  </svg>
);

export const BarChartIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M11.25 12.5V6.25"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 12.5V2.5"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.75 12.5V8.75"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UsersIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M10 13.125V11.875C10 11.212 9.73661 10.5761 9.26777 10.1072C8.79893 9.63839 8.16304 9.375 7.5 9.375H3.75C3.08696 9.375 2.45107 9.63839 1.98223 10.1072C1.51339 10.5761 1.25 11.212 1.25 11.875V13.125"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.625 6.875C7.00571 6.875 8.125 5.75571 8.125 4.375C8.125 2.99429 7.00571 1.875 5.625 1.875C4.24429 1.875 3.125 2.99429 3.125 4.375C3.125 5.75571 4.24429 6.875 5.625 6.875Z"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.75 13.1248V11.8748C13.7496 11.3209 13.5652 10.7828 13.2259 10.345C12.8865 9.90722 12.4113 9.59453 11.875 9.45605"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 1.95605C10.5378 2.09374 11.0144 2.40649 11.3548 2.845C11.6952 3.2835 11.8799 3.82282 11.8799 4.37793C11.8799 4.93304 11.6952 5.47235 11.3548 5.91086C11.0144 6.34937 10.5378 6.66212 10 6.7998"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ShieldCheckIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M12.5 8.12528C12.5 11.2503 10.3125 12.8128 7.7125 13.719C7.57635 13.7652 7.42846 13.763 7.29375 13.7128C4.6875 12.8128 2.5 11.2503 2.5 8.12528V3.75028C2.5 3.58452 2.56585 3.42555 2.68306 3.30834C2.80027 3.19113 2.95924 3.12528 3.125 3.12528C4.375 3.12528 5.9375 2.37528 7.025 1.42528C7.15741 1.31216 7.32585 1.25 7.5 1.25C7.67415 1.25 7.84259 1.31216 7.975 1.42528C9.06875 2.38153 10.625 3.12528 11.875 3.12528C12.0408 3.12528 12.1997 3.19113 12.3169 3.30834C12.4342 3.42555 12.5 3.58452 12.5 3.75028V8.12528Z"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.625 7.5L6.875 8.75L9.375 6.25"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ProhibitedIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75Z"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.0625 3.0625L11.9375 11.9375"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TagIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M7.86625 1.61625C7.63188 1.38181 7.31399 1.25007 6.9825 1.25H2.5C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V6.9825C1.25007 7.31399 1.38181 7.63188 1.61625 7.86625L7.05625 13.3063C7.34032 13.5885 7.72453 13.747 8.125 13.747C8.52547 13.747 8.90968 13.5885 9.19375 13.3063L13.3063 9.19375C13.5885 8.90968 13.747 8.52547 13.747 8.125C13.747 7.72453 13.5885 7.34032 13.3063 7.05625L7.86625 1.61625Z"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.6875 5C4.86009 5 5 4.86009 5 4.6875C5 4.51491 4.86009 4.375 4.6875 4.375C4.51491 4.375 4.375 4.51491 4.375 4.6875C4.375 4.86009 4.51491 5 4.6875 5Z"
      fill={color}
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ShoppingCartIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M5 13.75C5.34518 13.75 5.625 13.4702 5.625 13.125C5.625 12.7798 5.34518 12.5 5 12.5C4.65482 12.5 4.375 12.7798 4.375 13.125C4.375 13.4702 4.65482 13.75 5 13.75Z"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.875 13.75C12.2202 13.75 12.5 13.4702 12.5 13.125C12.5 12.7798 12.2202 12.5 11.875 12.5C11.5298 12.5 11.25 12.7798 11.25 13.125C11.25 13.4702 11.5298 13.75 11.875 13.75Z"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.28125 1.28125H2.53125L4.19375 9.04375C4.25474 9.32804 4.41292 9.58217 4.64107 9.76241C4.86922 9.94265 5.15307 10.0377 5.44375 10.0312H11.5563C11.8407 10.0308 12.1166 9.93331 12.3381 9.7549C12.5597 9.57649 12.7138 9.32783 12.775 9.05L13.8063 4.40625H3.2"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WarningTriangleIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M13.5808 11.2499L8.58078 2.4999C8.47176 2.30752 8.31366 2.14751 8.12261 2.03619C7.93156 1.92486 7.7144 1.86621 7.49328 1.86621C7.27216 1.86621 7.055 1.92486 6.86395 2.03619C6.6729 2.14751 6.5148 2.30752 6.40578 2.4999L1.40578 11.2499C1.29558 11.4407 1.2378 11.6573 1.23828 11.8777C1.23877 12.0981 1.29751 12.3144 1.40856 12.5048C1.5196 12.6951 1.679 12.8528 1.87059 12.9617C2.06218 13.0706 2.27916 13.1269 2.49953 13.1249H12.4995C12.7188 13.1247 12.9342 13.0668 13.1241 12.9569C13.3139 12.8471 13.4715 12.6893 13.5811 12.4993C13.6907 12.3094 13.7483 12.0939 13.7482 11.8746C13.7482 11.6553 13.6904 11.4398 13.5808 11.2499Z"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 5.625V8.125"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 10.625H7.50625"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


export const DeliveryTruckIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M8.75 11.25V3.75C8.75 3.41848 8.6183 3.10054 8.38388 2.86612C8.14946 2.6317 7.83152 2.5 7.5 2.5H2.5C2.16848 2.5 1.85054 2.6317 1.61612 2.86612C1.3817 3.10054 1.25 3.41848 1.25 3.75V10.625C1.25 10.7908 1.31585 10.9497 1.43306 11.0669C1.55027 11.1842 1.70924 11.25 1.875 11.25H3.125" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.375 11.25H5.625" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.875 11.25H13.125C13.2908 11.25 13.4497 11.1842 13.5669 11.0669C13.6842 10.9497 13.75 10.7908 13.75 10.625V8.34375C13.7497 8.20191 13.7013 8.06438 13.6125 7.95375L11.4375 5.235C11.379 5.1618 11.3049 5.10268 11.2205 5.062C11.1361 5.02132 11.0437 5.00013 10.95 5H8.75" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.625 12.5C11.3154 12.5 11.875 11.9404 11.875 11.25C11.875 10.5596 11.3154 10 10.625 10C9.93464 10 9.375 10.5596 9.375 11.25C9.375 11.9404 9.93464 12.5 10.625 12.5Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.375 12.5C5.06536 12.5 5.625 11.9404 5.625 11.25C5.625 10.5596 5.06536 10 4.375 10C3.68464 10 3.125 10.5596 3.125 11.25C3.125 11.9404 3.68464 12.5 4.375 12.5Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const RefreshIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M1.875 7.5C1.875 8.61252 2.2049 9.70006 2.82298 10.6251C3.44107 11.5501 4.31957 12.2711 5.34741 12.6968C6.37524 13.1226 7.50624 13.234 8.59738 13.0169C9.68853 12.7999 10.6908 12.2641 11.4775 11.4775C12.2641 10.6908 12.7999 9.68853 13.0169 8.59738C13.234 7.50624 13.1226 6.37524 12.6968 5.34741C12.2711 4.31957 11.5501 3.44107 10.6251 2.82298C9.70006 2.2049 8.61252 1.875 7.5 1.875C5.92747 1.88092 4.41811 2.49451 3.2875 3.5875L1.875 5" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.875 1.875V5H5" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const UserSingleIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M11.875 13.125V11.875C11.875 11.212 11.6116 10.5761 11.1428 10.1072C10.6739 9.63839 10.038 9.375 9.375 9.375H5.625C4.96196 9.375 4.32607 9.63839 3.85723 10.1072C3.38839 10.5761 3.125 11.212 3.125 11.875V13.125" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 6.875C8.88071 6.875 10 5.75571 10 4.375C10 2.99429 8.88071 1.875 7.5 1.875C6.11929 1.875 5 2.99429 5 4.375C5 5.75571 6.11929 6.875 7.5 6.875Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BicycleIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M11.5625 13.125C12.7706 13.125 13.75 12.1456 13.75 10.9375C13.75 9.72938 12.7706 8.75 11.5625 8.75C10.3544 8.75 9.375 9.72938 9.375 10.9375C9.375 12.1456 10.3544 13.125 11.5625 13.125Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.4375 13.125C4.64562 13.125 5.625 12.1456 5.625 10.9375C5.625 9.72938 4.64562 8.75 3.4375 8.75C2.22938 8.75 1.25 9.72938 1.25 10.9375C1.25 12.1456 2.22938 13.125 3.4375 13.125Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.375 3.75C9.72018 3.75 10 3.47018 10 3.125C10 2.77982 9.72018 2.5 9.375 2.5C9.02982 2.5 8.75 2.77982 8.75 3.125C8.75 3.47018 9.02982 3.75 9.375 3.75Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 10.9375V8.75L5.625 6.875L8.125 5L9.375 6.875H10.625" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WalletIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M11.875 4.375V2.5C11.875 2.33424 11.8092 2.17527 11.6919 2.05806C11.5747 1.94085 11.4158 1.875 11.25 1.875H3.125C2.79348 1.875 2.47554 2.0067 2.24112 2.24112C2.0067 2.47554 1.875 2.79348 1.875 3.125C1.875 3.45652 2.0067 3.77446 2.24112 4.00888C2.47554 4.2433 2.79348 4.375 3.125 4.375H12.5C12.6658 4.375 12.8247 4.44085 12.9419 4.55806C13.0592 4.67527 13.125 4.83424 13.125 5V7.5M13.125 7.5H11.25C10.9185 7.5 10.6005 7.6317 10.3661 7.86612C10.1317 8.10054 10 8.41848 10 8.75C10 9.08152 10.1317 9.39946 10.3661 9.63388C10.6005 9.8683 10.9185 10 11.25 10H13.125C13.2908 10 13.4497 9.93415 13.5669 9.81694C13.6842 9.69973 13.75 9.54076 13.75 9.375V8.125C13.75 7.95924 13.6842 7.80027 13.5669 7.68306C13.4497 7.56585 13.2908 7.5 13.125 7.5Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.875 3.125V11.875C1.875 12.2065 2.0067 12.5245 2.24112 12.7589C2.47554 12.9933 2.79348 13.125 3.125 13.125H12.5C12.6658 13.125 12.8247 13.0592 12.9419 12.9419C13.0592 12.8247 13.125 12.6658 13.125 12.5V10" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FileTextIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M9.375 1.25H3.75C3.41848 1.25 3.10054 1.3817 2.86612 1.61612C2.6317 1.85054 2.5 2.16848 2.5 2.5V12.5C2.5 12.8315 2.6317 13.1495 2.86612 13.3839C3.10054 13.6183 3.41848 13.75 3.75 13.75H11.25C11.5815 13.75 11.8995 13.6183 12.1339 13.3839C12.3683 13.1495 12.5 12.8315 12.5 12.5V4.375L9.375 1.25Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.75 1.25V3.75C8.75 4.08152 8.8817 4.39946 9.11612 4.63388C9.35054 4.8683 9.66848 5 10 5H12.5" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.25 5.625H5" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 8.125H5" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 10.625H5" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MegaphoneIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M1.875 6.875L13.125 3.75V11.25L1.875 8.75V6.875Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.24934 10.5C7.18368 10.738 7.07178 10.9608 6.92003 11.1556C6.76828 11.3503 6.57965 11.5133 6.36492 11.6352C6.15018 11.7571 5.91355 11.8354 5.66852 11.8659C5.42349 11.8963 5.17486 11.8782 4.93684 11.8125C4.69882 11.7468 4.47606 11.6349 4.28129 11.4832C4.08651 11.3314 3.92353 11.1428 3.80166 10.9281C3.67978 10.7133 3.60139 10.4767 3.57097 10.2317C3.54054 9.98664 3.55868 9.73802 3.62434 9.5" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MapPinIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M7.87562 13.6244C9.03813 12.6206 12.5 9.37062 12.5 6.25C12.5 4.92392 11.9732 3.65215 11.0355 2.71447C10.0979 1.77678 8.82608 1.25 7.5 1.25C6.17392 1.25 4.90215 1.77678 3.96447 2.71447C3.02678 3.65215 2.5 4.92392 2.5 6.25C2.5 9.37062 5.96188 12.6206 7.12438 13.6244C7.23267 13.7058 7.3645 13.7498 7.5 13.7498C7.6355 13.7498 7.76733 13.7058 7.87562 13.6244Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 8.125C8.53553 8.125 9.375 7.28553 9.375 6.25C9.375 5.21447 8.53553 4.375 7.5 4.375C6.46447 4.375 5.625 5.21447 5.625 6.25C5.625 7.28553 6.46447 8.125 7.5 8.125Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SettingsGearIcon = ({
  color = "#525866",
  size = 15,
  className = "",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M7.63677 1.25H7.36177C7.03025 1.25 6.71231 1.3817 6.47789 1.61612C6.24346 1.85054 6.11177 2.16848 6.11177 2.5V2.6125C6.11154 2.8317 6.05368 3.04699 5.94398 3.23677C5.83428 3.42655 5.6766 3.58415 5.48677 3.69375L5.21802 3.85C5.028 3.95971 4.81244 4.01747 4.59302 4.01747C4.3736 4.01747 4.15804 3.95971 3.96802 3.85L3.87427 3.8C3.58743 3.63454 3.24667 3.58965 2.92677 3.67519C2.60687 3.76073 2.33399 3.96971 2.16802 4.25625L2.03052 4.49375C1.86506 4.78058 1.82017 5.12135 1.90571 5.44125C1.99125 5.76115 2.20023 6.03403 2.48677 6.2L2.58052 6.2625C2.76944 6.37157 2.92653 6.52818 3.03618 6.71677C3.14582 6.90536 3.2042 7.11936 3.20552 7.3375V7.65625C3.20639 7.87651 3.14905 8.0931 3.0393 8.28407C2.92954 8.47504 2.77127 8.63362 2.58052 8.74375L2.48677 8.8C2.20023 8.96597 1.99125 9.23885 1.90571 9.55875C1.82017 9.87865 1.86506 10.2194 2.03052 10.5062L2.16802 10.7438C2.33399 11.0303 2.60687 11.2393 2.92677 11.3248C3.24667 11.4103 3.58743 11.3655 3.87427 11.2L3.96802 11.15C4.15804 11.0403 4.3736 10.9825 4.59302 10.9825C4.81244 10.9825 5.028 11.0403 5.21802 11.15L5.48677 11.3063C5.6766 11.4159 5.83428 11.5734 5.94398 11.7632C6.05368 11.953 6.11154 12.1683 6.11177 12.3875V12.5C6.11177 12.8315 6.24346 13.1495 6.47789 13.3839C6.71231 13.6183 7.03025 13.75 7.36177 13.75H7.63677C7.96829 13.75 8.28623 13.6183 8.52065 13.3839C8.75507 13.1495 8.88677 12.8315 8.88677 12.5V12.3875C8.88699 12.1683 8.94486 11.953 9.05456 11.7632C9.16426 11.5734 9.32193 11.4159 9.51177 11.3063L9.78052 11.15C9.97054 11.0403 10.1861 10.9825 10.4055 10.9825C10.6249 10.9825 10.8405 11.0403 11.0305 11.15L11.1243 11.2C11.4111 11.3655 11.7519 11.4103 12.0718 11.3248C12.3917 11.2393 12.6645 11.0303 12.8305 10.7438L12.968 10.5C13.1335 10.2132 13.1784 9.8724 13.0928 9.5525C13.0073 9.2326 12.7983 8.95972 12.5118 8.79375L12.418 8.74375C12.2273 8.63362 12.069 8.47504 11.9592 8.28407C11.8495 8.0931 11.7921 7.87651 11.793 7.65625V7.34375C11.7921 7.12349 11.8495 6.9069 11.9592 6.71593C12.069 6.52496 12.2273 6.36638 12.418 6.25625L12.5118 6.2C12.7983 6.03403 13.0073 5.76115 13.0928 5.44125C13.1784 5.12135 13.1335 4.78058 12.968 4.49375L12.8305 4.25625C12.6645 3.96971 12.3917 3.76073 12.0718 3.67519C11.7519 3.58965 11.4111 3.63454 11.1243 3.8L11.0305 3.85C10.8405 3.95971 10.6249 4.01747 10.4055 4.01747C10.1861 4.01747 9.97054 3.95971 9.78052 3.85L9.51177 3.69375C9.32193 3.58415 9.16426 3.42655 9.05456 3.23677C8.94486 3.04699 8.88699 2.8317 8.88677 2.6125V2.5C8.88677 2.16848 8.75507 1.85054 8.52065 1.61612C8.28623 1.3817 7.96829 1.25 7.63677 1.25Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 9.375C8.53553 9.375 9.375 8.53553 9.375 7.5C9.375 6.46447 8.53553 5.625 7.5 5.625C6.46447 5.625 5.625 6.46447 5.625 7.5C5.625 8.53553 6.46447 9.375 7.5 9.375Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Optional: keep a lookup map if you still need to resolve an icon by name string
// (e.g. when the icon to render comes from config/data rather than being
// imported directly). Prefer importing the specific icon component directly
// wherever possible.
export const iconRegistry = {
  "browser-bot": BrowserBotIcon,
  "bar-chart": BarChartIcon,
  users: UsersIcon,
  "shield-check": ShieldCheckIcon,
  prohibited: ProhibitedIcon,
  tag: TagIcon,
  "shopping-cart": ShoppingCartIcon,
  "warning-triangle": WarningTriangleIcon,
  "delivery-truck": DeliveryTruckIcon,
  refresh: RefreshIcon,
  "user-single": UserSingleIcon,
  bicycle: BicycleIcon,
  wallet: WalletIcon,
  "file-text": FileTextIcon,
  megaphone: MegaphoneIcon,
  "map-pin": MapPinIcon,
  "settings-gear": SettingsGearIcon,
} as const;

export type IconName = keyof typeof iconRegistry;