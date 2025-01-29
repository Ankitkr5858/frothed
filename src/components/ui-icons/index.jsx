import PropTypes from 'prop-types';

export function Camera({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`component-iconify MuiBox-root css-11elljy iconify iconify--solar ${className}`}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.408 4.408 0 001.226-1.204c.749-1.1.749-2.633.749-5.697 0-3.065 0-4.597-.749-5.697a4.407 4.407 0 00-1.226-1.204c-.72-.473-1.622-.642-3.003-.702-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0013.634 3h-3.268c-.988 0-1.839.685-2.033 1.636-.129.635-.696 1.125-1.355 1.125-1.38.06-2.282.23-3.003.702A4.405 4.405 0 002.75 7.667C2 8.767 2 10.299 2 13.364c0 3.064 0 4.596.749 5.697.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21M16 13a4 4 0 11-8 0 4 4 0 018 0m2-3.75a.75.75 0 000 1.5h1a.75.75 0 000-1.5z"
        clipRule="evenodd"
        opacity={0.5}
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M16 13a4 4 0 11-8 0 4 4 0 018 0m-3.25-2a.75.75 0 00-1.5 0v1.25H10a.75.75 0 000 1.5h1.25V15a.75.75 0 001.5 0v-1.25H14a.75.75 0 000-1.5h-1.25z"
        clipRule="evenodd"
      />
      <path fill="currentColor" d="M18 9.25a.75.75 0 000 1.5h1a.75.75 0 000-1.5z" />
    </svg>
  );
}

Camera.propTypes = {
  className: PropTypes.string,
};

export function BackupIcon({ className, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`component-iconify MuiBox-root css-9uy14h iconify iconify--solar ${className}`}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      style={{ fill: color }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10 22h4c3.771 0 5.657 0 6.828-1.172C22 19.657 22 17.771 22 14v-.437c0-.873 0-1.529-.043-2.063h-4.052c-1.097 0-2.067 0-2.848-.105-.847-.114-1.694-.375-2.385-1.066-.692-.692-.953-1.539-1.067-2.386-.105-.781-.105-1.75-.105-2.848l.01-2.834c0-.083.007-.164.02-.244C11.121 2 10.636 2 10.03 2 6.239 2 4.343 2 3.172 3.172 2 4.343 2 6.229 2 10v4c0 3.771 0 5.657 1.172 6.828C4.343 22 6.229 22 10 22"
        clipRule="evenodd"
        opacity={0.5}
      />
      <path
        fill="currentColor"
        d="M9.013 19.047a.75.75 0 01-1.026 0l-2-1.875a.75.75 0 011.026-1.094l.737.69V13.5a.75.75 0 011.5 0v3.269l.737-.691a.75.75 0 011.026 1.094zM11.51 2.26l-.01 2.835c0 1.097 0 2.066.105 2.848.114.847.375 1.694 1.067 2.385.69.691 1.538.953 2.385 1.067.781.105 1.751.105 2.848.105h4.052c.013.155.022.321.028.5H22c0-.268 0-.402-.01-.56a5.322 5.322 0 00-.958-2.641c-.094-.128-.158-.204-.285-.357C19.954 7.494 18.91 6.312 18 5.5c-.81-.724-1.921-1.515-2.89-2.161-.832-.556-1.248-.834-1.819-1.04a5.488 5.488 0 00-.506-.154c-.384-.095-.758-.128-1.285-.14z"
      />
    </svg>
  );
}

BackupIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export function NotificationIcon({ className, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`component-iconify MuiBox-root css-9uy14h iconify iconify--solar ${className}`}
      viewBox="0 0 24 24"
      width="21.612"
      height="23.69"
      style={{ fill: color }}
    >
      <path
        fill="currentColor"
        d="M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.794 25.794 0 01-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.393 4.393 0 00.693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7"
        opacity={0.5}
      />
      <path
        fill="currentColor"
        d="M12.75 6a.75.75 0 00-1.5 0v4a.75.75 0 001.5 0zM7.243 18.545a5.002 5.002 0 009.513 0c-3.145.59-6.367.59-9.513 0"
      />
    </svg>
  );
}
NotificationIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export function SunIcon({ className, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`component-iconify MuiBox-root css-9uy14h iconify iconify--solar ${className}`}
      width="21.612"
      height="23.69"
      viewBox="0 0 24 24"
      style={{ fill: color }}
    >
      <path fill="currentColor" d="M18 12a6 6 0 11-12 0 6 6 0 0112 0" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 1.25a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0V2a.75.75 0 01.75-.75M4.399 4.399a.75.75 0 011.06 0l.393.392a.75.75 0 01-1.06 1.061l-.393-.393a.75.75 0 010-1.06m15.202 0a.75.75 0 010 1.06l-.393.393a.75.75 0 01-1.06-1.06l.393-.393a.75.75 0 011.06 0M1.25 12a.75.75 0 01.75-.75h1a.75.75 0 010 1.5H2a.75.75 0 01-.75-.75m19 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75m-2.102 6.148a.75.75 0 011.06 0l.393.393a.75.75 0 11-1.06 1.06l-.393-.393a.75.75 0 010-1.06m-12.296 0a.75.75 0 010 1.06l-.393.393a.75.75 0 11-1.06-1.06l.392-.393a.75.75 0 011.061 0M12 20.25a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75"
        clipRule="evenodd"
      />
    </svg>
  );
}

SunIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export function DarkIcon({ className, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`component-iconify MuiBox-root css-9uy14h iconify iconify--solar ${className}`}
      width="21.612"
      height="23.69"
      viewBox="0 0 24 24"
      style={{ fill: color }}
    >
      <path
        fill="currentColor"
        d="M19.9 2.307a.483.483 0 00-.9 0l-.43 1.095a.484.484 0 01-.272.274l-1.091.432a.486.486 0 000 .903l1.091.432a.48.48 0 01.272.273L19 6.81c.162.41.74.41.9 0l.43-1.095a.484.484 0 01.273-.273l1.091-.432a.486.486 0 000-.903l-1.091-.432a.484.484 0 01-.273-.274zM16.033 8.13a.483.483 0 00-.9 0l-.157.399a.484.484 0 01-.272.273l-.398.158a.486.486 0 000 .903l.398.157c.125.05.223.148.272.274l.157.399c.161.41.739.41.9 0l.157-.4a.484.484 0 01.272-.273l.398-.157a.486.486 0 000-.903l-.398-.158a.484.484 0 01-.272-.273z"
      />
      <path
        fill="currentColor"
        d="M12 22c5.523 0 10-4.477 10-10 0-.463-.694-.54-.933-.143a6.5 6.5 0 11-8.924-8.924C12.54 2.693 12.463 2 12 2 6.477 2 2 6.477 2 12s4.477 10 10 10"
        opacity={0.5}
      />
    </svg>
  );
}

DarkIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export function DeleteIcon({ className, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`component-iconify MuiBox-root css-9uy14h iconify iconify--solar ${className}`}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      style={{ fill: color }}
    >
      <path
        fill="currentColor"
        d="M3 6.386c0-.484.345-.877.771-.877h2.665c.529-.016.996-.399 1.176-.965l.03-.1.115-.391c.07-.24.131-.45.217-.637.338-.739.964-1.252 1.687-1.383.184-.033.378-.033.6-.033h3.478c.223 0 .417 0 .6.033.723.131 1.35.644 1.687 1.383.086.187.147.396.218.637l.114.391.03.1c.18.566.74.95 1.27.965h2.57c.427 0 .772.393.772.877s-.345.877-.771.877H3.77c-.425 0-.77-.393-.77-.877"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886.904-.886.996-2.339 1.181-5.245l.267-4.188c.1-1.577.15-2.366-.303-2.865-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5-.454.5-.404 1.288-.303 2.865l.267 4.188c.185 2.906.277 4.36 1.182 5.245.905.886 2.296.886 5.079.886m-1.35-9.811c-.04-.434-.408-.75-.82-.707-.413.043-.713.43-.672.864l.5 5.263c.04.434.408.75.82.707.413-.043.713-.43.672-.864zm4.329-.707c.412.043.713.43.671.864l-.5 5.263c-.04.434-.409.75-.82.707-.413-.043-.713-.43-.672-.864l.5-5.263c.04-.434.409-.75.82-.707"
        clipRule="evenodd"
      />
    </svg>
  );
}

DeleteIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export function EditPencilIcon({ className, color, height, width }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`component-iconify MuiBox-root css-9uy14h iconify iconify--mdi ${className}`}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ fill: color }}
    >
      <path
        fill="currentColor"
        d="M16.84 2.73c-.39 0-.77.15-1.07.44l-2.12 2.12 5.3 5.31 2.12-2.1c.6-.61.6-1.56 0-2.14L17.9 3.17c-.3-.29-.68-.44-1.06-.44M12.94 6l-8.1 8.11 2.56.28.18 2.29 2.28.17.29 2.56 8.1-8.11m-14 3.74L2.5 21.73l6.7-1.79-.24-2.16-2.31-.17-.18-2.32"
      />
    </svg>
  );
}

EditPencilIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

export function SearchIcon({ className, color, height, width }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`component-iconify MuiBox-root css-1t9pz9x iconify iconify--eva ${className}`}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ fill: color }}
    >
      <path
        fill="currentColor"
        d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0019 11a8 8 0 10-8 8 7.92 7.92 0 004.9-1.69l3.39 3.4a1 1 0 001.42 0 1 1 0 000-1.42M5 11a6 6 0 116 6 6 6 0 01-6-6"
      />
    </svg>
  );
}

SearchIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

export function TickIcon({ className, color, height, width }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
        fill={color}
      />
    </svg>
  );
}

TickIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

export function SuccessIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1010 10A10 10 0 0012 2m4.3 7.61l-4.57 6a1 1 0 01-.79.39 1 1 0 01-.79-.38l-2.44-3.11a1 1 0 011.58-1.23l1.63 2.08 3.78-5a1 1 0 111.6 1.22z"
      />
    </svg>
  );
}

SuccessIcon.propTypes = {
  className: PropTypes.string,
};

export function ErrorIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width="25px"
      height="25px"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="red"
        stroke="none"
      >
        <path d="M1740 4674 c-30 -8 -75 -26 -100 -41 -60 -34 -1119 -1093 -1153 -1153 -57 -100 -57 -97 -57 -920 0 -823 0 -820 57 -920 34 -60 1093 -1119 1153 -1153 100 -57 97 -57 920 -57 823 0 820 0 920 57 60 34 1119 1093 1153 1153 57 100 57 97 57 920 0 823 0 820 -57 920 -34 60 -1093 1119 -1153 1153 -100 57 -97 57 -925 56 -636 0 -769 -3 -815 -15z m915 -758 c69 -53 65 -1 65 -876 0 -877 4 -823 -67 -877 -30 -23 -46 -28 -93 -28 -47 0 -63 5 -93 28 -71 54 -67 0 -67 877 0 658 2 796 14 818 47 90 162 118 241 58z m23 -2235 c56 -29 117 -99 137 -161 67 -202 -133 -402 -335 -335 -62 21 -132 81 -163 140 -28 54 -30 174 -3 225 36 69 105 128 176 151 39 13 145 2 188 -20z" />
      </g>
    </svg>
  );
}

ErrorIcon.propTypes = {
  className: PropTypes.string,
};

export function ToggleIcon({ className, open }) {
  return open ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`component-iconify MuiBox-root css-3o0h5k iconify iconify--eva ${className} `}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M13.83 19a1 1 0 01-.78-.37l-4.83-6a1 1 0 010-1.27l5-6a1 1 0 011.54 1.28L10.29 12l4.32 5.36a1 1 0 01-.78 1.64"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`component-iconify MuiBox-root css-3o0h5k iconify iconify--eva ${className} `}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M10 19a1 1 0 01-.64-.23 1 1 0 01-.13-1.41L13.71 12 9.39 6.63a1 1 0 01.15-1.41 1 1 0 011.46.15l4.83 6a1 1 0 010 1.27l-5 6A1 1 0 0110 19"
      />
    </svg>
  );
}

ToggleIcon.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
};
