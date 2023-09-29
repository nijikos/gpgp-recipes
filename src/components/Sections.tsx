import React, { useState } from "react";
import SectionItems from "./SectionItems";

type SectionsProps = { section: { name: string; items: [] } };

export default function Sections({ section }: SectionsProps) {
  const [showChild, setShowChild] = useState<boolean>(true);
  return (
    <div className='border border-primary-4 px-2 py-2 rounded-lg mb-4'>
      <button
        className='py-2 rounded-lg mb-3 font-semibold bg-accent-3 w-full'
        onClick={() => {
          setShowChild(!showChild);
        }}
      >
        <p className='text-xl text-white text-center'>{section.name}</p>
        <p className='text-xs text-primary-3 font-normal'>
          {showChild ? "click to hide" : "click to show"}
        </p>
      </button>

      {showChild ? (
        <div className='flex flex-col gap-10'>
          {section.items.map((sectionItem: any, index: number) => {
            return <SectionItems key={index} sectionItem={sectionItem} />;
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
