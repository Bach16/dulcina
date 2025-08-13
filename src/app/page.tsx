"use client";

import Product from "../components/Product";
import { Lobster } from "next/font/google";
import { data } from "./assets/products.js";
import { getProductos } from "./lib/helpers/graphql";
import { useState, useEffect, useCallback } from "react";

const lobster = Lobster({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

interface HomeProps {
  searchParams: Record<string, string | string[]>;
}

export default function Home({ searchParams }: HomeProps) {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Función para cargar productos
  const loadProductos = useCallback(async (page: number = 1, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const params = {
        ...searchParams,
        page: page.toString(),
        per_page: "20"
      };

      const result = await getProductos(params);
      
      if (append) {
        setProductos(prev => [...prev, ...result.productos]);
      } else {
        setProductos(result.productos);
      }
      
      setHasNextPage(result.pageInfo?.hasNextPage || false);
      setCurrentPage(page);
      
    } catch (error) {
      console.error("Error loading productos:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [searchParams]);

  // Cargar productos iniciales
  useEffect(() => {
    loadProductos(1, false);
  }, [loadProductos]);

  // Función para detectar scroll
  const handleScroll = useCallback(() => {
    if (loadingMore || !hasNextPage) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Si estamos cerca del final (200px antes del final)
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      loadProductos(currentPage + 1, true);
    }
  }, [loadingMore, hasNextPage, currentPage, loadProductos]);

  // Agregar/remover listener de scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-[#d21144] text-xl">Cargando productos...</div>
      </div>
    );
  }

  return (
    <>
      <header className=" main-bg bg-fixed flex flex-col items-center text-center text-[#d21144] ">
        <div className="w-[100%] bg-[#FCE8EA]/[0.7] backdrop-brightness-75 pb-[80px]">
          <p className={`${lobster.className}  mt-[1rem] text-[2.5rem]`}>
            Dulcina
          </p>
        </div>
      </header>
      <main>
        <div className="main-bg bg-fixed flex w-[100%] h-screen">
          <div className="w-[100%] bg-[#FCE8EA]/[0.7] backdrop-brightness-75">
            <div className="h-[85vh] flex flex-col items-center text-center text-[#d21144] justify-center">
              <div className="flex flex-col items-center justify-between max-w-xl md:max-w-none md:gap-12 mt-[-5rem]">
                <div className="flex flex-col gap-5 justify-center items-center">
                  <h1 className="text-[3rem] helvetica-rounded md:text-[5rem] leading-none lg:text-[5rem]">
                    Arreglos de chocolates en quito
                  </h1>
                  <div className="w-[60%] mt-[8px]">
                    <h2 className=" text-[16px] px-4 md:text-[18px] leading-tight">
                      Descubre Arreglos de chocolates en quito. Entregas
                      rápidas, arreglos personalizadas y el sabor perfecto para
                      decir lo que sientes.
                    </h2>
                  </div>
                </div>
                <div className="flex justify-between flex-col gap-5 w-5/6 mt-16 md:flex-row max-w-[40rem]">
                  <a
                    href="https://wa.link/c553sx"
                    className="px-[2rem] w-full text-[16px] font-bold py-[0.8rem] lg:px-0"
                  >
                    <button className="px-[2rem] w-full font-bold py-[0.8rem] lg:px-0 rounded-lg bg-[#d21144] text-[#ffffff] border-[2px] border-[#d21144] border-solid">
                      Cotiza tu regalo
                    </button>
                  </a>
                  <a
                    href="#products"
                    className="px-[2rem] w-full text-[16px] font-bold py-[0.8rem] lg:px-0"
                  >
                    <button className="px-[2rem] w-full font-bold py-[0.8rem] lg:px-0 rounded-lg  border-[2px] border-[#d21144] border-solid">
                      Mira nuestros productos
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] pt-[7rem] flex flex-col gap-3  justify-center items-center p-3">
          <div className="text-[#d21144] flex flex-col justify-center items-center">
            <h3 className="text-[1.2rem] text-center">
              Nuestros Arreglos de Chocolates en Quito
            </h3>
            <h2 className="text-5xl helvetica-rounded text-center mt-3 mb-10 leading-none">
              Elige el detalle perfecto
            </h2>
          </div>
          <div
            id="products"
            className="w-[85%] grid grid-cols-2 gap-4 gap-y-10 sm:gap-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
          >
            {productos.map((e: any) => {
              return <Product product={e} key={e.id} />;
            })}
          </div>
          
          {/* Indicador de carga */}
          {loadingMore && (
            <div className="flex justify-center items-center py-8">
              <div className="text-[#d21144] text-lg">Cargando más productos...</div>
            </div>
          )}
          
          {/* Mensaje cuando no hay más productos */}
          {!hasNextPage && productos.length > 0 && (
            <div className="flex justify-center items-center py-8">
              <div className="text-[#d21144] text-lg">Has visto todos nuestros productos</div>
            </div>
          )}
        </div>
        
        <div className="h-[10rem]"></div>
      </main>
      <footer></footer>
    </>
  );
}