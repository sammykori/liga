import {expect, test} from 'vitest'
import { addNumbers } from '@/utils/helpers/login'

test('sample test Calculate add', () => {
  expect(addNumbers(2, 3)).toBe(5)
})