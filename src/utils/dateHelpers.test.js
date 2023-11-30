import { expect, test, vi } from 'vitest'
import { calculateDuration, getArrayOfDatesBooked, findDatesToDisable, convertToDayJS, isSameDay } from './dateHelpers'

test('calculateDuration', () => {
  expect(calculateDuration('2023-12-10', '2023-12-12')).toBe(2)
})

test('getArrayOfDatesBooked', () => {
  expect(getArrayOfDatesBooked('2023-12-10', '2023-12-15')).toStrictEqual(['2023-12-10', '2023-12-11', '2023-12-12', '2023-12-13', '2023-12-14', '2023-12-15'])
})

test('findDatesToDisable true', () => {
  expect(findDatesToDisable(['2023-12-10', '2023-12-11', '2023-12-12', '2023-12-13', '2023-12-14', '2023-12-15'], '2023-12-15')).toStrictEqual(true)
})

test('findDatesToDisable false', () => {
  expect(findDatesToDisable(['2023-12-10', '2023-12-11', '2023-12-12', '2023-12-13', '2023-12-14', '2023-12-15'], '2023-12-16')).toStrictEqual(false)
})

test('isSameDay true', () => {
  expect(isSameDay('2023-12-10', '2023-12-10')).toStrictEqual(true)
})

test('isSameDay false', () => {
  expect(isSameDay('2023-12-10', '2023-12-16')).toStrictEqual(false)
})

test('check if a non string will be converted to dayJS object', () => {
  expectTypeOf(convertToDayJS({})).toBeObject()
})


