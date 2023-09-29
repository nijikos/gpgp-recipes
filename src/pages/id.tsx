// ---------- REACT/NEXT ----------
import { useEffect, useState } from "react";
import { Rubik } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
// ---------- HOOKS ----------
import useSmoothScroll from "@/hooks/useSmoothScroll";
// ---------- STYLE ----------
// ** ICONS **
// ---------- COMPONENTS ----------
import Sections from "@/components/Sections";
import Recipe from "@/components/Recipe";
import Iconsax from "@/components/Icon";
// ---------- TYPES ----------
// ---------- LIBRARIES ----------
import { isEmpty } from "lodash";
// ---------- HELPERS ----------
import { pizzas } from "@/@db/pizzasID";
import { searchByQuotes } from "@/helpers/search";

const rubik = Rubik({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "block",
  variable: "--font-rubik",
});

export default function Home() {
  const [searchTerm, setSetsearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const scrollToElement = useSmoothScroll();

  useEffect(() => {
    if (!isEmpty(searchTerm)) {
      let yes = searchByQuotes(searchTerm, pizzas);
      setSearchResults(yes);
      console.log(`yes`, { yes });
    } else {
      setSearchResults([]);
    }
    return () => {};
  }, [searchTerm]);
  return (
    <main
      id='mainwrapper'
      className={`${rubik.variable} px-4 py-10 bg-primary-1 flex flex-col gap-8 max-w-lg mx-auto scroll-smooth pb-96`}
    >
      <Head>
        <title>Good Pizza Great Pizza Recipe Guide</title>
        <meta
          name='description'
          content='Search Good Pizza Great Pizza recipes based on the dialogues from customers'
          key='desc'
        />
      </Head>

      {/* <Link href='#mainwrapper'> */}
      <div
        className='fixed bottom-4 right-4 w-12 h-12 rounded-full bg-accent-4 grid place-items-center cursor-pointer'
        onClick={() => {
          scrollToElement("mainwrapper");
        }}
      >
        <p className='text-sm text-white'>
          <Iconsax
            name='arrowup'
            strokeClassName='stroke-primary-6 hover:stroke-accent-3 transition'
          />
        </p>
      </div>
      {/* </Link> */}

      <div className='text-primary-5'>
        <p className='font-bold text-7xl pageTitle'>Good Pizza, Great Pizza</p>
        <p className='text-center text-2xl mb-4'>Pencarian Resep</p>
        <p className='text-center text-xs'>
          Berdasarkan daftar pesanan dari fandom Wiki Good Pizza Great Pizza{" "}
          <Link
            href='https://id-good-pizza-great-pizza.fandom.com/id/wiki/Daftar_pesanan'
            target='_blank'
          >
            <span className='text-accent-4 hover:underline'>ini</span>
          </Link>
        </p>
      </div>

      <div className='flex flex-row justify-end gap-2 text-xs text-primary-5'>
        <Link
          href='/'
          className='border border-primary-5 rounded-full px-3 py-1'
        >
          English
        </Link>
        <Link
          href='/id'
          className='border border-primary-5 rounded-full px-3 py-1'
        >
          Indonesian
        </Link>
      </div>

      <div className='bg-primary-3 px-4 py-4 rounded-2xl flex flex-row gap-2'>
        <input
          autoFocus={true}
          placeholder='Cari dialog disini (belum lengkap)'
          className='bg-transparent w-full focus:outline-none text-primary-6 placeholder:text-primary-5'
          value={searchTerm}
          onChange={(e) => {
            setSetsearchTerm(e.target.value);
          }}
        />
        <button
          className={`${searchTerm === "" ? "opacity-0" : ""}`}
          onClick={() => {
            setSetsearchTerm("");
          }}
        >
          <Iconsax
            name='closecircle'
            strokeClassName='stroke-primary-6 hover:stroke-primary-5 transition'
          />
        </button>
      </div>

      {!isEmpty(searchTerm) ? (
        isEmpty(searchResults) ? (
          <div className='px-6 py-4 rounded-2xl bg-primary-2'>
            <p>No Results</p>
          </div>
        ) : (
          <>
            {searchResults.map((result: any, index: number) => (
              <Recipe key={index} recipe={result} fromSearch={true} />
            ))}
          </>
        )
      ) : (
        Object.keys(pizzas).map((key: any, index: number) => (
          <div className='px-6 py-4 rounded-2xl bg-primary-2' key={index}>
            <p className='text-3xl font-bold text-primary-6 border-b border-primary-6 pb-2 mb-4 text-center'>
              {pizzas[key].name}
            </p>
            <div className=''>
              {pizzas[key].items.map((section: any, index: number) => (
                <Sections key={index} section={section} />
              ))}
            </div>
          </div>
        ))
      )}
    </main>
  );
}
