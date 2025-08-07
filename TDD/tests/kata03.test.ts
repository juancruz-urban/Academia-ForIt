import { describe,test,expect } from "vitest";
import {toRoman} from '../kata03'

describe('transformar numeros romanos',()=>{
    test('convertir a romanos',()=>{
        expect(toRoman(3)).toBe('III')
    })
    test('pasar 0 como argumento',()=>{
        expect(toRoman(0)).toBe('')
    })
    test('pasar negativos',()=>{
        expect(toRoman(-3)).toBe('')
    })
    test('pasar decimales',()=>{
         expect(toRoman(4.2)).toBe('IV')
         expect(toRoman(4.8)).toBe('V')
    })
})