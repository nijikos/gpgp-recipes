// ---------- REACT/NEXT ----------
import { useEffect, useState } from "react";
import { Rubik } from "next/font/google";
// ---------- REDUX/CONTEXT ----------
// ---------- STYLE ----------
// ** ICONS **
// ---------- COMPONENTS ----------
import Sections from "@/components/Sections";
import Recipe from "@/components/Recipe";
// ---------- TYPES ----------
// ---------- LIBRARIES ----------
import { isEmpty } from "lodash";
// ---------- HELPERS ----------
import { pizzas } from "@/@db/pizzas";
import { searchByQuotes } from "@/helpers/search";
import Head from "next/head";
import Link from "next/link";
import useSmoothScroll from "@/hooks/useSmoothScroll";
import Iconsax from "@/components/Icon";

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
      let yes = searchByQuotes(searchTerm);
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
      className={`${rubik.variable} px-4 py-10 bg-primary-1 flex flex-col gap-8 max-w-lg mx-auto scroll-smooth`}
    >
      <Head>
        <title>Good Pizza Great Pizza Recipe Guide</title>
        <meta
          name='description'
          content='Search Good Pizza Great Pizza recipes based on the quotes from customers'
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
        <p className='text-center text-2xl mb-4'>Recipe Guide</p>
        <p className='text-center text-xs'>
          Based on{" "}
          <Link
            href='https://good-pizza-great-pizza.fandom.com/wiki/List_of_orders'
            target='_blank'
          >
            <span className='text-accent-4 hover:underline'>this</span>
          </Link>{" "}
          Good Pizza Great Pizza fandom wiki
        </p>
      </div>

      <div className='bg-primary-3 px-4 py-4 rounded-2xl'>
        <input
          autoFocus={true}
          placeholder='Search Quotes Here'
          className='bg-transparent w-full focus:outline-none text-primary-6 placeholder:text-primary-5'
          value={searchTerm}
          onChange={(e) => {
            setSetsearchTerm(e.target.value);
          }}
        />
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
