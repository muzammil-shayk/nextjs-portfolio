import Image from 'next/image';

// Both variants render and CSS picks one, so an icon never flashes the wrong
// theme while the page hydrates.
const ThemeImage = ({ light, dark, alt = '', className = '', ...props }) => (
  <>
    <Image
      src={light}
      alt={alt}
      className={`${className} dark:hidden`}
      {...props}
    />
    <Image
      src={dark}
      alt={alt}
      className={`${className} hidden dark:block`}
      {...props}
    />
  </>
);

export default ThemeImage;
