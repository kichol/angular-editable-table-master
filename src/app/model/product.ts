export interface Product {
    productId: string,
    code: string,
    name: string,
    price: number,
    isSelected: boolean,
    isEdit: boolean;
}
  export const ProductColumns = [
    {
      key: 'isSelected',
      type: 'isSelected',
      label: '',
    },
    // {
    //     key: 'productId',
    //     type: 'text',
    //     label: 'ProductId',
    //     required: true
    // },
    {
      key: 'code',
      type: 'text',
      label: 'Code',
      required: true,
    },
    {
      key: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      key: 'price',
      type: 'number',
      label: 'Price',
      required: true,
    //   pattern: '/^(?:\d*\.\d{1,2}|\d+)$/)]',
    },
    
    {
      key: 'isEdit',
      type: 'isEdit',
      label: '',
    },
  ];
  