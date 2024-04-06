import redCar from "./photos/red-car.png";
import blankPhone from './photos/PngItem_5110486.png';
import fillPhone from './photos/IMG_20240405_191356.jpg';
import playStore from './photos/google-play-badge-logo-svgrepo-com.svg';
import appStore from './photos/download-on-the-app-store-apple-logo-svgrepo-com.svg';
import fixedPhoto from './photos/Untitled.png';
import xLogo from './photos/sl_z_072523_61700_08.jpg';
import gmailLogo from './photos/gmail-icon-logo-svgrepo-com.svg';
import linkedinLogo from './photos/linkedin-svgrepo-com.svg';
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { v4 } from "uuid";
import { VehicleCard } from "./components/vehicle-car";
import {
  CaretDown,
  MapPin,
  Car,
  CalendarBlank,
  CreditCard,
  ThumbsUp,
  Tag,
  User,
  Headset,
  List,
  GooglePlayLogo,
  AppStoreLogo
} from "@phosphor-icons/react";
import { CaretUp } from "@phosphor-icons/react/dist/ssr";
import visaCard from "./photos/visa-logo-svgrepo-com.svg";
import masterCard from "./photos/mastercard-svgrepo-com.svg";
import { Testimonials } from "./components/testimonials";
import { Budgeting } from "./components/budgeting";

function App() {
  const [carPicker, setCarPicker] = useState(false);
  const [offCanvas, setOffCanvas] = useState(false);
  const [aboutUsFirst,setAboutUsFirst] = useState(false);
  const [aboutUsSecond,setAboutUsSecond] = useState(false);
  const [pickedVehicle, setPickedVehicle] = useState(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["cars"],
    queryFn: () =>
      fetch("../local-json/fakecars.json").then((res) => res.json()),
  });


  const dummy = useRef(null);
  const offCanvasDummy = useRef(null);
  const aboutUsFirstDummy = useRef(null);
  const aboutUsSecondDummy = useRef(null);
  const snapBackCar = useRef();
  const snapBackVehicles = useRef();
  
  useEffect(() => {
    const observer1 = new IntersectionObserver((entries)=>{
      
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          setAboutUsFirst(true)
        }else{
          setAboutUsFirst(false)
        }
      })
    
  },{
    threshold : 0.2
  })
  const observer2 = new IntersectionObserver((entries)=>{
      
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
        setAboutUsSecond(true)
      }else{
        setAboutUsSecond(false)
      }
    })
  
},{
  threshold : 0.2
})
  
  if(aboutUsFirstDummy.current) observer1.observe(aboutUsFirstDummy.current);
  if(aboutUsSecondDummy.current) observer2.observe(aboutUsSecondDummy.current);

  return () => {
    observer1.disconnect();
    observer2.disconnect();
  }
  })
  useEffect(() => {
    const closeOffCanvas = (event) => {
      if (!offCanvasDummy.current?.contains(event.target)) {
        setOffCanvas(false);
      }
    };

    window.addEventListener("mousedown", closeOffCanvas);

    return () => {
      window.removeEventListener("mousedown", closeOffCanvas);
    };
  },[offCanvasDummy]);
  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!dummy.current?.contains(event.target)) {
        setCarPicker(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [dummy]);

  if (isLoading) return <div>Data is fetching</div>;
  if (error) return <div>An error occured</div>;
  let rentPrice = null;
  if (pickedVehicle) {
    rentPrice = pickedVehicle.price * (1 / 100);
  } else {
    rentPrice = data[0].price * (1 / 100);
  }

  return (
    <div>
      <span
        ref={offCanvasDummy}
        class={`w-3/4 h-full bg-white z-30 md:hidden ${
          offCanvas ? "translate-x-0" : "-translate-x-full hidden"
        } fixed flex flex-col transition-all duration-300`}
      >
        <span class="mx-auto text-red-500 p-2 mb-5">Rentalot</span>
        <ul class="mx-auto">
          <li class="my-3 cursor-pointer">Home</li>
          <li class="my-3 cursor-pointer">About</li>
          <li class="my-3 cursor-pointer">Contact Us</li>
          <li class="my-3 cursor-pointer">Pricing</li>
        </ul>
      </span>
      <span
        class={`w-full h-screen bg-black md:hidden opacity-40 ${
          offCanvas ? "" : "hidden"
        }  z-20 fixed`}
      ></span>

      <div>
        <div
          ref={offCanvasDummy}
          class="flex shadow-lg text-xl py-4 fixed w-full z-20 bg-white"
        >
          <span class="ml-10 text-red-500 p-2 ">Rentalot</span>

          <ul class="list-none mx-auto sm:flex hidden">
            <li class="mx-2 md:mx-5 p-2  transition-all rounded-2xl overflow-hidden inline-flex bg-white border-stone-700 border  relative group hover:cursor-pointer">
              <span class="absolute justify-center transition-all left-0 top-0 rounded-2xl bg-red-600 w-full h-full text-center scale-0 group-hover:scale-100"></span>
              <span class="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                Home
              </span>
            </li>

            <li class="mx-2 md:mx-5 p-2  transition-all rounded-2xl overflow-hidden inline-flex bg-white border-stone-700 border  relative group hover:cursor-pointer">
              <span class="absolute justify-center transition-all left-0 top-0 rounded-2xl bg-red-600 w-full h-full text-center scale-0 group-hover:scale-100"></span>
              <span class="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                About
              </span>
            </li>
            <li class="mx-2 md:mx-5 p-2  transition-all rounded-2xl overflow-hidden inline-flex bg-white border-stone-700 border  relative group hover:cursor-pointer">
              <span class="absolute justify-center transition-all left-0 top-0 rounded-2xl bg-red-600 w-full h-full text-center scale-0 group-hover:scale-100"></span>
              <span class="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                Contact Us
              </span>
            </li>
            <li class="mx-2 md:mx-5 p-2  transition-all rounded-2xl overflow-hidden inline-flex bg-white border-stone-700 border  relative group hover:cursor-pointer">
              <span class="absolute justify-center transition-all left-0 top-0 rounded-2xl bg-red-600 w-full h-full text-center scale-0 group-hover:scale-100"></span>
              <span class="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                Pricing
              </span>
            </li>
          </ul>
          <div class="sm:hidden ml-auto">
            <List
              size="30"
              class="mt-2 mr-3"
              onClick={() => setOffCanvas(!offCanvas)}
            />
          </div>
        </div>
        <div>
          <div class="flex flex-col">
            <div class="flex flex-col-reverse md:flex-col-reverse lg:flex-row ">
              <aside class=" w-1/2 md:w-1/4 mx-auto mt-auto my-10 lef-1/4 md:top-0">
                <div class="font-bold ">
                <span class="text-red-600">Rent</span> from us to save <span class="text-red-600">BIG</span> on
                expenses.
                </div> No need to come to the establishment to pick up the
                vehicle. Choose your drop off place,put it payment info and our
                employees will come drop off your vehicle of choice.
              </aside>

              <img src={redCar} class="w-1/2 h-auto mx-auto mt-20 md:mb-auto" />
            </div>
          </div>
          <div class="flex flex-col">
            <div class="flex  justify-center items-center mb-3">
              <div class="bg-red-600 p-2 rounded-xl text-white">
                Make it happens in 4 steps
              </div>
            </div>
            <div class="grid grid-cols-2 gap-5 md:grid-cols-4">
              <div class="mx-auto text-center flex flex-col">
                <Car class="size-20 text-zinc-200 mx-auto border border-white rounded-xl shadow-lg bg-red-500" />
                <div class="text-xl font-bold mb-5">Select a vehicle</div>
                <div>
                  Select directly from our rental fleet or search and find to
                  your liking
                </div>
                <div
                  class="bg-red-500 text-white m-2 p-2 cursor-pointer"
                  onClick={() =>
                    snapBackVehicles.current.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  Check out our rental fleet
                </div>
                <div
                  class="bg-red-500 text-white m-2 p-2 cursor-pointer"
                  onClick={() =>
                    snapBackCar.current.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Search and Pick
                </div>
              </div>
              <div class="mx-auto text-center flex flex-col">
                <MapPin class="size-20 text-zinc-200 mx-auto border border-white rounded-xl shadow-lg bg-red-500" />
                <div class="text-xl font-bold mb-5">
                  Pick a drop off place and date
                </div>

                <div>
                  Pick a drop off place and date for our employee to deliver the
                  vehicle
                </div>
                <div class="mt-auto">
                  <div
                    class="bg-red-500 text-white m-2 p-2 cursor-pointer"
                    onClick={() =>
                      snapBackCar.current.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Date and Place
                  </div>
                </div>
              </div>
              <div class="mx-auto text-center flex flex-col">
                <CreditCard class="size-20 text-zinc-200 mx-auto border border-white rounded-xl shadow-lg bg-red-500" />
                <div class="text-xl font-bold mb-5">Put in billing infos</div>

                <div>
                  Put in credit card or debit card infos for your convenience
                </div>
                <div class="mt-auto">
                  <div
                    class="bg-red-500 text-white m-2 p-2 cursor-pointer"
                    onClick={() =>
                      snapBackCar.current.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Pay it your way
                  </div>
                </div>
              </div>
              <div class="mx-auto text-center flex flex-col">
                <ThumbsUp class="size-20 text-zinc-200 mx-auto border border-white rounded-xl shadow-lg bg-red-500" />
                <div class="text-xl font-bold mb-5">Book your car</div>

                <div>Finish putting in infos and enjoy your vehicle</div>
                <div class="mt-auto">
                  <div class="bg-red-500 text-white m-2 p-2">
                    Enjoy the vehicle
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="m-10 relative h-auto flex md:border md:border-black rounded-lg flex-col md:flex-row">
          <div class="mx-auto my-5">
            <div class="" ref={dummy}>
              <Car class="inline-block size-5 m-1" />
              <input
                type="text"
                class="rounded-md mb-0.5 border-black border"
                onClick={() => setCarPicker(!carPicker)}
                placeholder={
                  pickedVehicle
                    ? pickedVehicle.make + " " + pickedVehicle.model
                    : data[0].make + " " + data[0].model
                }
              />

              {carPicker ? (
                <CaretUp
                  class="inline-block m-1 size-5 cursor-pointer"
                  onClick={() => setCarPicker(!carPicker)}
                />
              ) : (
                <CaretDown
                  class="inline-block m-1 size-5 cursor-pointer"
                  onClick={() => setCarPicker(!carPicker)}
                />
              )}
              {carPicker && (
                <ul class="ml-7 absolute overflow-y-scroll border-2 h-full bg-white  border-black rounded border-t-0">
                  {data &&
                    data.map((car) => {
                      return (
                        <li
                          class="m-2 cursor-pointer"
                          onClick={() => {
                            setPickedVehicle(car);
                            setCarPicker(!carPicker);
                          }}
                        >
                          {car.make} {car.model}
                        </li>
                      );
                    })}
                </ul>
              )}
              <div class="my-5">
                <MapPin class="inline-block size-5 m-1" />
                <input
                  type="text"
                  class="rounded-md mb-0.5 border border-black"
                  placeholder="Pick up place"
                />
              </div>
              <div class="my-5">
                <CalendarBlank class="inline-block size-5 m-1" />
                <input
                  type="text"
                  class="rounded-md mb-0.5 border-black border"
                  placeholder="Pick up date"
                />
              </div>
              <div class="my-5">
                <CalendarBlank class="inline-block size-5 m-1" />
                <input
                  type="text"
                  class="rounded-md mb-0.5 border-black border"
                  placeholder="Drop off date"
                />
              </div>
              <div class="my-5">
                <span class="inline-block size-5 m-1"></span>
                <input
                  type="text"
                  class="rounded-md mb-0.5 border-black border"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                />
                <div>
                  <span class="inline-block size-5 m-1"></span>
                  <img
                    src={visaCard}
                    class="inline-block w-10 h-10 m-2 cursor-pointer"
                  />
                  <img
                    src={masterCard}
                    class="inline-block w-10 h-10 m-2 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="mx-auto h-1/2 w-1/3" ref={snapBackCar}>
            {pickedVehicle ? (
              <img src={pickedVehicle.image} class="" />
            ) : (
              <img src={data[0].image} class="" />
            )}
          </div>
          <div class="mx-auto mb-2">
            {pickedVehicle ? (
              <ul class="border border-black mt-5 ">
                <li class="border-b border-black p-2 text-center bg-red-500 text-white">
                  ${rentPrice} / per month
                </li>
                <li class="grid p-2 border-b border-black grid-cols-2">
                  <span class="border-r border-black border-collapse">
                    Model
                  </span>

                  <span class="border-l border-black border-collapse pl-5">
                    {pickedVehicle.model}
                  </span>
                </li>
                <li class="grid p-2 border-b border-black grid-cols-2">
                  <span class="border-r border-black border-collapse">
                    Make
                  </span>

                  <span class="border-l border-black border-collapse pl-5">
                    {pickedVehicle.make}
                  </span>
                </li>
                <li class="grid p-2 border-b border-black grid-cols-2">
                  <span class="border-r border-black border-collapse">
                    Year
                  </span>

                  <span class="border-l border-black border-collapse pl-5">
                    {pickedVehicle.year}
                  </span>
                </li>
                <li class="grid p-2 border-b border-black grid-cols-2">
                  <span class="border-r border-black border-collapse">
                    Horsepower
                  </span>

                  <span class="border-l border-black border-collapse pl-5">
                    {pickedVehicle.horsepower}
                  </span>
                </li>
                <li class="grid p-2 border-b border-black grid-cols-2">
                  <span class="border-r border-black border-collapse pt-5">
                    Features
                  </span>

                  <span class="border-l border-black border-collapse pl-5">
                    <div>{pickedVehicle.features[0]}</div>
                    <div>{pickedVehicle.features[1]}</div>
                    <div>{pickedVehicle.features[2]}</div>
                  </span>
                </li>
              </ul>
            ) : (
              <ul class="border border-black mt-5 ">
                <li class="border-b border-black p-2 text-center bg-red-500 text-white">
                  ${rentPrice} / per month
                </li>
                <li class="grid p-2 border-b border-black grid-cols-2">
                  <span class="border-r border-black border-collapse">
                    Model
                  </span>

                  <span class="border-l border-black border-collapse pl-5">
                    {data[0].model}
                  </span>
                </li>
                <li class="grid p-2 border-b border-black grid-cols-2">
                  <span class="border-r border-black border-collapse">
                    Make
                  </span>

                  <span class="border-l border-black border-collapse pl-5">
                    {data[0].make}
                  </span>
                </li>
                <li class="grid p-2 border-b border-black grid-cols-2">
                  <span class="border-r border-black border-collapse">
                    Year
                  </span>

                  <span class="border-l border-black border-collapse pl-5">
                    {data[0].year}
                  </span>
                </li>
                <li class="grid p-2 border-b border-black grid-cols-2">
                  <span class="border-r border-black border-collapse">
                    Horsepower
                  </span>

                  <span class="border-l border-black border-collapse pl-5">
                    {data[0].horsepower}
                  </span>
                </li>
                <li class="grid p-2 border-b border-black grid-cols-2">
                  <span class="border-r border-black border-collapse pt-5">
                    Features
                  </span>

                  <span class="border-l border-black border-collapse pl-5">
                    <div>{data[0].features[0]}</div>
                    <div>{data[0].features[1]}</div>
                    <div>{data[0].features[2]}</div>
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div>
          <div class="flex flex-row justify-center items-center">
            <div class="my-7 mx-auto p-2 transition-all rounded-2xl overflow-hidden inline-flex bg-white border-stone-700 border  relative">
              <span class="absolute justify-center transition-all left-0 top-0 rounded-2xl bg-red-600 w-full h-full text-center"></span>
              <span class=" w-full transition-colors duration-300 ease-in-out text-white z-10">
                Our Rental Fleet
              </span>
            </div>
          </div>
          <VehicleCard
            snapBackVehicles={snapBackVehicles}
            cars={data}
            setPickedVehicle={setPickedVehicle}
            snapBackCar={snapBackCar}
          />
        </div>
        <div class="">
          <Testimonials />
        </div>
        <div class="sm:mt-5 md:mt-[500px] lg:mt-96 flex">
          <img
            src={redCar}
            class="w-1/2 h-auto mx-auto hidden md:inline-block  md:mb-auto scale-x-[-1]"
          />
          <div class="mx-auto">
            <div class="my-5 flex flex-col md:flex-row">
              <Tag
                size="50"
                color="red"
                weight="fill"
                class="my-auto mx-auto md:mr-5 border shadow-lg px-2 rounded-lg bg-gray-200"
              />
              <div class=" flex flex-col">
                <h2 class="font-bold text-lg mx-auto">Best prices to be found</h2>
                <p class="font-light mx-auto">
                  A deal for every budget range. Found a better,cheaper deal
                  elsewhere?Contact us and negotiate a deal to your liking or
                  refund 100% no questions asked.
                </p>
              </div>
            </div>
            <div class="my-5 flex flex-col md:flex-row">
              <User
                size="70"
                color="red"
                weight="fill"
                class="my-auto mx-auto md:mr-5 border shadow-lg px-2  rounded-lg bg-gray-200"
              />
              <div class=" flex flex-col">
                <h2 class="font-bold text-lg mx-auto">Best services around</h2>
                <p class="font-light mx-auto">
                  We intend to bring the best experience to you by simplifying
                  the steps to rent our vehicles.We deliver the vehicle to your
                  desire Location and Date for your convenience.After rental
                  time limit has expired,our employee will come retrieve the
                  vehicle using the GPS.
                </p>
              </div>
            </div>
            <div class="my-5 flex flex-col md:flex-row">
              <Headset
                size="60"
                color="red"
                weight="fill"
                class="my-auto mx-auto md:mr-5 border shadow-lg px-2 rounded-lg bg-gray-200"
              />
              <div class=" flex flex-col">
                <h2 class="font-bold text-lg mx-auto">24 Hours Support</h2>
                <p class="font-light mx-auto">
                  24 hours customer support for your convenience.Call our
                  customer support for booking,renting and inquiring about our
                  deals and services.10/10 customer service.100% customer
                  satisfaction guaranteed.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Budgeting
            data={data}
            setPickedVehicle={setPickedVehicle}
            snapBackCar={snapBackCar}
          />
        </div>
        <div class="overflow-x-hidden">
          <div class="flex justify-center items-center m-3">
            <h1 class="inline-flex bg-red-500 p-3 text-white rounded-xl">
              About Us
            </h1>
          </div>
          <div>
          <div class={`flex flex-col md:flex-row mb-5`} ref={aboutUsFirstDummy}>
              <img
                class={`w-1/2 h-1/2  ${aboutUsFirst ? "mx-auto" : "-translate-x-full"} transition-all duration-500`}
                src={
                  "https://purepng.com/public/uploads/large/purepng.com-chevrolet-impalacarschevroletchevyautomobilechevrolet-impala-1701527430578kztgr.png"
                }
              />
              <div class={`${aboutUsFirst ? "mx-5 " : "translate-x-full"}  transition-all duration-500`}>
                <h1 class={`text-xl font-semibold `}>Our business model</h1>
                <p class="font-light">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas nec magna id nibh ullamcorper facilisis. Suspendisse
                  volutpat tempus vestibulum. Fusce mattis mi id maximus
                  accumsan. Mauris non nisl dictum tellus vestibulum convallis
                  non in metus. Nulla dignissim dui efficitur ligula varius
                  faucibus. Sed placerat est id ipsum maximus ullamcorper ac nec
                  ipsum. Curabitur pulvinar, ligula sit amet condimentum
                  tincidunt, orci magna vulputate purus, ut consectetur leo eros
                  id arcu. Suspendisse viverra mollis quam sed bibendum.
                  Suspendisse dictum volutpat lectus, at porttitor arcu finibus
                  vestibulum. Proin sit amet velit est. Suspendisse a elit
                  convallis, pharetra nunc non, scelerisque lectus. Maecenas
                  iaculis mauris enim, et malesuada orci ultricies ac.
                </p>
              </div>
            </div>
            <div class={`flex flex-col-reverse md:flex-row`} ref={aboutUsSecondDummy}  >
              
              <div class={`${aboutUsSecond ? "mx-5 " : "-translate-x-full"}  transition-all duration-500`}>
                <h1 class={`text-xl font-semibold `}>Our Goals and Policies </h1>
                <p class="font-light">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas nec magna id nibh ullamcorper facilisis. Suspendisse
                  volutpat tempus vestibulum. Fusce mattis mi id maximus
                  accumsan. Mauris non nisl dictum tellus vestibulum convallis
                  non in metus. Nulla dignissim dui efficitur ligula varius
                  faucibus. Sed placerat est id ipsum maximus ullamcorper ac nec
                  ipsum. Curabitur pulvinar, ligula sit amet condimentum
                  tincidunt, orci magna vulputate purus.
                </p>
              </div>
              <img
                class={`w-1/2 h-1/2 ${aboutUsSecond ? "mx-auto" : "translate-x-full"} ml-auto transition-all duration-500`}
                src={
                  "https://purepng.com/public/uploads/large/purepng.com-black-bmw-m760li-xdrive-carcarbmwvehicletransport-961524661791cjzvl.png"
                }
              />
            </div>
            
          </div>
          <div>

          </div>
        </div>
        <div class="relative my-28">
          <div class="my-auto sm:left-1/4 xl:border border-black rounded-xl sm:p-28 xl:p-5 p-10 w-1/2 sm:w-5/6 mx-auto">
            <div class="mx-auto">
            Download Our App to take advantages of special <span class="text-red-600">Deals</span> on it.
            
            </div>
            <div class="">
            <div class="flex flex-col sm:flex-row ">
            <button class="border rounded-xl p-3 border-black my-auto mx-auto sm:mx-2  group inline-flex relative w-full sm:w-[150px] h-1/2 overflow-hidden">
              <div class="group-hover:text-white transition-colors duration-500 ease-in-out z-10">
              <GooglePlayLogo size="22" class="inline" />
              Google Play
              </div>
              <div class="absolute gradient-google transition-all duration-500 origin-top-left scale-0 group-hover:scale-100 w-full h-full rounded-xl top-0 left-0">
              </div>
            </button>
            <img src={playStore} class="w-full sm:w-[150px]" />
            </div>
            <div class="flex flex-col sm:flex-row">
            <button class="border rounded-xl p-3 border-black my-auto mx-auto sm:mx-2 group w-full sm:w-[150px] h-1/2 inline-flex relative overflow-hidden">
            <div class="group-hover:text-white transition-colors duration-500 ease-in-out z-10">
            <AppStoreLogo size="22" class="inline" />
              App Store
              </div>
              <div class="absolute group-hover:bg-blue-500 transition-all duration-500 origin-top-left scale-0 group-hover:scale-100 w-full h-full rounded-xl top-0 left-0">
              </div>
            </button>
            <img src={appStore} class="w-full sm:w-[150px]" />
            </div>
            </div>

          </div>
          <img 
          class="xl:absolute relative
          w-1/2 mx-auto transform 
          xl:right-1/4 xl:w-1/4 xl:top-[-120px]
          "
          src={fixedPhoto} />
          
        </div>
        <div class="grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex flex-col justify-center items-center">
              <div class="flex justify-center items-center">
                <h1 class="bg-red-500 text-white p-2 border rounded-xl">Team</h1>
                
              </div>
              <ul class="">
                <li class="m-2 text-lg">Ashely Mellow</li>
                <li class="m-2 text-lg">Joseph Baron</li>
                <li class="m-2 text-lg">William Smith</li>
                <li class="m-2 text-lg">Michael Berg</li>
              </ul>
          </div>
          <div class="flex flex-col justify-center items-center overscroll-y-hidden">
          <div class="flex justify-center items-center">
                <h1 class="bg-red-500 text-white p-2 border rounded-xl">Copyright</h1>
                
          </div>
          <div>
                  Reserved rights to name and likeness of Rent-a-lot.
                  2024 &copy; Copyright.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas nec magna id nibh ullamcorper facilisis. Suspendisse
                  volutpat tempus vestibulum. Fusce mattis mi id maximus
                  accumsan. Mauris non nisl dictum tellus vestibulum convallis
                  non in metus.
          </div>
          </div>
          <div class="flex flex-col justify-center items-center">
          <div class="flex justify-center items-center">
                <h1 class="bg-red-500 text-white p-2 border rounded-xl">Contacts</h1>
                
          </div>
          <ul class="">
                <li class="my-2 text-lg flex sm:flex-row flex-col justify-center items-center sm:justify-normal">
                  <img src={xLogo} class="w-1/6 h-1/2" />
                  <div class="ml-3">
                    <div class="">Rentalot</div>
                    <div class="font-light relative top-[-9px]">@rentalot</div>
                  </div>
                </li>
                <li class="my-2 text-lg flex sm:flex-row flex-col justify-center items-center sm:justify-normal">
                  <img src={gmailLogo} class="w-1/6 h-1/2" />
                  <div class="ml-3">
                    <div class="">RentalotBusiness@gmail.com</div>
                    
                  </div>
                </li>
                <li class="my-2 text-lg flex sm:flex-row flex-col justify-center items-center sm:justify-normal">
                  <img src={linkedinLogo} class="w-1/6 h-1/2" />
                  <div class="ml-3">
                    <div class="">Rent-a-lot</div>
                    
                  </div>
                </li>
                
          </ul>
          </div>
          <div>
          <div class="flex justify-center items-center">
                <h1 class="bg-red-500 text-white p-2 border rounded-xl">Letter</h1>
          </div>
          <div class="flex flex-col justify-center items-center">
            <h1>Join our letter for updates and new Deals</h1>
            <input class="w-full border rounded-lg" type="text" placeholder="......@gmail.com" />
            <button class="border rounded-lg p-2 bg-red-500 text-white m-2 ">
              Join Letter
            </button>
          </div>
          </div>
        </div>
        <div>
        <a href="https://www.freepik.com/free-vector/twitter-app-new-logo-x-black-background_57643037.htm#query=twitter%20x%20logo&position=29&from_view=keyword&track=ais&uuid=ed17a9d4-869e-4c8d-b8e0-2837cf1095ff">Image by starline</a> on Freepik
        </div>

      </div>
    </div>
  );
}

export default App;
