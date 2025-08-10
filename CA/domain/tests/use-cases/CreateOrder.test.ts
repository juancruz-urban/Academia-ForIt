import { describe, it, expect, vi } from "vitest";
import { Order } from "../../src/entities/Order";
import { CreateOrder } from "../../src/use-cases/CreateOrder";
import { OrderRepository } from "../../src/services/OrderRepository";
import { OrderProduct } from "../../src/entities/OrderProduct";

describe('expect create a order',()=>{

    it('deberia crear una order',async ()=>{

        const products:OrderProduct[] = [{id:'1',quantity: 2,price:100},{id:'2',quantity: 3,price:200},{id:'3',quantity: 1,price:500}]
        const totalProducts = products.reduce((acc,curr)=>acc+curr.price*curr.quantity,0)
        const mockOrder = new Order(1,1,products,totalProducts,'pending')

        const orderRepo:OrderRepository = {
            save:vi.fn().mockResolvedValue(mockOrder),
            findById:vi.fn(),
            update:vi.fn()
        }

        const createOrder = new CreateOrder(orderRepo)

        const result = await createOrder.execute(1,products)
        expect(result).toEqual(mockOrder)
        
    })





})