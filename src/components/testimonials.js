import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Star } from "@phosphor-icons/react";
export const Testimonials = () =>{
    const [mainTestimonial,setMainTestimonial] = useState(1);
    const {data,isLoading,error} = useQuery({
        queryKey : ['users'],
        queryFn : () => fetch('./local-json/testimonials.json').then(res => res.json())
    })
    console.log(data);
    
    const slide = (id) =>{
        if(id !== mainTestimonial){
            setMainTestimonial(id);
        }
    }
    return(
        <div class="md:relative">
            <div class="flex justify-center items-center my-3">
                <div class="bg-red-600 p-2 rounded-xl text-white">
                    Our fulfilled customers' testimonials
                </div>
            </div>
            <div>
                {data &&
                 data.map(user =>{
                    return(
                        <div class={`transition-all duration-500  w-3/4 md:w-1/4 inline-block border border-black md:absolute
                        ${mainTestimonial === user.id || mainTestimonial + 1 === user.id || mainTestimonial - 1 === user.id
                             ? "" : "md:hidden"}
                        ${mainTestimonial === user.id ? "md:left-1/2 md:-translate-x-1/2 md:mt-5" : ""}
                        ${mainTestimonial + 1 === user.id ? "md:left-3/4" : ""}
                        ${mainTestimonial - 1 === user.id ? "md:left-0" : ""}
                         rounded-3xl p-5 flex flex-col mx-auto my-5 md:mx-0 md:my-0`}
                         onClick={()=>slide(user.id)}>
                            <p>{user.text}</p>
                            <div class="flex ">
                                <div class="flex mt-2">
                                <Star size="23" color="gold" weight="fill"/>
                                <Star size="23" color="gold" weight="fill"/>
                                <Star size="23" color="gold" weight="fill"/>
                                <Star size="23" color="gold" weight="bold"/>
                                <Star size="23" color="gold" weight="bold"/>
                                </div>
                            <div class='ml-auto'>
                                
                                <span>{user.user}</span>
                                <img src={user.image} class="w-12 h-12 ml-2  inline-block rounded-full border border-black" />
                            </div>
                            </div>
                        </div>
                    )
                 })}
            </div>
        </div>
    )
}