import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
expect.extend(matchers as any);
