import {score} from '../kata06'
import { describe,test,expect } from "vitest";



describe('juego de bolos',()=>{
    test('el scrore debe ser 300',()=>{
        expect(score(["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"])).toBe(300)
    })//["45", "54", "36", "27", "09", "63", "81", "18", "90", "72"]
    test('soporte para spares',()=>{
        expect(score(["9/", "9/", "9/", "9/", "9/", "9/", "9/", "9/", "9/", "9/", "9"])).toBe(190)
    })
    test('soporte para tiradas variables',()=>{
        expect(score(["45", "54", "36", "27", "09", "63", "81", "18", "90", "72"])).toBe(90)
    })
})