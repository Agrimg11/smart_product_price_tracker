import AddProductForm from "@/components/AddProductForm";
import { Button } from "@/components/ui/button";
import { Bell, LogIn, Rabbit, Shield, TrendingDown } from "lucide-react";
import Image from "next/image";
import  AuthButton  from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";
import ProductCard from "@/components/ProductCard";

export default async function Home() {

    const supabase= await createClient();

    const {  data: { user } } = await supabase.auth.getUser();

    // 1. Fetch the raw response object
    const productsResponse = user ? await getProducts() : null;
    
    // 2. Extract the actual array (fallback to an empty array if anything goes wrong)
    const products = productsResponse?.products || [];

    const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];
    

    return (
    <main className="min-h-screen  bg-linear-to-br from-orange-100 via-white to-orange-50" >
      <header className="bg-white/80  backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-3">
            <Image src={"/deal-drop-logo.png"} alt="Dealdrop Logo" width={600} height={200} className="h-10 w-auto"/>
          </div>

          {/* auth button */}

          <AuthButton user={user}/>

        </div>
      </header> 
      
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Track Prices, Save Big</h1>
          <p className="text-lg text-gray-700 mb-8">
            Deal Drop is your ultimate price tracking companion. Get instant alerts when prices drop on your favorite products across the web.
          </p>
         

          {/* add product form */}
          <AddProductForm user={user} />


          {/* features */}
          {products.length === 0 && (
            <div className="mt-8">

              <h2 className="text-2xl font-semibold mb-6">Why Choose Deal Drop?</h2>

              <div className="grid md:grid-cols-3 gap-8 mx-auto mt-10">
                {FEATURES.map(({icon :Icon ,title ,description}) => (

                  <div key={title} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-200">

                    <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-lg bg-orange-100">
                      <Icon className="w-7 h-8  text-orange-400"/>
                    </div>

                    <h3 className="text-lg font-medium mb-2">{title}</h3>
                    <p className="text-gray-600">{description}</p>

                  </div>
                ))}
              </div>
            </div> 
          )}
        </div>
      </section>

      {/* product list */}
      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          
         <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold mb-6">Your Tracked Products</h3>
         <span className="text-sm text-gray-500 mb-4 ">
          {products.length} {products.length === 1 ? "product" : "products"}
         </span>
         </div>
         
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {products.map((product )=> 
            <ProductCard key={product.id} product={product} />
          )}
          </div>


        </section>
      )}


      {/* Empty State */}
      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}








    </main>


    );
  
}
