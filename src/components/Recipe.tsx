import React from "react";

type RecipeProps = {
  recipe: { name: string; quotes: [] };
  fromSearch?: boolean;
};

export default function Recipe({ recipe, fromSearch }: RecipeProps) {
  return (
    <div
      className={`${fromSearch ? "bg-primary-2 rounded-xl px-4 py-6" : "ml-4"}`}
    >
      <p className='font-bold text-xs mb-2'>{recipe.name}</p>
      <div className='flex flex-col gap-4'>
        {recipe.quotes.map((item: any, index: number) => {
          return (
            <p key={index} className='ml-4 text-xs'>
              {`"`}
              {item}
              {`"`}
            </p>
          );
        })}
      </div>
    </div>
  );
}
