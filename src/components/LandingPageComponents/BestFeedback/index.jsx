import React, { useState, useEffect } from 'react'
import ReviewCard from './ReviewCard'

const Index = () => {

  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/landingpage/feedback/get');
        const data = await response.json();
        // console.log(data);
        setFeedbackData(data.allData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);

      }
    }

    fetchData();
  }, []);



  return (
    <div className="bestfeedback my-8">
      <div className="flex justify-start max-w-7xl mx-auto px-[3vw] ">
        <p className="text-gray-900 text-xl sm:text-2xl font-bold">Loved 💖 our customers</p>
      </div>
      {/* first row of carousel */}
      <div className="relative flex overflow-x-hidden">
        <div className=" first__row__carousel animate-marquee flex items-center gap-4 ">
          { feedbackData ? feedbackData?.map((item, index) => {
            if (index < 4) return null;
            return <ReviewCard key={index} item={item} />
          })
        :null}
        </div>

        <div className="absolute top-0 px-2 animate-marquee2 flex items-center gap-4 ">
          {feedbackData.map((item, index) => {
            if (index < 4) return null;
            return <ReviewCard key={index} item={item} />
          })}
        </div>
      </div>
      {/* second row of carousel */}
      <div className="relative flex overflow-x-hidden">
        <div className=" first__row__carousel animate-marquee flex items-center gap-4 ">
          {feedbackData.map((item, index) => {
            if (index >= 4) return null;
            return <ReviewCard key={index} item={item} />
          })}
        </div>

        <div className="absolute top-0  px-2 animate-marquee2 flex items-center gap-4 ">
          {feedbackData.map((item, index) => {
            if (index >= 4) return null;
            return <ReviewCard key={index} item={item} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Index