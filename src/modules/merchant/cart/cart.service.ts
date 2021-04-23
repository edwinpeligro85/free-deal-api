import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductToCart } from './entities/products-to-cart.entity';
import { ProductService } from '../product/product.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { Modifier } from '../product/entities/modifier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly repo: Repository<Cart>,
    private readonly _product: ProductService,
  ) {}

  async create(dto: CreateCartDto) {
    const productsId = dto.items.map((item) => { return {id: item.id} });
    const products = await this._product.find({ where: productsId });

    // Se guarda el carrito
    const cart = new Cart();
    cart.name = dto.name;
    await cart.save();

    // Se guardan los productos en la tabla relacional
    products.forEach( (product) => {
      const cartItem = dto.items.find( item => item.id === product.id );

      const productsToCart = new ProductToCart();
      productsToCart.cart = cart;
      productsToCart.product = product;
      productsToCart.quantity = cartItem.quantity;

      // Selección de modificadores
      if (cartItem.modifiers) {
        const modifiers: Modifier[] = [];
        cartItem.modifiers.forEach( async (id) => {
          modifiers.push(
            await this._product.getModifiersById(id)
          );
        });
        productsToCart.modifiers = modifiers; 
      }

      productsToCart.save();
    }); 

    return cart;
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return this.repo.findOneOrFail(id);
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
