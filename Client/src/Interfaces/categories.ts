export interface ICategories {
  id: number;
  attributes: {
    categories: {
      data: [
        {
          attributes: {
            title: string;
            desc: string;
          };
        }
      ];
    };
    title: string;
  };
}
