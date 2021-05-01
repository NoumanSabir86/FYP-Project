import { Button } from "@material-ui/core";
import namor from "namor";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newProduct = () => {
  const statusChance = Math.random();
  return {
    product: "Asus",
    category: "Mango",
    stock: Math.floor(Math.random() * 30),
    price: Math.floor(Math.random() * 100),
    sellPrice: Math.floor(Math.random() * 100),
    action: "",
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newProduct(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
