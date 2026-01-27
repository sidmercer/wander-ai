import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import { PopularCityList } from "./_components/PopularCityList";

export default function Home() {
  return (
    <div>
      {/* <h2>hey there</h2>
      <Button>click</Button> */}
      <Hero/>
      <PopularCityList/>
      


    </div>
  );
}
