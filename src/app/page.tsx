import Product from "../components/Product";
import { Lobster } from "next/font/google";
import { data, data1 } from "./assets/products.js";

const lobster = Lobster({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export default function Home() {
  return (
    <>
      <header className=" main-bg bg-fixed flex flex-col items-center text-center text-[#EC174F]">
        <div className="w-[100%] bg-[#FCE8EA]/[0.7] backdrop-brightness-75">
          <p className={`${lobster.className}  mt-[1rem] text-[2.5rem]`}>
            Dulcina
          </p>
        </div>
      </header>
      <main>
        <div className="main-bg bg-fixed flex w-[100%] h-screen">
          <div className="w-[100%] bg-[#FCE8EA]/[0.7] backdrop-brightness-75">
            <div className="h-[85vh] flex flex-col items-center text-center text-[#EC174F]">
              <div className="flex flex-col items-center justify-between h-[14rem] mt-[15vh]">
                <div className="flex flex-col">
                  <h2 className="text-[1.2rem]">
                    El detalle perfecto para alegrar cualquier ocasión especial
                  </h2>
                  <h1 className="text-[4rem] helvetica-rounded">
                    REGALOS IDEALES
                  </h1>
                </div>
                <div className="flex justify-between flex-col gap-5 w-5/6 mt-5">
                  <button className="px-[2rem] font-extrabold py-[0.8rem] rounded-full bg-[#EC174F] text-[#ffffff] border-[2px] border-[#EC174F] border-solid">
                    Cotiza tu regalo
                  </button>
                  <button className="px-[2rem] font-extrazbold py-[0.8rem] rounded-full  border-[2px] border-[#EC174F] border-solid">
                    Mira nuestros productos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] circle-mask pt-[7rem] flex flex-col gap-3  justify-center items-center p-7">
          <div className="text-[#EC174F] flex flex-col justify-center items-center">
            <h2 className="text-[1.2rem]">
              El detalle para cualquier ocasión especial
            </h2>
            <h1 className="text-[3.9rem] helvetica-rounded text-left leading-none">REGALOS IDEALES</h1>
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            {data.map((e: any) => {
              return <Product product={e} key={e.id} />;
            })}
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            {data1.map((e: any) => {
              return <Product product={e} key={e.id} />;
            })}
          </div>
        </div>
        {/* <div className="h-screen">
        <div className="flex items-center justify-center">
          <div className="arc-mask w-[100%] h-[50rem]"></div>
        </div>
      </div> */}
        {/* <div className="h-screen">
        <div className="flex items-center justify-center">
          <div className="footer-mask w-[100%] h-[50rem]"></div>
          </div>
      </div> */}
        <div className="h-[10rem]"></div>
      </main>
      <footer></footer>
    </>
  );
}
