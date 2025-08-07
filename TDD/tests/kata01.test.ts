import {add} from '../kata01'
import { describe, expect, test } from 'vitest'

describe('test kata 1',()=>{
    test('devuelve 0 si no hay argumentos',()=>{
        expect(add("")).toBe(0);
    })
    test('convierte los strings en numero y se suman',()=>{
        expect(add('1,2,3')).toBe(6)
    })
     test('soporte para numeros negativos',()=>{
        expect(add("-1,-2,-3")).toBe(-6)
    })
     test('soporte para decimales',()=>{

        expect(add("2.1,2.1")).toBe(4.2)
    })
    test('soporte para delimitadores',()=>{
        expect(add("//;\n1;2;3;3")).toBe(9);
    })
    

   
})




