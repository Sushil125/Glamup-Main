import BigImage1 from "../assets/images/element5-digital-ceWgSMd8rvQ-unsplash.jpg";
import BigImage2 from "../assets/images/raphael-lovaski-pxax5WuM7eY-unsplash.jpg";

import SmallImage1 from "../assets/images/freestocks-fplnXE5loWo-unsplash.jpg";
import SmallImage2 from "../assets/images/pmv-chamara-MEsWk-dZzlI-unsplash.jpg";
import SmallImage3 from "../assets/images/ashley-piszek-1tc_J6-c5Jo-unsplash.jpg";

const HighlightImages = () => {
  const BigImages = [
    {
      id: 1,
      image: BigImage1,
    },
    {
      id: 2,
      image: BigImage2,
    },
  ];

  const SmallImages = [
    {
      id: 1,
      image: SmallImage1,
    },
    {
      id: 2,
      image: SmallImage2,
    },
    {
      id: 3,
      image: SmallImage3,
    },
  ];
  return (
    <div className="bg-white mt-16 h-auto">
      {/* Two Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {BigImages.map((BigImage) => (
          <div key={BigImage.id} className="col-span-1 h-[500px]">
            <img
              src={BigImage.image}
              className="w-full h-[500px] object-cover"
              alt="big"
            />
          </div>
        ))}
      </div>

      {/* Three Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
        {SmallImages.map((SmallImage) => (
          <div key={SmallImage.id} className="col-span-1 h-[300px]">
            <img
              src={SmallImage.image}
              className="w-full h-[300px] object-cover"
              alt="small"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighlightImages;
