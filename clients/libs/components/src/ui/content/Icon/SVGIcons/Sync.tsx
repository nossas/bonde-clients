import React from 'react';

function Icon({ className }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className + ' fill'}
      width="14"
      height="15"
      fill="none"
      viewBox="0 0 14 15"
    >
      <g fill="#424242" clipPath="url(#clip0)">
        <path d="M11.95 2.304A6.954 6.954 0 007 .254a7.017 7.017 0 00-3.24.793c-.572.3-1.102.68-1.572 1.125V.254H1.093v3.828h3.828V2.988H2.917A5.927 5.927 0 017 1.348a5.913 5.913 0 015.882 6.449l1.089.1c.02-.213.029-.429.029-.643h-.547H14c0-1.87-.728-3.628-2.05-4.95zM2.398 10.957l-.851.686c.247.307.523.595.818.856l.724-.819a5.956 5.956 0 01-.69-.723zM1.428 9.217l-1.032.364c.132.372.296.735.488 1.08l.955-.533a5.893 5.893 0 01-.41-.91zM1.094 7.254H0c0 .395.033.792.1 1.18l1.077-.184a5.967 5.967 0 01-.083-.996zM3.89 12.277l-.576.93c.336.207.691.388 1.056.536l.411-1.014a5.894 5.894 0 01-.89-.452zM12.708 8.78a5.88 5.88 0 01-.339.94l.994.458c.165-.359.3-.734.402-1.115l-1.057-.282zM10.488 12.02a5.918 5.918 0 01-.853.521l.488.979a7.02 7.02 0 001.012-.617l-.647-.882zM11.875 10.59a5.957 5.957 0 01-.633.773l.786.762c.274-.284.526-.592.75-.917l-.903-.619zM8.706 12.91a5.887 5.887 0 01-.977.206l.133 1.085c.392-.048.782-.13 1.16-.244l-.316-1.047zM5.737 13.025l-.233 1.068c.384.084.78.136 1.174.153l.05-1.092a5.931 5.931 0 01-.991-.13z"></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <path
            fill="#fff"
            d="M0 0H14V14H0z"
            transform="translate(0 .25)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

Icon.displayName = 'Icon.Sync';

export default Icon;
