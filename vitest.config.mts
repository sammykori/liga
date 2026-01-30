import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import {playwright} from '@vitest/browser-playwright'

const sharedPlugins = [react(), tsconfigPaths()]
 
export default defineConfig({
  plugins: sharedPlugins,
  test: {
    projects: [
      {
        test: {
          // an example of file based convention,
          // you don't have to follow it
          include: [
            '__tests__/unit/**/*.{test,spec}.ts',
            '__tests__/**/*.unit.{test,spec}.ts',
          ],
          name: 'unit',
          environment: 'node',
          
        },
        plugins: sharedPlugins,
      },
      {
        test: {
          // an example of file based convention,
          // you don't have to follow it
          include: [
            '__tests__/comp/**/*.{test,spec}.ts',
            '__tests__/**/*.comp.{test,spec}.ts',
          ],
          name: 'component',
          environment: 'jsdom',
        },
        plugins: sharedPlugins,

      },
       {
        test: {
          // an example of file based convention,
          // you don't have to follow it
          include: [
            '__tests__/int/**/*.{test,spec}.ts',
            '__tests__/**/*.int.{test,spec}.ts',
          ],
          name: 'integration',
          environment: 'jsdom',
        },
        plugins: sharedPlugins,

      },
      {
        test: {
          // an example of file based convention,
          // you don't have to follow it
          include: [
            '__tests__/browser/**/*.{test,spec}.ts',
            '__tests__/**/*.browser.{test,spec}.ts',
          ],
          name: 'browser',
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [
              { browser: 'chromium' },
            ],
          },
        },
        plugins: sharedPlugins,

      },
    ],
  },
})