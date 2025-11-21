import type { Preview } from '@storybook/react-vite';
import { RouterDecorator } from './routerDecorator';

import { SvgDecorator } from './svgDecorator';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [RouterDecorator(), SvgDecorator],
};

export default preview;
