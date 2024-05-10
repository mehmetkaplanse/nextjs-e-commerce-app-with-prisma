import Image from "next/image"

const Banner = () => {
  return (
    <div className="h-[237px] bg-black flex items-center justify-center">
        <div className="h-[180px] relative w-full">
            <Image src={"/hepsiBanner.webp"} fill alt="" />
        </div>
    </div>
  )
}

export default Banner