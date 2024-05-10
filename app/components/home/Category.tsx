"use-client"
const Category = () => {
    const categoryList = [
        {
            name: "Ayakkabı"
        },
        {
            name: "Ayakkabı"
        },
        {
            name: "Ayakkabı"
        },
        {
            name: "Ayakkabı"
        }
    ]
  return (
    <div className="flex items-center justify-center gap-3 md:gap-10 px-3 md:px-10 py-5 md:py-8 overflow-x-auto">
        {
            categoryList.map((cat,i) => (
                <div className="border text-slate-500 rounded-full min-w-[120px] flex items-center justify-center flex-1 text-center cursor-pointer px-4 py-2" key={i}>{cat.name}</div>
            ))
        }
    </div>
  )
}

export default Category