import React from 'react';

const FoodIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="15"
    height="20"
    viewBox="0 0 15 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // Allows you to override fill or dimensions from the parent page
  >
    <path
      d="M2.88 19.2V10.416C2.064 10.192 1.38 9.744 0.828 9.072C0.276 8.4 0 7.616 0 6.72V0H1.92V6.72H2.88V0H4.8V6.72H5.76V0H7.68V6.72C7.68 7.616 7.404 8.4 6.852 9.072C6.3 9.744 5.616 10.192 4.8 10.416V19.2H2.88ZM12.48 19.2V11.52H9.6V4.8C9.6 3.472 10.068 2.34 11.004 1.404C11.94 0.468 13.072 0 14.4 0V19.2H12.48Z"
      fill="#A1A1AA"
    />
  </svg>
);

export default FoodIcon;