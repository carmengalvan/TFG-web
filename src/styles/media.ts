import { keysOf } from '@/utils/keysOf';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import useMediaQueryMUI from '@mui/material/useMediaQuery';

export type BreakpointSizes = keyof typeof sizes;

export const sizes = {
  zero: 0,
  mobileSmall: 320,
  mobile: 560,
  tabletPortrait: 767,
  tabletLandscape: 960,
  laptop: 1200,
  desktop: 1800,
} as const;

const minWidthQuery = (width: number) => `@media (min-width: ${width}px)`;

export const from: { [key in BreakpointSizes]: string } = keysOf(sizes).reduce(
  (acc, key) => ({
    ...acc,
    [key]: minWidthQuery(sizes[key]),
  }),
  {} as { [key in BreakpointSizes]: string },
);

const maxWidthQuery = (width: number) => `@media (max-width: ${width}px)`;

export const to: { [key in BreakpointSizes]: string } = keysOf(sizes).reduce(
  (acc, key) => ({
    ...acc,
    [key]: maxWidthQuery(sizes[key]),
  }),
  {} as { [key in BreakpointSizes]: string },
);

export const useMediaQuery = (query: string): boolean => {
  return useMediaQueryMUI(query, { noSsr: true });
};
