

// hey, when I choosing rating from rating option value I am getting but 
//  dom rate I mean option rate getting initially rating option which is 
//  not good because when user select a rating it should should in the 
//  rating option right ? Since, dependency getting updated according 
//  to rating selected  option and re-rendering component is that rating option
//  getting intial state if yes how can I solve that

//   // ratings 

//   const ratingOption=[1,2,3,4,5]

//   const [selectedRating, setSelectedRating] = useState(null);


//  const handleRatingChange = (event) => {
//     setSelectedRating(Number(event.target.value));
//   };

//   console.log(selectedRating);

//   useEffect(()=>{
//     dispatch(
//         getProductsData({  ratings: selectedRating }));
//   },[selectedRating])

//   <div className={styles._rating_div}>
//   <label>Choose rating</label>
//   <select onChange={handleRatingChange }>
//     <option value="" disabled>
//       Ratings
//     </option>
//     {ratingOption.map((rate, index) => (
//       <option key={index} value={rate}>
//         {rate}
//       </option>
//     ))}
//   </select>
// </div>
