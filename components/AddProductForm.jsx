"use client";

import React, { use, useState } from 'react'
import { Input } from './ui/input'
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import AuthModal from './ui/AuthModal';
import { addProduct } from '@/app/actions';
import { toast } from 'sonner';

const AddProductForm = ({user}) => {

  const[url,seturl]=useState("");
  const[loading,setloading]=useState(false);
  const[ShowAuthModal, setShowAuthModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user){
      setShowAuthModal(true);
      return;
    }
    
    setloading(true);

    const formdata = new FormData();
    formdata.append("url", url);

    const result = await addProduct(formdata);

    if(result.error){
      toast.error(result.error);
    }
    else{
      toast.success(result.message || "Product added successfully!");
      seturl("");
    }
    setloading(false);

  };


  return (
    <>
      <form onSubmit={handleSubmit} className=" w-full max-w-2xl mx-auto" >
        <div className="flex flex-col sm:flex-row gap-2 mt-6">
          <Input type="url" 
           value={url} 
           onChange={(e) => seturl(e.target.value)}
           placeholder="Paste product URL (Amazon, Walmart, etc.)" 
           className="h-12 text-base" 
           required 
           disabled={loading}/>
  
          <Button 
            type="submit" 
            className="h-12 bg-orange-500 hover:bg-orange-700" 
            disabled={loading}>
            {loading ? (
              <>
              <Loader2 className="w-4 h-4 animate-spin" />
              "Adding..." 
              </>
            ):(
             "Track price"
            )}
          </Button>
        </div>
      </form>

      {/* Auth model */}
      <AuthModal 
        isopen = {ShowAuthModal}
        onclose = {() => setShowAuthModal(false)}
      />



      
    </>
   );
}

export default AddProductForm


