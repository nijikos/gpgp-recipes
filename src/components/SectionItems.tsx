import React, { useState } from "react";
import Recipe from "./Recipe";

type SectionItemsProps = { sectionItem: { name: string; items: [] } };

export default function SectionItems({ sectionItem }: SectionItemsProps) {
  const [showChild, setShowChild] = useState<boolean>(true);
  return (
    <div className=''>
      <button
        className='bg-primary-3 px-2 py-2 rounded-lg mb-2 w-full'
        onClick={() => {
          setShowChild(!showChild);
        }}
      >
        <p className='text-base '>{sectionItem.name}</p>
        <p className='text-xs text-primary-6 font-normal'>
          {showChild ? "click to hide" : "click to show"}
        </p>
      </button>

      {showChild ? (
        <div className='flex flex-col gap-8 bg-primary-1 py-6 rounded-lg'>
          {sectionItem.items.map((recipe: any, index: number) => {
            return <Recipe key={index} recipe={recipe} />;
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
