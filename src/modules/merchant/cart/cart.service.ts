import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductToCart } from './entities/products-to-cart.entity';
import { ProductService } from '../product/product.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { Modifier } from '../product/entities/modifier.entity';
import { Repository } from 'typeorm';
import { CartItem } from './interfaces/cart-item.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly repo: Repository<Cart>,
    @InjectRepository(ProductToCart)
    private readonly repoProductToCart: Repository<ProductToCart>,
    private readonly _product: ProductService,
  ) {}

  async create(dto: CreateCartDto): Promise<Cart> {
    // Se guarda el carrito
    const cart = new Cart();
    cart.name = dto.name;
    await cart.save();

    return this.preSave(cart, dto.items);
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return this.repo.findOneOrFail(id);
  }

  async update(id: number, dto: UpdateCartDto): Promise<Cart> {
    const cart = await this.repo.findOneOrFail(id);

    // Remover items del carro
    const productsToCart = await this.repoProductToCart.find({
      where: { cart: id },
    });
    await this.repoProductToCart.softRemove(productsToCart);

    return this.preSave(cart, dto.items);
  }

  async remove(id: number) {
    const cart = await this.repo.findOneOrFail(id);
    return cart.softRemove();
  } 

  private async preSave(cart: Cart, items: CartItem[]): Promise<Cart> {
    const productsId = items.map((item) => {
      return { id: item.id };
    });
    const products = await this._product.find({ where: productsId });

    if (products?.length !== productsId?.length) return cart;

    // Se guardan los productos en la tabla relacional
    products.forEach(async (product) => {
      const cartItem = items.find((item, index) => ((item.id === products[index].id) || (item.id === product.id)));
      // const cartItem = items[index];

      const productsToCart = new ProductToCart();
      productsToCart.cart = cart;
      productsToCart.product = product;
      productsToCart.quantity = cartItem.quantity;

      // Selección de modificadores
      if (cartItem.modifiers) {
        const modifiers: Modifier[] = [];

        for (const id of cartItem.modifiers) {
          modifiers.push(await this._product.getModifiersById(id));
        }

        productsToCart.modifiers = modifiers;
      }

      productsToCart.save();
    });

    return cart;
  }
}
