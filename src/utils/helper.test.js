import { expect, test } from 'vitest'
import { removeFirstChar, depluralize } from './helper'

test('remove first character', () => {
  expect(removeFirstChar("/testing")).toBe("testing")
})

test('remove last character', () => {
  expect(depluralize("testings")).toBe("testing")
})