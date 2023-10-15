import { expect, test } from 'vitest'
import { removeFirstChar, depluralize, ellipsis } from './helper'

test('remove first character', () => {
  expect(removeFirstChar("/testing")).toBe("testing")
})

test('remove last character', () => {
  expect(depluralize("testings")).toBe("testing")
})

test('add ellipsis', () => {
  expect(ellipsis("testings")).toBe("testings...")
})