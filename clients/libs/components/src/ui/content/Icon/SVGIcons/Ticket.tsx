import React from 'react';

const Icon = ({ className }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="23"
    fill="none"
    className={className + ' fill'}
    viewBox="0 0 30 23"
  >
    <path
      fill="#000"
      d="M29.718 15.43a2.022 2.022 0 000-2.06l-1.257-2.09a.065.065 0 010-.067l1.257-2.09a2.021 2.021 0 000-2.06l-1.257-2.09a.065.065 0 010-.067l1.002-1.666c.288-.48.306-1.086.045-1.582A1.473 1.473 0 0028.21.853H1.79c-.54 0-1.037.308-1.298.804A1.624 1.624 0 00.537 3.24l1.002 1.667a.065.065 0 010 .066L.282 7.063a2.021 2.021 0 000 2.061l1.257 2.09a.065.065 0 010 .067L.282 13.37a2.02 2.02 0 000 2.06l1.257 2.09a.065.065 0 010 .066L.537 19.254a1.624 1.624 0 00-.045 1.582c.26.497.758.805 1.298.805h26.42c.54 0 1.037-.308 1.298-.805a1.623 1.623 0 00-.045-1.582l-1.002-1.667a.065.065 0 010-.067l1.257-2.09zm-1.504-.997l-1.257 2.09a2.02 2.02 0 000 2.06l.716 1.19h-6.37v-.061c0-.516-.399-.934-.89-.934-.49 0-.889.418-.889.934v.062H2.327l.716-1.19a2.021 2.021 0 000-2.06l-1.257-2.09a.065.065 0 010-.066l1.257-2.09a2.02 2.02 0 000-2.061l-1.257-2.09a.065.065 0 010-.067l1.257-2.09a2.022 2.022 0 000-2.06l-.716-1.19h17.197v.062c0 .516.398.934.89.934.49 0 .888-.418.888-.934V2.72h6.37l-.715 1.189a2.02 2.02 0 000 2.06l1.257 2.09a.065.065 0 010 .067l-1.257 2.09a2.02 2.02 0 000 2.06l1.257 2.09a.065.065 0 010 .067z"
    ></path>
    <path
      fill="#000"
      d="M20.413 5.67c-.49 0-.889.42-.889.935v.546c0 .515.398.933.89.933.49 0 .888-.418.888-.933v-.546c0-.516-.398-.934-.889-.934zM20.413 14.409c-.49 0-.889.418-.889.933v.547c0 .515.398.933.89.933.49 0 .888-.418.888-.933v-.547c0-.515-.398-.933-.889-.933zM20.413 10.04c-.49 0-.889.418-.889.934v.546c0 .515.398.933.89.933.49 0 .888-.418.888-.933v-.546c0-.516-.398-.934-.889-.934zM11.992 10.184c-1.218-.53-1.424-.805-1.424-1.22 0-.382.269-.789 1.023-.789.79 0 1.288.3 1.501.426.105.064.23.075.345.032a.424.424 0 00.248-.255l.338-.939a.444.444 0 00-.178-.529 3.74 3.74 0 00-1.556-.527v-.975a.425.425 0 00-.414-.435h-.84a.425.425 0 00-.414.435v1.085c-1.263.351-2.046 1.36-2.046 2.642 0 .714.238 1.3.727 1.794.39.394.952.733 1.767 1.069 1.118.476 1.272.901 1.272 1.29 0 .573-.481.959-1.198.959a3.07 3.07 0 01-1.72-.539.396.396 0 00-.36-.05.422.422 0 00-.26.266l-.325.952a.45.45 0 00.149.5c.462.347 1.169.6 1.9.68v1.03c0 .24.185.434.413.434h.854a.425.425 0 00.414-.435v-1.128c1.301-.367 2.14-1.449 2.14-2.769 0-.732-.206-1.334-.63-1.84-.38-.453-.93-.824-1.726-1.164z"
    ></path>
  </svg>
);

Icon.displayName = 'Icon.Ticket';

export default Icon;