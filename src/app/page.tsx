import Product from "../components/Product";
import { Lobster } from "next/font/google";
import { data } from "./assets/products.js";

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
            <div className="h-[85vh] flex flex-col items-center text-center text-[#EC174F] justify-center">
              <div className="flex flex-col items-center justify-between max-w-xl md:max-w-none md:gap-12 mt-[-5rem]">
                <div className="flex flex-col gap-5">
                  <h2 className="text-md px-4 md:text-2xl leading-tight">
                    El detalle perfecto para alegrar cualquier ocasión especial
                  </h2>
                  <h1 className="text-[4rem] helvetica-rounded md:text-[6rem] leading-none lg:text-[7rem]">
                    REGALOS IDEALES
                  </h1>
                </div>
                <div className="flex justify-between flex-col gap-5 w-5/6 mt-16 md:flex-row max-w-[40rem]">
                  <button className="px-[2rem] w-full text-lg lg:text-2xl md:text-2xl font-bold py-[0.8rem] lg:px-0 rounded-lg bg-[#EC174F] text-[#ffffff] border-[2px] border-[#EC174F] border-solid">
                    Cotiza tu regalo
                  </button>
                  <button className="px-[2rem] w-full text-lg lg:text-2xl md:text-2xl font-bold py-[0.8rem] lg:px-0 rounded-lg  border-[2px] border-[#EC174F] border-solid">
                    Mira nuestros productos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] circle-mask pt-[7rem] flex flex-col gap-3  justify-center items-center p-3">
          <div className="text-[#EC174F] flex flex-col justify-center items-center">
            <h2 className="text-[1.2rem]">
              El detalle para cualquier ocasión especial
            </h2>
            <h1 className="text-3xl helvetica-rounded text-center mt-3 leading-none">REGALOS IDEALES</h1>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 gap-y-10 sm:gap-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-screen-xl">
            {data.map((e: any) => {
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
