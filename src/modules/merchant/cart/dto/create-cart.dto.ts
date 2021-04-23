import { ApiProperty } from "@nestjs/swagger";
import { CartItem } from "../interfaces/cart-item.interface";

export class CreateCartDto {
    
    @ApiProperty({
        example: 'Shopping Cart'
    })
    name: string

    @ApiProperty({
        example: [{
            id: 1,
            quantity: 2,
            modifiers: [1,2]
        }]
    })
    items: CartItem[];
}
