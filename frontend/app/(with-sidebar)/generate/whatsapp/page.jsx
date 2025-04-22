export default function Page() {
    return (
        <div className="flex flex-col lg:flex-row-reverse gap-4 p-4">
            {/* preview */}
            <div className="w-full flex justify-center items-center">

                <div className="bg-amber-100 aspect-[9/16] h-[430px]">

                </div>


            </div>

            {/* edit */}
            <div className="bg-amber-100 h-2 w-full"></div>
        </div>
    );
}
