import { expect, test } from 'vitest'
import { writtenOutDate, writtenOutDateTime } from './dataTransformation'

test('dayjs to convert date to written out date', () => {
  expect(writtenOutDate('2023-12-10')).toBe("Sunday - December 10, 2023")
})

test('dayjs to convert date to written out date and time', () => {
  expect(writtenOutDateTime('2023-12-10:17:30:00.000Z')).toBe("Sun, Dec 10, 2023 12:30 PM")
})