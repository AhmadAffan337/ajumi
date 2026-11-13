/**
 * Responsive Design System
 * 100% responsive with 0% tolerance
 */

// Breakpoints
export const breakpoints = {
  xs: '320px',   // Small phones
  sm: '640px',   // Phones
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px', // Large screens
} as const;

// Responsive padding classes
export const responsivePadding = {
  section: 'px-4 sm:px-6 md:px-10 lg:px-14',
  container: 'px-4 sm:px-6 md:px-8 lg:px-10',
  tight: 'px-3 sm:px-4 md:px-6',
} as const;

// Responsive spacing
export const responsiveSpacing = {
  section: 'py-16 sm:py-20 md:py-24 lg:py-28',
  sectionLarge: 'py-20 sm:py-24 md:py-28 lg:py-32',
  gap: 'gap-4 sm:gap-6 md:gap-8 lg:gap-10',
  gapSmall: 'gap-2 sm:gap-3 md:gap-4',
} as const;

// Responsive text sizes
export const responsiveText = {
  hero: 'text-[clamp(2.5rem,12vw,10rem)]',
  h1: 'text-[clamp(2rem,6vw,6rem)]',
  h2: 'text-[clamp(1.75rem,5vw,4.5rem)]',
  h3: 'text-[clamp(1.5rem,4vw,3rem)]',
  h4: 'text-[clamp(1.25rem,3vw,2rem)]',
  body: 'text-base sm:text-lg md:text-xl',
  small: 'text-sm sm:text-base',
  tiny: 'text-xs sm:text-sm',
} as const;

// Responsive grid
export const responsiveGrid = {
  cols2: 'grid-cols-1 sm:grid-cols-2',
  cols3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  cols4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  cols6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
} as const;

// Responsive flex
export const responsiveFlex = {
  row: 'flex-col sm:flex-row',
  col: 'flex-row sm:flex-col',
  wrap: 'flex-wrap',
  center: 'justify-center items-center',
} as const;

// Container max-widths
export const container = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
  content: 'max-w-[1500px]',
} as const;

// Responsive utilities
export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
