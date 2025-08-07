import {checkWinner} from '../kata05'
import { describe,test,expect } from "vitest";



let exampleBoard = [
  ["O", "X", "X"],
  ["O", "O", "X"],
  ["X", "O", "X"]
]
let exampleBoard2 = [
  ["O", "X", "X"],
  ["O", "O", "X"],
  ["X", "O", "O"]
]


describe('juego Tic Tac Toe',()=>{
    
     test('debe devolver el ganador',()=>{
        expect(checkWinner(exampleBoard)).toBe('X')
    })
    test('ganador en diagonal',()=>{
        expect(checkWinner(exampleBoard2)).toBe('O')
    })
})