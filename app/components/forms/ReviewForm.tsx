// import { useState } from 'react';

// const ReviewForm = ({ onSubmit }) => {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ rating, comment });
//     setRating(0);
//     setComment('');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-6">
//       <h2 className="text-xl font-semibold mb-4">Submit your review</h2>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
//           Rating
//         </label>
//         <input
//           type="number"
//           id="rating"
//           value={rating}
//           onChange={(e) => setRating(parseFloat(e.target.value))}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           min="0"
//           max="5"
//           step="0.1"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
//           Comment
//         </label>
//         <textarea
//           id="comment"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default ReviewForm;
