import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
const StarRating = ({ rating }) => {
  const filledStars = [...Array(rating)].map((_, i) => (
    <span key={i} className="text-yellow-500">★</span>
  ));
  const emptyStars = [...Array(5 - rating)].map((_, i) => (
    <span key={i} className="text-gray-300">★</span>
  ));

  return (
    <div className="flex">
      {filledStars}
      {emptyStars}
    </div>
  );
};
const Review = ({ name, subject, rating, description }) => (
  <div className="my-2 border-b border-gray-200 pb-2">
    <div className="flex justify-between items-center">
      <h4 className="font-bold">{name}</h4>
      <StarRating rating={rating} />
    </div>
    <h5 className="text-lg mt-1">{subject}</h5>
    <p className="text-gray-600">{description}</p>
  </div>
);
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
const AccordionTemp = () => {
  const reviews = [
    {name:"John Doe" ,
      subject:"Great Product!" ,
      rating:4,
      description:"I've been using this product for a while and it's really amazing. Highly recommend it."},
    {name:"John Doe" ,
    subject:"Great Product!" ,
    rating:4,
    description:"I've been using this product for a while and it's really amazing. Highly recommend it."},
    // ... (add more reviews as needed)
];
    const [open, setOpen] = React.useState(0);
 
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
   
    return (
      <>
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)}>What is Material Tailwind?</AccordionHeader>
          <AccordionBody>
            We&apos;re not always in the position that we want to be at. We&apos;re constantly
            growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
            ourselves and actualize our dreams.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            How to use Material Tailwind?
          </AccordionHeader>
          <AccordionBody>
            We&apos;re not always in the position that we want to be at. We&apos;re constantly
            growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
            ourselves and actualize our dreams.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(3)}>
            Reviews
          </AccordionHeader>
          <AccordionBody>
            {reviews.map((review, index) => (
              <Review key={index} {...review} />
            ))}
          </AccordionBody>
        </Accordion>
      </>
    );
}

export default AccordionTemp