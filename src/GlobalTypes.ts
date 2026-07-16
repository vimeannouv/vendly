export interface Item {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface OrderedItem extends Item {
  quantity: number;
}
