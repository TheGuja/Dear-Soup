'use client'

export default function Home() {  
  return (
    <div className="min-h-screen">
      <section className="min-h-[60vh] flex items-center justify-center bg-stone-950 text-white px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center">Dear Soup</h1>
      </section>
      <section className="py-20 flex items-center justify-center bg-white text-black px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center">Journal With Loved Ones</h2>
      </section>
    </div>    
  );
}
