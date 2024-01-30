export interface Product {
    productId: string,
    code: string,
    name: string,
    price: string,
    isSelected: boolean,
    isEdit: boolean;
}
  export const ProductColumns = [
    {
      key: 'isSelected',
      type: 'isSelected',
      label: '',
    },

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
      type: 'string',
      label: 'Price',
      required: true,
      pattern: "/^(?:\d*\.\d{1,2}|\d+)$/)]"
    },
    
    {
      key: 'isEdit',
      type: 'isEdit',
      label: '',
    },
  ];
  