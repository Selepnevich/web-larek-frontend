export interface IProduct{
    id: string;
    title: string;
    description: string;
    price: number | null;
    image: string;
    category: string
}

export interface IActions {
  onClick: (event: MouseEvent) => void;
}