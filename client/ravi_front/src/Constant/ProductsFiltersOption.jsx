const ratingOption = [5, 4, 3, 2, 1];
const categoryOptionAv = [
  { cate: "Electronics", checked: false },
  { cate: "accessories", checked: false },
  { cate: "clothing", checked: false },
];
const brandOptionAv = [
  { brand: "Apple", checked: false },
  { brand: "ideaPad", checked: false },
  { brand: "aldo", checked: false },
  { brand: "supcase", checked: false },
  { brand: "gopgan", checked: false },
  { brand: "adidas", checked: false },
];

const priceRanges = [
  { value: '', label: '-- Select price range --' },
  { value: '200-1000', label: '₹200 - ₹1000' },
  { value: '15000-20000', label: '₹15000 - ₹20000' },
  { value: '400600-600000', label: '₹400600 - ₹600000' },
  { value: '50000-60000', label: '₹50000 - ₹60000' },
];


export { ratingOption, categoryOptionAv, brandOptionAv,priceRanges };
