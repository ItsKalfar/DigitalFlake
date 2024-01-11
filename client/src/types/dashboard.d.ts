interface ICategories {
  _id: string;
  name: string;
  description: string;
  status: string;
}

interface IProducts {
  name: string;
  packSize: string;
  category: string;
  mrp: string;
  image: string;
  status: string;
}
