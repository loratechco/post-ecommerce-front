import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full max-sm:h-screen px-2 flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0 ">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center pt-24">
        <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-zinc-400">
          404
        </p>
        <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-zinc-400 mt-2">
          Page Not Found
        </p>
        <p className="text-lg md:text-xl lg:text-2xl text-zinc-600 my-12">
          Sorry, the page you are looking for could not be found.
        </p>

        <Link
          href="/"
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-zinc-100 px-4 py-2 rounded-lg transition duration-150"
          title="Return Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>Return Home</span>
        </Link>
      </div>
      <div className="w-1/2 lg:h-full flex lg:items-end justify-center p-4 pt-24 max-sm:hidden">
        <svg
          className="w-full text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 1120.59226 777.91584"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <title>not found</title>
          <circle cx="212.59226" cy="103" r="64" fill="#ff6584"></circle>
          <path
            d="M563.68016,404.16381c0,151.01141-89.77389,203.73895-200.51559,203.73895S162.649,555.17522,162.649,404.16381,363.16457,61.04208,363.16457,61.04208,563.68016,253.1524,563.68016,404.16381Z"
            transform="translate(-39.70387 -61.04208)"
            fill="#cbd5e1"
          ></path>
          <polygon
            points="316.156 523.761 318.21 397.378 403.674 241.024 318.532 377.552 319.455 320.725 378.357 207.605 319.699 305.687 319.699 305.687 321.359 203.481 384.433 113.423 321.621 187.409 322.658 0 316.138 248.096 316.674 237.861 252.547 139.704 315.646 257.508 309.671 371.654 309.493 368.625 235.565 265.329 309.269 379.328 308.522 393.603 308.388 393.818 308.449 394.99 293.29 684.589 313.544 684.589 315.974 535.005 389.496 421.285 316.156 523.761"
            fill="#3f3d56"
          ></polygon>
          <path
            d="M1160.29613,466.01367c0,123.61-73.4842,166.77-164.13156,166.77s-164.13156-43.16-164.13156-166.77S996.16457,185.15218,996.16457,185.15218,1160.29613,342.40364,1160.29613,466.01367Z"
            transform="translate(-39.70387 -61.04208)"
            fill="#cbd5e1"
          ></path>
          <polygon
            points="950.482 552.833 952.162 449.383 1022.119 321.4 952.426 433.154 953.182 386.639 1001.396 294.044 953.382 374.329 953.382 374.329 954.741 290.669 1006.369 216.952 954.954 277.514 955.804 124.11 950.467 327.188 950.906 318.811 898.414 238.464 950.064 334.893 945.173 428.327 945.027 425.847 884.514 341.294 944.844 434.608 944.232 446.293 944.123 446.469 944.173 447.428 931.764 684.478 948.343 684.478 950.332 562.037 1010.514 468.952 950.482 552.833"
            fill="#3f3d56"
          ></polygon>
          <ellipse
            cx="554.59226"
            cy="680.47903"
            rx="554.59226"
            ry="28.03433"
            fill="#3f3d56"
          ></ellipse>
          <ellipse
            cx="892.44491"
            cy="726.79663"
            rx="94.98858"
            ry="4.80162"
            fill="#3f3d56"
          ></ellipse>
          <ellipse
            cx="548.71959"
            cy="773.11422"
            rx="94.98858"
            ry="4.80162"
            fill="#3f3d56"
          ></ellipse>
          <ellipse
            cx="287.94432"
            cy="734.27887"
            rx="217.01436"
            ry="10.96996"
            fill="#3f3d56"
          ></ellipse>
          <circle cx="97.08375" cy="566.26982" r="79" fill="#2f2e41"></circle>
          <rect
            x="99.80546"
            y="689.02332"
            width="24"
            height="43"
            transform="translate(-31.32451 -62.31008) rotate(0.67509)"
            fill="#2f2e41"
          ></rect>
          <rect
            x="147.80213"
            y="689.58887"
            width="24"
            height="43"
            transform="translate(-31.31452 -62.87555) rotate(0.67509)"
            fill="#2f2e41"
          ></rect>
          <ellipse
            cx="119.54569"
            cy="732.61606"
            rx="7.5"
            ry="20"
            transform="translate(-654.1319 782.47948) rotate(-89.32491)"
            fill="#2f2e41"
          ></ellipse>
          <ellipse
            cx="167.55414"
            cy="732.18168"
            rx="7.5"
            ry="20"
            transform="translate(-606.25475 830.05533) rotate(-89.32491)"
            fill="#2f2e41"
          ></ellipse>
          <circle cx="99.31925" cy="546.29477" r="27" fill="#fff"></circle>
          <circle cx="99.31925" cy="546.29477" r="9" fill="#3f3d56"></circle>
          <path
            d="M61.02588,552.94636c-6.04185-28.64075,14.68758-57.26483,46.30049-63.93367s62.13813,11.14292,68.18,39.78367-14.97834,38.93-46.59124,45.59886S67.06774,581.58712,61.02588,552.94636Z"
            transform="translate(-39.70387 -61.04208)"
            fill="currentColor"
          ></path>
          <path
            d="M257.29613,671.38411c0,55.07585-32.73985,74.3063-73.13,74.3063q-1.40351,0-2.80255-.0312c-1.87139-.04011-3.72494-.1292-5.55619-.254-36.45135-2.57979-64.77127-22.79937-64.77127-74.02113,0-53.00843,67.73872-119.89612,72.827-124.84633l.00892-.00889c.19608-.19159.29409-.28516.29409-.28516S257.29613,616.30827,257.29613,671.38411Z"
            transform="translate(-39.70387 -61.04208)"
            fill="currentColor"
          ></path>
          <path
            d="M181.50168,737.26482l26.747-37.37367-26.81386,41.4773-.07125,4.29076c-1.87139-.04011-3.72494-.1292-5.55619-.254l2.88282-55.10258-.0223-.42775.049-.0802.27179-5.20415-26.88076-41.5798,26.96539,37.67668.06244,1.105,2.17874-41.63324-23.0132-42.85092,5.18164-.29243-4.06546-41.46056-23.57221,35.50695-27.87088-13.67925,21.14025,6.43645,51.93789-.0624,26.03089c5.38043-.11591,4.6466-7.75355,5.55158-6.66953Z"
            transform="translate(-39.70387 -61.04208)"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
}
