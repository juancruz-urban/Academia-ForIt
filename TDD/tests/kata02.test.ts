import { describe,test,expect } from "vitest";
import {fizzbuzz} from '../kata02'

describe('kata de fizzbuzz',()=>{
    test('si no es divisible que devuelva el numero',()=>{
        expect(fizzbuzz(1)).toBe('1')
    })
    test('si es divisible por 3 devuelve fizz',()=>{
        expect(fizzbuzz(3)).toBe('fizz')
    })
     test('si es divisible por 5 devuelve buzz',()=>{
        expect(fizzbuzz(5)).toBe('buzz')
    })
     test('si es divisible por 3 y por 5 devuelve fizzbuzz',()=>{
        expect(fizzbuzz(15)).toBe('fizzbuzz')
    })
     test('soporte para numeros negativos',()=>{
        expect(fizzbuzz(-1)).toBe('-1')
        expect(fizzbuzz(-15)).toBe('fizzbuzz')
    })
     test('soporte para decimales',()=>{
        expect(fizzbuzz(1.2)).toBe('1.2')
        expect(fizzbuzz(3.0)).toBe('fizz')
        expect(fizzbuzz(15.00)).toBe('fizzbuzz')
    })
})