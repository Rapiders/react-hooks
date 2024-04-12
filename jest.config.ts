import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  preset: 'ts-jest',
  rootDir: '.',
  testMatch: ['**/?(*)+(test).ts', '**/?(*)+(test).tsx'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  resetMocks: true,
  // 💡 tsconfig 에서 `baseUrl` 과 `paths` 를 사용하는 경우 필요
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
};
