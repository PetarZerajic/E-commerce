interface IImage {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
}

export interface IProdcuts {
  id?: number;
  attributes: {
    title: string;
    img: IImage;
    img2: IImage;
    img3: IImage;
    isNew?: boolean;
    oldPrice: number;
    price: number;
    desc: string;
  };
  quantity: number;
}
