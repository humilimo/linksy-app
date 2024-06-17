import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  roots: ['<rootDir>/tests/steps'], // Define onde os testes estão localizados
  testMatch: ['<rootDir>/tests/steps/*.steps.ts'], // Define o padrão de arquivos de teste
  preset: 'ts-jest', // Usado para transpilar TypeScript para JavaScript antes de rodar os testes
  testEnvironment: 'node', // Define o ambiente de teste (node ou jsdom para testes de front-end)
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transforma arquivos TypeScript usando ts-jest
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Define as extensões de arquivo que o Jest deve processar
  collectCoverage: true, // Habilita a coleta de cobertura de código
  collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts'], // Define de onde coletar cobertura de código
  coverageDirectory: 'coverage', // Define o diretório onde o relatório de cobertura será salvo
  coverageReporters: ['text', 'lcov'], // Define os tipos de relatórios de cobertura a serem gerados
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Mapeia caminhos para simplificar os imports
  },
  globalSetup: './jest-global-setup.ts',
};

export default config;