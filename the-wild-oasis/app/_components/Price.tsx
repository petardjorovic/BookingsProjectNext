// import { getCabinPrice } from "@/app/_lib/data-service";

// type PriceProps = {
//   cabinId: number;
// };

// async function Price({ cabinId }: PriceProps) {
//   const { regularPrice, discount } = await getCabinPrice(cabinId);

//   return (
//     <p className="mt-12 text-3xl flex gap-3 items-baseline">
//       {discount > 0 ? (
//         <>
//           <span className="text-3xl font-[350]">
//             ${regularPrice - discount}
//           </span>
//           <span className="line-through font-semibold text-primary-600">
//             ${regularPrice}
//           </span>
//         </>
//       ) : (
//         <span className="text-3xl font-[350]">${regularPrice}</span>
//       )}
//       <span className="text-primary-200">/ night</span>
//     </p>
//   );
// }

function Price() {
  return <div>Price</div>;
}

export default Price;
