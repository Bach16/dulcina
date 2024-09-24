import Link from "next/link";
import { FC } from "react";

interface Props {
  product: any;
}

const Product:FC<Props> = ({product}) => {
  return (
    <div id="product-container" className="text-[#EC174F] w-full p-3 rounded-2xl md:shadow-none">
      <div className="overflow-hidden">
        <div>
          <img src={product?.image} alt={product?.name} id="product-mask" className=" h-[19rme] w-[19rem]"/>
        </div>
      </div>
      <div className="flex flex-col ">
        <div>
            <h3 className="text-[1.3rem] font-bold leading-tight mt-3">{product?.name}</h3>
            <p className="text-[1rem]">$ {product?.price}</p>
        </div>
        <a className="mt-[0.6rem] w-[101%] " target="_blank" rel="noopener noreferrer" href={product?.link}>
        <button id="product-button" className="border-solid font-semibold border-[2px] border-[#EC174F] w-full rounded-2xl py-[0.5rem]">Comprar</button>
        </a>
      </div>
    </div>
  );
};

export default Product;
